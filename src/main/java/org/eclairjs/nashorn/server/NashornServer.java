package org.eclairjs.nashorn.server;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.netty.channel.*;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.traffic.AbstractTrafficShapingHandler;
import io.netty.handler.traffic.ChannelTrafficShapingHandler;
import org.apache.log4j.Logger;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpRequestDecoder;
import io.netty.handler.codec.http.HttpResponseEncoder;
import org.eclairjs.nashorn.NashornEngineSingleton;

import javax.script.ScriptEngine;
import java.io.IOException;
import java.util.HashMap;


public final class NashornServer {
    private static final Logger LOG = Logger.getLogger(NashornServer.class);

    private final int port;

    ScriptEngine engine;
    HashMap<String, CommHandler> commHandlers = new HashMap<>();


    public NashornServer(int port) {
        this.port = port;
    }

    public static void main(String[] args) {
        try {
            int port;
            if (args != null && args.length == 1) {
                // port can be specified as a program argument
                port = Integer.parseInt(args[0]);
            } else {
                // default port number
                port = 8888;
            }

            // start the server
            NashornServer server = new NashornServer(port);
            server.start();

        } catch (Exception e) {
            LOG.error("Error occurred during server starting", e);
        }
    }

    public void start() throws InterruptedException {
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workerGroup);
            bootstrap.channel(NioServerSocketChannel.class);
            bootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
                @Override
                protected void initChannel(SocketChannel ch) throws Exception {
                    ChannelPipeline pipeline = ch.pipeline();
//                    pipeline.addLast("trafficHandler", new ChannelTrafficShapingHandler(
//                            AbstractTrafficShapingHandler.DEFAULT_CHECK_INTERVAL));
//                    pipeline.addLast("httpCodec", new HttpServerCodec());
//                    pipeline.addLast("httpAggregator", new HttpObjectAggregator(64 * 1024));
                    pipeline.addLast("encoder", new HttpResponseEncoder());
                    pipeline.addLast("decoder", new HttpRequestDecoder());
                    pipeline.addLast("aggregator", new HttpObjectAggregator(65536));
                    pipeline.addLast("businessHandler", new HttpServerHandler(NashornServer.this));
                }
            });

            Channel channel = bootstrap.bind(port).sync().channel();
            LOG.info("Server " + channel.localAddress() + " started.");
            channel.closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }

    ScriptEngine getEngine() {
        if (engine==null) {
               engine = NashornEngineSingleton.getEngine();
        }
        return engine;
    }

    public void registerCommHandler(String id, CommHandler handler)
    {
        commHandlers.put(id,handler);
    }
    public CommHandler getCommHandler(String id)
    {
        return commHandlers.get(id);
    }

    public static class Comm {
        private final NashornServer kernel;
        private final CommWriter commWriter;

        Comm(NashornServer kernel, CommWriter commWriter)
        {
            this.kernel=kernel;
            this.commWriter=commWriter;
        }
        public void send(String target,  String msg)  {
//            val jsValue = Json.parse(msg)
            //commWriter.writeMsg(JsObject(Seq(
            //  "repsonse" -> jsValue
            //)))
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node= null;
            try {
                node = mapper.readTree(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
            ObjectNode jsObject = mapper.createObjectNode();
            jsObject.put("repsonse", node);

            commWriter.writeMsg(jsObject);
        }

        void close()  {
            commWriter.close();
        }

    }
    public void initialize()
    {
        System.out.println("Start kernel init");
        final ScriptEngine engine = getEngine();

        registerCommHandler("foreachrdd", new CommHandler() {
            @Override
            public void open(CommWriter commWriter, String commId, String targetName, String data) {
                System.out.println("got comm open");
                System.out.println(data);

                Comm comm = new Comm(NashornServer.this, commWriter);
                ((HashMap)engine.get("commMap")).put("foreachrdd:" + commId, comm);

            }

            @Override
            public void close(CommWriter commWriter, String commId, String data) {
                System.out.println("got  foreachrdd close " + commId);
                ((HashMap)engine.get("commMap")).remove("foreachrdd:" + commId);

            }
        });
        registerCommHandler("logger", new CommHandler() {
            @Override
            public void open(CommWriter commWriter, String commId, String targetName, String data) {
                System.out.println("got logger open");
                System.out.println(data);

                EclairjsLoggerAppender.create(commWriter, data.toString());

            }

            @Override
            public void close(CommWriter commWriter, String commId, String data) {
                System.out.println("got logger close " + commId);

            }
        });

        engine.put("kernel", this);
        engine.put("commMap", new HashMap<>());

        System.out.println("END kernel init");

    }

}