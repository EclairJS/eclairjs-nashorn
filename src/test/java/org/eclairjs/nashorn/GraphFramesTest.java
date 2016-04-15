/*
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.eclairjs.nashorn;

import org.junit.Test;
import static org.junit.Assert.*;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class GraphFramesTest {

    @Test
    public void constructionFromDataFrames() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/graphframes/graphframestest.js");
        Object ret = ((Invocable)engine).invokeFunction("constructionFromDataFrames");

        String expected = "GraphFrame(v:[id: int, name: string], e:[src: int, dst: int, action: string])";
        assertEquals("failure - strings are not equal", expected, ret);

    }

    @Test
    public void graphXFromDataFrames() throws Exception {
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/graphframes/graphframestest.js");
        Object ret = ((Invocable)engine).invokeFunction("graphXFromDF");

        String vertexSchema = "\"schema\":{" +
                "\"fields\":[{\"name\":\"id\",\"dataType\":\"integer\",\"nullable\":true}," +
                "{\"name\":\"name\",\"dataType\":\"string\",\"nullable\":true}]}";
        String edgeSchema = "\"schema\":{\"fields\":[{\"name\":\"src\",\"dataType\":\"integer\",\"nullable\":true}," +
                "{\"name\":\"dst\",\"dataType\":\"integer\",\"nullable\":true}," +
                "{\"name\":\"action\",\"dataType\":\"string\",\"nullable\":true}]}";
        String expected = "{" +
                "\"vertexRows\":[" +
                    "{\"0\":1,\"1\":{\"values\":[1,\"A\"]," + vertexSchema + "},\"length\":2}," +
                    "{\"0\":2,\"1\":{\"values\":[2,\"B\"]," + vertexSchema + "},\"length\":2}," +
                    "{\"0\":3,\"1\":{\"values\":[3,\"C\"]," + vertexSchema + "},\"length\":2}" +
                "]," +
                "\"edgeRows\":[" +
                    "{\"srcId\":1,\"dstId\":2,\"attr\":{\"values\":[1,2,\"love\"]," + edgeSchema + "}}," +
                    "{\"srcId\":2,\"dstId\":1,\"attr\":{\"values\":[2,1,\"hate\"]," + edgeSchema + "}}," +
                    "{\"srcId\":2,\"dstId\":3,\"attr\":{\"values\":[2,3,\"follow\"]," + edgeSchema +"}}" +
                "]" +
            "}";
        assertEquals("failure - strings are not equal", expected, ret);

    }

}
