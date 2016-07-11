package org.eclairjs.nashorn.server;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.IOException;

public class Messages {

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
        public String [] buffers=new String[0];
    }

    static class MessageHeader {
        public String username="";
        public String version;
        public String session="";
        public String msg_id;
        public String msg_type;
    }


    @JsonDeserialize(using = ContentDeserializer.class)
    static class Content {
    }
    static class Content_Execution_State extends Content {
        public String execution_state;
        Content_Execution_State(String state)
        {this.execution_state=state;}
    }
    static class Language_Info {
        public String name;
        public String version;
        Language_Info(String name,String version)
        {
            this.name=name;
            this.version=version;
        }
    }
    static class Content_Language_Info extends Content {
        public Language_Info language_info;
        public String implementation_version;
        public  String banner;
        public String implementation;
        public String protocol_version;
        Content_Language_Info(Language_Info language_info, String implementation_version, String banner, String implementation, String protocol_version) {
            this.language_info=language_info;
            this.implementation_version=implementation_version;
            this.banner=banner;
            this.implementation=implementation;
            this.protocol_version=protocol_version;

        }
    }
    static class Content_Execution_Count extends Content {
        public int execution_count=1;
        public String code;
        public Content_Execution_Count(int count,String code)
        {
            this.execution_count=count;
            this.code=code;
        }

    }

    static class Content_Status extends Content {
        public String status;
        public String [] payload=new String[0];
        public Object  user_expressions = new Object();
        public int execution_count;
        public Content_Status(int count, String status)
        {
            this.execution_count=count;
            this.status=status;
        }
    }

    static class ReturnData {
        @JsonProperty("text/plain")
        public String data;
        ReturnData(String data)
        {this.data=data;}
    }

    static class Content_Execute_Result extends Content {
        public ReturnData data;
        public Object  metadata = new Object();
        public int execution_count;
        public Content_Execute_Result(int count,String result)
        {
            this.data=new ReturnData(result);
            this.execution_count=count;
        }
    }

    static class Content_Data extends Content {
        public String status;
        public String [] payload=new String[0];
        public Object  metadata = new Object();
        public int execution_count;
    }


    static class Content_Execute_Request extends Content {
        public boolean silent;
        public boolean store_history;
        public Object user_expressions;
        public boolean allow_stdin;
        public boolean stop_on_error;
        public String code;
    }
    static class Content_Exception extends Content {
        public int execution_count;
        public String [] traceback;
        public String evalue;
        public String status="error";
        public String ename;
    }

//    {"language_info": {"name": "scala", "version": "2.10.4"}, "implementation_version": "0.1.0.dev8-incubating-SNAPSHOT", "banner": "IBM Spark Kernel", "implementation": "spark", "protocol_version": "5.0"}
//    {"execution_count": 1, "code": "var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');\nvar jsc = new SparkContext(\"local[*]\", \"foo\");"}
//    {"status": "ok", "payload": [], "user_expressions": {}, "execution_count": 1}
//    {"data": {"text/plain": "EclairJS-nashorn 0.5 Spark 1.6.0"}, "metadata": {}, "execution_count": 2}

    static class Metadata {
        public String timestamp;
    }

    static class ContentDeserializer extends JsonDeserializer<Content> {

        @Override
        public Content deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
            Content content=new Content();
            JsonNode node = jsonParser.getCodec().readTree(jsonParser);
            if (node.has("silent"))
            {
                Content_Execute_Request execute_request=new Content_Execute_Request();
                execute_request.code= node.get("code").textValue();
                content=execute_request;
            }

            return content;
        }
    }
}
