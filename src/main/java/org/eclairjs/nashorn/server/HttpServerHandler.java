package org.eclairjs.nashorn.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.*;

import io.netty.handler.codec.http.*;
import io.netty.handler.traffic.ChannelTrafficShapingHandler;
import io.netty.handler.traffic.TrafficCounter;
import io.netty.util.CharsetUtil;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.ContinuationWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.apache.log4j.Logger;
import org.eclairjs.nashorn.NashornEngineSingleton;
import org.eclairjs.nashorn.SparkBootstrap;

import org.apache.spark.SparkContext;


import org.eclairjs.nashorn.server.Messages.*;

import java.io.IOException;


public class HttpServerHandler extends SimpleChannelInboundHandler<Object> {

    private static String kernelId="5265f486-30bd-41ca-8fde-9326d58e445c";
    private static KernelInfo kernelInfo=new KernelInfo(kernelId,"eclair");

    private final static ObjectMapper objectMapper=
            new ObjectMapper().
                    enable(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY).
                    disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

    private ChannelHandlerContext ctx;
    private FullHttpRequest request;
    private   StringBuilder frameBuffer = null;
    protected WebSocketServerHandshaker handshaker;

    ScriptEngine engine = NashornEngineSingleton.getEngine();

    static private int _message_id=1;
    static private int execute_count=1;

    static Logger logger = Logger.getLogger(HttpServerHandler.class);


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        try {
            if (msg instanceof FullHttpRequest) {
                this.handleHttpRequest(ctx, (FullHttpRequest) msg);
            } else if (msg instanceof WebSocketFrame) {
                this.handleWebSocketFrame(ctx, (WebSocketFrame)msg);
            }

        } catch (Throwable ex)
        {
            ex.printStackTrace();
            throw ex;
        }
    }


    protected void handleHttpRequest(ChannelHandlerContext ctx, FullHttpRequest request) throws Exception {

        this.ctx = ctx;
        this.request = request;

        logger.debug("HTTP request: " + request.getUri());

        if (HttpHeaders.is100ContinueExpected(request)) {
            ctx.writeAndFlush(new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.CONTINUE));
        }

        if (request.getUri().startsWith("/api/sessions?")&&request.getMethod().equals(HttpMethod.POST)){
            handleSessionRequest(request);
        }
        else if (request.getUri().startsWith("/api/kernels?")&&request.getMethod().equals(HttpMethod.GET)){
            handleKernelsRequest(request);
        }
        else if (request.getUri().startsWith("/api/kernels/")&&request.getMethod().equals(HttpMethod.GET)){
            handleSocketRequest(request);

        }
        else if (request.getUri().startsWith("/api/sessions/")&&request.getMethod().equals(HttpMethod.DELETE)){
            handleDeleteSession(request);

        }
//        else if (request.getUri().startsWith(REDIRECT_PATH)) {
//            sendRedirect();
//        }
//        else if (STATUS_PATH.equals(request.getUri())) {
//            sendStatus();
//        }
        else {
            sendNotFound();
        }
    }

    protected void handleWebSocketFrame(ChannelHandlerContext ctx, WebSocketFrame frame) {
        logger.trace("Received incoming frame" + frame.getClass().getName());

        // Check for closing frame
        if (frame instanceof CloseWebSocketFrame) {
            if (frameBuffer != null) {
                handleMessageCompleted(ctx, frameBuffer.toString());
            }
            handshaker.close(ctx.channel(), (CloseWebSocketFrame) frame.retain());
            return;
        }

        if (frame instanceof PingWebSocketFrame) {
            ctx.channel().writeAndFlush(new PongWebSocketFrame(frame.content().retain()));
            return;
        }

        if (frame instanceof PongWebSocketFrame) {
            logger.trace("Pong frame received");
            return;
        }

        if (frame instanceof TextWebSocketFrame) {
            frameBuffer = new StringBuilder();
            frameBuffer.append(((TextWebSocketFrame)frame).text());
        } else if (frame instanceof ContinuationWebSocketFrame) {
            if (frameBuffer != null) {
                frameBuffer.append(((ContinuationWebSocketFrame)frame).text());
            } else {
                logger.warn("Continuation frame received without initial frame.");
            }
        } else {
            throw new UnsupportedOperationException(String.format("%s frame types not supported", frame.getClass().getName()));
        }

        // Check if Text or Continuation Frame is final fragment and handle if needed.
        if (frame.isFinalFragment()) {
            handleMessageCompleted(ctx, frameBuffer.toString());
            frameBuffer = null;
        }
    }

    private void sendResponse(CharSequence responseStr, HttpResponseStatus httpResponseStatus, String contentType) {
        HttpResponse responseHeaders = new DefaultHttpResponse(request.getProtocolVersion(), httpResponseStatus);

        if (contentType!=null)
            responseHeaders.headers().set(HttpHeaders.Names.CONTENT_TYPE, contentType);

        ByteBuf responseContent = Unpooled.copiedBuffer(responseStr, CharsetUtil.UTF_8);

        boolean keepAlive = HttpHeaders.isKeepAlive(request);
        if (keepAlive) {
            responseHeaders.headers().set(HttpHeaders.Names.CONTENT_LENGTH, responseContent.readableBytes());
            responseHeaders.headers().set(HttpHeaders.Names.CONNECTION, HttpHeaders.Values.KEEP_ALIVE);
        }

        // write response
        ctx.write(responseHeaders);
        ctx.write(responseContent);
        ChannelFuture future = ctx.writeAndFlush(LastHttpContent.EMPTY_LAST_CONTENT);

        // Decide whether to close the connection or not.
        if (!keepAlive) {
            future.addListener(ChannelFutureListener.CLOSE);
        }
    }

    protected void handleMessageCompleted(ChannelHandlerContext ctx, String frameText) {
        this.ctx=ctx;
        logger.debug("Socket Message=" + frameText);
        Message_IN out=null;
        try {
            Message_IN msg=objectMapper.readValue(frameText, Message_IN.class);

            switch (msg.header.msg_type) {
                case "kernel_info_request":
                    sendSocketMessage(kernelInfoRequest(msg));
                    out=respondMessage(msg.header,new Content_Execution_State("idle"),"status","iopub");
                    break;
                case "execute_request":
                    int count=execute_count++;
                    sendSocketMessage(statusMessage(msg,"busy","iopub"));
                    Content_Execute_Request request=(Content_Execute_Request) msg.content;
                    sendSocketMessage(executeRequestMessage(msg,count,request.code,"iopub"));

                    String returnString=null;
                    String status="ok";
                    try {
                        Object result=engine.eval(request.code);
                        if (result!=null)
                            returnString=result.toString();
                        sendSocketMessage(executeReplyMessage(msg,count,status,"shell"));
                    } catch (Throwable e) {
                        returnString=e.toString();
                        sendSocketMessage(executeReplyExceptionMessage(msg, count, e, "shell"));
                    }
                    logger.debug("Execute result=" + returnString);

                    if (returnString!=null)
                        sendSocketMessage(executeResultMessage(msg, count, returnString, "iopub"));

                    out=statusMessage(msg,"idle","iopub");
                    break;
                case "shutdown_request":
                    out=statusMessage(msg,"busy","iopub");
                    break;

                default:
                    logger.warn("MESSAGE NOT HANDLED=" + msg.header.msg_type);
                    out=respondMessage(msg.header,new Content_Execution_State("busy"),"status","iopub");
            }

        } catch (IOException e) {
            e.printStackTrace();
            logger.error("jackson error ",e);
        }

        if (out != null) {
            sendSocketMessage(out);
        }
    }

    private void sendSocketMessage(Message_IN out) {
        try {
            String json =objectMapper.writeValueAsString(out);
            logger.debug("Socket Response=" + json);
            ctx.channel().writeAndFlush(new TextWebSocketFrame(json));
        } catch (IOException e) {
            logger.error("jackson error ", e);
        }

    }

    private Message_IN statusMessage(Message_IN parent,String status,String channel)
    {
        return respondMessage(parent.header,new Content_Execution_State(status),"status",channel);
    }

    private Message_IN executeRequestMessage(Message_IN parent,int count,String code,String channel)
    {
        return respondMessage(parent.header,new Content_Execution_Count(count,code),"execute_input",channel);
    }

    private Message_IN executeReplyMessage(Message_IN parent,int count,String status,String channel)
    {
        return respondMessage(parent.header,new Content_Status(count,status),"execute_reply",channel);
    }

    private Message_IN executeReplyExceptionMessage(Message_IN parent,int count,Throwable ex,String channel)
    {
        Content_Exception content=new Content_Exception();
        content.execution_count=count;
        content.ename=ex.getClass().toString();
        content.evalue=ex.getMessage();
        StackTraceElement[] trace=ex.getStackTrace();
        content.traceback=new String[trace.length];
        for (int i = 0; i < trace.length; i++) {
            content.traceback[i]=trace[i].toString();
        }

        return respondMessage(parent.header,content,"execute_reply",channel);
    }

    private Message_IN executeResultMessage(Message_IN parent,int count,String result,String channel)
    {
        return respondMessage(parent.header,new Content_Execute_Result(count,result),"execute_result",channel);
    }

    private static Message_IN kernelInfoRequest(Message_IN msg) {

        Content_Language_Info info=new Content_Language_Info(new Language_Info("scala","2.10.4"),"0.1.0.dev8-incubating-SNAPSHOT","IBM Spark Kernel","spark","5.0");
        Message_IN out=respondMessage(msg.header,info,"kernel_info_reply","shell");
//        Message_IN out=respondMessage(msg.header,new Content_Execution_State("busy"),"kernel_info_reply","shell");
        return out;
    }

    private static Message_IN respondMessage(MessageHeader parentMessage,Content content,String messageType,String channel)
    {
        String messageId=nextMessageID();
        Metadata metadata=new Metadata();
        metadata.timestamp=String.valueOf(System.currentTimeMillis()/1000);
        MessageHeader header=new MessageHeader();
        header.version="5.0";
        header.msg_type=messageType;
        header.msg_id=messageId;

        Message_IN returnMsg=new Message_IN();
        returnMsg.metadata=metadata;
        returnMsg.header=header;
        returnMsg.parent_header=parentMessage;
        returnMsg.msg_type=messageType;
        returnMsg.msg_id=messageId;
        returnMsg.channel=channel;
        returnMsg.content=content;

        return returnMsg;


    }


    static private String nextMessageID()
    {
        return String.valueOf(_message_id++);
    }


    private void sendJsonResponse(Object data, HttpResponseStatus httpResponseStatus) {
        String json= null;
        try {
            json = objectMapper.writeValueAsString(data);
            sendResponse(json, httpResponseStatus, "application/json; charset=UTF-8");
        } catch (JsonProcessingException e) {
            sendResponse(e.getMessage(), HttpResponseStatus.INTERNAL_SERVER_ERROR, "text/plain; charset=UTF-8");
        }

    }

    private void sendNotFound() throws Exception {
        sendResponse("", HttpResponseStatus.NOT_FOUND, "text/html; charset=UTF-8");
    }

    private  void handleSessionRequest(HttpRequest request) {

        SessionResponse sessionResponse=new SessionResponse("1",
                new NotebookPath("foo"),
                kernelInfo);

            sendJsonResponse(sessionResponse, HttpResponseStatus.CREATED);
    }
    private  void handleKernelsRequest(HttpRequest request) {

        KernelInfo[] kernels={kernelInfo};
        sendJsonResponse(kernels,HttpResponseStatus.OK);
    }

    private void handleDeleteSession(FullHttpRequest request) {
        SparkContext sc=SparkContext.getOrCreate();
        sc.stop();
        execute_count=1;
        sendResponse("",HttpResponseStatus.NO_CONTENT,null);
    }



    private  void handleSocketRequest(HttpRequest request) {

        String upgradeHeader = request.headers().get("Upgrade");
        if (upgradeHeader != null && "websocket".equalsIgnoreCase(upgradeHeader)) {
            // Handshake. Ideally you'd want to configure your websocket uri
            String url = "ws://" + request.headers().get("Host") + request.getUri();
            WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(url, null, false);
            handshaker = wsFactory.newHandshaker(request);
            if (handshaker == null) {
                WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());
            } else {
                handshaker.handshake(ctx.channel(), request);
            }
        }
    }
}
