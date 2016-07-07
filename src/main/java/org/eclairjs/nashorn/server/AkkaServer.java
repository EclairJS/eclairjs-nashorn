package org.eclairjs.nashorn.server;

        import org.eclairjs.nashorn.server.Messages.*;
//#websocket-example-using-core
        import java.awt.*;
        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.util.concurrent.TimeUnit;

        import akka.actor.ActorRef;
        import akka.actor.Props;
        import akka.http.impl.engine.ws.UpgradeToWebsocketLowLevel;
        import akka.http.javadsl.model.HttpMethods;
        import akka.http.javadsl.model.MediaTypes;
        import akka.http.javadsl.model.ws.UpgradeToWebsocket;
        import akka.http.javadsl.server.Marshaller;
        import akka.http.javadsl.server.RequestContext;
        import akka.stream.actor.*;
        import akka.stream.javadsl.Sink;
        import com.fasterxml.jackson.annotation.JsonProperty;
        import com.fasterxml.jackson.core.JsonProcessingException;
        import com.fasterxml.jackson.databind.MapperFeature;
        import com.fasterxml.jackson.databind.ObjectMapper;
        import scala.concurrent.Await;
        import scala.concurrent.Future;
        import scala.concurrent.duration.FiniteDuration;
        import scala.runtime.BoxedUnit;

        import akka.japi.Function;
        import akka.japi.JavaPartialFunction;

        import akka.stream.ActorMaterializer;
        import akka.stream.Materializer;
        import akka.stream.javadsl.Flow;
        import akka.stream.javadsl.Source;

        import akka.actor.ActorSystem;
        import akka.http.javadsl.Http;
        import akka.http.javadsl.ServerBinding;
        import akka.http.javadsl.model.HttpRequest;
        import akka.http.javadsl.model.HttpResponse;
        import akka.http.javadsl.model.ws.Message;
        import akka.http.javadsl.model.ws.TextMessage;
        import akka.http.javadsl.model.ws.Websocket;
        import akka.http.javadsl.marshallers.jackson.Jackson;

public class AkkaServer {


    private static String kernelId="5265f486-30bd-41ca-8fde-9326d58e445c";
    private static KernelInfo kernelInfo=new KernelInfo(kernelId,"eclair");

    private final static ObjectMapper objectMapper=
            new ObjectMapper().enable(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY);

    //#websocket-handling
    public static HttpResponse handleRequest(HttpRequest request) {
        System.out.println("Handling request to " + request.getUri());

        if (request.getUri().path().equals("/api/sessions")&&request.method().equals(HttpMethods.POST))
            return handleSessionRequest(request);
        if (request.getUri().path().equals("/api/kernels")&&request.method().equals(HttpMethods.GET))
            return handleKernelsRequest(request);
        if (request.getUri().path().startsWith("/api/kernels/")&&request.method().equals(HttpMethods.GET))
            return Websocket.handleWebsocketRequestWith(request, wsFlow());
//           return Websocket.handleWebsocketRequestWith(request, greeter());
//            new UpgradeToWebsocket().handleMessagesWith()
        else
            return HttpResponse.create().withStatus(404);
    }
    //#websocket-handling

    public static void main(String[] args) throws Exception {
        ActorSystem system = ActorSystem.create();

        try {
            final Materializer materializer = ActorMaterializer.create(system);

            Future<ServerBinding> serverBindingFuture =
                    Http.get(system).bindAndHandleSync(
                            new Function<HttpRequest, HttpResponse>() {
                                public HttpResponse apply(HttpRequest request) throws Exception {
                                    return handleRequest(request);
                                }
                            }, "localhost", 8080, materializer);

            // will throw if binding fails
            Await.result(serverBindingFuture, new FiniteDuration(1, TimeUnit.SECONDS));
            System.out.println("Press ENTER to stop.");
            new BufferedReader(new InputStreamReader(System.in)).readLine();
        } finally {
            system.shutdown();
        }
    }

    //#websocket-handler
    /**
     * A handler that treats incoming messages as a name,
     * and responds with a greeting to that name
     */
    public static Flow<Message, Message, BoxedUnit> greeter() {
        return
                Flow.<Message>create()
                        .collect(new JavaPartialFunction<Message, Message>() {
                            @Override
                            public Message apply(Message msg, boolean isCheck) throws Exception {
                                if (isCheck)
                                    if (msg.isText()) return null;
                                    else throw noMatch();
                                else
                                    return handleTextMessage(msg.asTextMessage());
                            }
                        });
    }
    public static Flow<Message, Message, ?> wsFlow() {
        Sink<Message,ActorRef> wsSink = Sink.actorSubscriber(WSCommandSubscriber.getProps());
        Source<Message,ActorRef> wsSource= Source.actorPublisher(WSDataPublisherActor.getProps()).
                map((data) -> sendReturnMessage(data));
        return Flow.fromSinkAndSource(wsSink, wsSource);
    }

    private static Message sendReturnMessage(Object data) {
        System.out.println("RETURN Message=" + data);

        return TextMessage.create("RETURN Message=" + data);
    }

    public static TextMessage handleTextMessage(TextMessage msg) {
        if (msg.isStrict()) {// optimization that directly creates a simple response...
            System.out.println("HANDLE MESSAGE Strict="+msg.getStrictText());
            String json=handleWSMessage(msg.getStrictText());
            System.out.println("MESSAGE response="+json);
            return TextMessage.create(json);
        } else { // ... this would suffice to handle all text messages in a streaming fashion
            return TextMessage.create(Source.single("Hello ").concat(msg.getStreamedText()));
        }
    }



    private static HttpResponse handleSessionRequest(HttpRequest request) {

        SessionResponse sessionResponse=new SessionResponse("1",
                new NotebookPath("foo"),
                kernelInfo);

        String json= null;
        try {
            json = objectMapper.writeValueAsString(sessionResponse);
        } catch (JsonProcessingException e) {
            return HttpResponse.create().withStatus(500).withEntity(e.toString());
        }

        return HttpResponse.create().withStatus(201).withEntity(MediaTypes.APPLICATION_JSON.toContentType(),json);
    }

    private static HttpResponse handleKernelsRequest(HttpRequest request) {

        KernelInfo[] kernels={kernelInfo};
        String json= null;
        try {
            json = objectMapper.writeValueAsString(kernels);
        } catch (JsonProcessingException e) {
            return HttpResponse.create().withStatus(500).withEntity(e.toString());
        }

        return HttpResponse.create().withStatus(200).withEntity(MediaTypes.APPLICATION_JSON.toContentType(),json);
    }

    private static String handleWSMessage(String text) {
        try {
            Message_IN msg=objectMapper.readValue(text, Message_IN.class);

            Message_IN out=null;
            switch (msg.header.msg_type) {
                case "kernel_info_request":
                    out = kernelInfoRequest(msg);
                    break;
                    default:
                        out=respondMessage(msg.header,new Content_Execution_State("busy"),"status","iopub");
            }

            String json=objectMapper.writeValueAsString(out);
            return json;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }

    }

    private static Message_IN kernelInfoRequest(Message_IN msg) {

        Content_Language_Info info=new Content_Language_Info(new Language_Info("scala","2.10.4"),"0.1.0.dev8-incubating-SNAPSHOT","IBM Spark Kernel","spark","5.0");
        Message_IN out=respondMessage(msg.header,new Content_Execution_State("busy"),"kernel_info_reply","shell");
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

    static private int _message_id=1;

    static private String nextMessageID()
    {
        return String.valueOf(_message_id++);
    }

    static class WSCommandSubscriber extends UntypedActorSubscriber {

        @Override
        public RequestStrategy requestStrategy() {
            return OneByOneRequestStrategy.getInstance();
        }

        public static Props getProps(){
            return Props.create(WSCommandSubscriber.class);
        }
        @Override
        public void onReceive(Object message) throws Exception {
            System.out.println("Subscribe Sender="+this.getSender());
            if (ActorSubscriberMessage.OnNext.class.equals(message.getClass())) {
                ActorSubscriberMessage.OnNext m = (ActorSubscriberMessage.OnNext)message;
                System.out.println("subscribe m = "+m.element());
                if (m.element() instanceof TextMessage)
                {
                    TextMessage msg=(TextMessage)m.element();
                    handleTextMessage(msg);
                }
            }
            else
              System.out.println("Message="+message);
        }
    }

    static class WSDataPublisherActor extends UntypedActorPublisher<Object> {

        @Override
        public void onReceive(Object message) throws Exception {
            System.out.println("Publish Sender="+this.getSender());
            if (ActorPublisherMessage.Request.class.equals(message.getClass())) {
//                ActorPublisherMessage.Request m = (ActorPublisherMessage.Request) message;
//                while (isActive() && totalDemand() >0)
//                {
//                    System.out.println("publish m="+m);
//                    onNext(m);
//                }
            }
            else
                System.out.println("Publish message="+message);
        }
        public static Props getProps(){
            return Props.create(WSDataPublisherActor.class);
        }
    }



    }
