package org.eclairjs.nashorn.server;


//#websocket-example-using-core
        import java.io.BufferedReader;
        import java.io.IOException;
        import java.io.InputStreamReader;
        import java.util.concurrent.TimeUnit;

        import akka.http.javadsl.model.HttpMethods;
        import akka.http.javadsl.model.MediaTypes;
        import akka.http.javadsl.server.Marshaller;
        import akka.http.javadsl.server.RequestContext;
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

public class Server {


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
            return Websocket.handleWebsocketRequestWith(request, greeter());
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

            Message_IN out=respondMessage(msg.header,"status","iopub");

            String json=objectMapper.writeValueAsString(out);
            return json;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }

    }

    private static Message_IN respondMessage(MessageHeader parentMessage,String messageType,String channel)
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

        return returnMsg;


    }

    static private int _message_id=1;

    static private String nextMessageID()
    {
        return String.valueOf(_message_id++);
    }

    static class SessionResponse
    {
        public String id;
        public NotebookPath notebook;
        public KernelInfo kernel;
        public SessionResponse(String id, NotebookPath notebook,KernelInfo kernel)
        {
            this.id=id;
            this.notebook=notebook;
            this.kernel=kernel;
        }
    }

    static class NotebookPath {
        public String path;
        public NotebookPath(String path)
        { this.path=path;}
    }

    static class KernelInfo {
        public String id;
        public String name;
        public KernelInfo(String id, String name)
        {
            this.id=id;
            this.name=name;
        }
    }



    static class Message_IN {
        public MessageHeader header;
        public MessageHeader parent_header;
        public String msg_id;
        public String msg_type;
        public String channel;
        public Content content;
        public Metadata metadata;
        public String [] buffers;
    }

    static class MessageHeader {
        public String username;
        public String version;
        public String session;
        public String msg_id;
        public String msg_type;
    }

    static class Content {
        public String execution_state;
    }
    static class Metadata {
        public String timestamp;
    }



    }
