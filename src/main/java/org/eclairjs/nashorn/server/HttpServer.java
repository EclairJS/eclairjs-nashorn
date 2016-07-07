package org.eclairjs.nashorn.server;


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


public final class HttpServer {
    private static final Logger LOG = Logger.getLogger(HttpServer.class);

    private final int port;

    public HttpServer(int port) {
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
            HttpServer server = new HttpServer(port);
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
                    pipeline.addLast("businessHandler", new HttpServerHandler());
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
}