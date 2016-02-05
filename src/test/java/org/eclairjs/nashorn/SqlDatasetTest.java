/*
 * Copyright 2015 IBM Corp.
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

public class SqlDatasetTest {

    
    /*
     * Dataset tests
     */
    
    @Test
    public void createDatasetFromArray() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([ ])
    	 * Encoders.STRING()
    	 * Dataset.show()
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("createDatasetFromArray");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[\"abc\"]," + schema + "},"
        		+ "{\"values\":[\"abc\"]," + schema + "},"
        		+ "{\"values\":[\"xyz\"]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void datasetAsEncoder() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([ ])
    	 * Encoders.STRING()
    	 * Dataset.show()
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetAsEncoder");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[\"1\"]," + schema + "},"
        		+ "{\"values\":[\"2\"]," + schema + "},"
        		+ "{\"values\":[\"3\"]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void createDatasetFromRDD() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset(RDD)
    	 * Encoders.STRING()
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("createDatasetFromRDD");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[\"1\"]," + schema + "},"
        		+ "{\"values\":[\"2\"]," + schema + "},"
        		+ "{\"values\":[\"3\"]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void datasetFilter() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.filter()
    	 * JSFilterFunction
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetFilter");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"integer\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[1]," + schema + "},"
        		+ "{\"values\":[2]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void datasetMap() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.map()
    	 * JSMapFunction
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetMap");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"integer\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[5]," + schema + "},"
        		+ "{\"values\":[5]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void datasetMapPartitions() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.mapPartitions()
    	 * JSMapPartitions
    	 * Dataset.toJSON()
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetMapPartitions");
        String schema = "\"schema\":{"
        		+ "\"fields\":["
        		+ 				"{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}"
        		+ 			"]"
        		+ "}";
        String expected = "["
        		+ "{\"values\":[\"HELLO\"]," + schema + "},"
        		+ "{\"values\":[\"WORLD\"]," + schema + "}"
        		+ "]";
        		
        assertEquals("should be same", expected, ret.toString());
    }
    
    @Test
    public void datasetForeach() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * sparkContext.accumulator(0)
    	 * Dataset.foreach()
    	 * JSForeachFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetForeach");

        		
        assertEquals("should be same", 6.0, ret);
    }
    
    @Test
    public void datasetForeachPartitions() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * sparkContext.accumulator(0)
    	 * Dataset.foreachPartition()
    	 * JSForeachPartitionFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();
        //String file = TestUtils.resourceToFile("/data/sql/people.txt");

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetForeachPartition");

        		
        assertEquals("should be same", 6, ret);
    }
    
    @Test
    public void datasetReduce() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.reduce()
    	 * JSReduceFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetReduce");		
        assertEquals("should be same", 6.0, ret);
    }
    
    @Test
    public void datasetGroupBy() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.groupBy(function, encoder)
    	 * GroupedDataset.mapGroups(function, encoder)
    	 * JSMapFunction
    	 * JSMapGroupsFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetGroupBy");	
        String schema = "{\"fields\":[{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}]}";
        String expected = "["
        		+ "{\"values\":[\"1a\"],\"schema\":"+schema+"},"
        		+ "{\"values\":[\"3foobar\"],\"schema\":"+schema+"}"
        		+ "]";


        assertEquals("should be same", expected, ret);
    }
    
    @Test
    public void datasetGroupByFlatMap() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.groupBy(function, encoder)
    	 * GroupedDataset.mapGroups(function, encoder)
    	 * JSMapFunction
    	 * JSMapGroupsFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("datasetGroupByFlatMap");	
        String schema = "{\"fields\":[{\"name\":\"value\",\"dataType\":\"string\",\"nullable\":true}]}";
        String expected = "["
        		+ "{\"values\":[\"1\"],\"schema\":"+schema+"},"
        		+ "{\"values\":[\"a\"],\"schema\":"+schema+"},"
        		+ "{\"values\":[\"3\"],\"schema\":"+schema+"},"
        		+ "{\"values\":[\"foobar\"],\"schema\":"+schema+"}"
        		+ "]";

        assertEquals("should be same", expected, ret);
    }
    
    
    @Test
    public void groupedDatasetReduce() throws Exception {
    	/*
    	 * tests
    	 * SQLContext.createDataset([])
    	 * Dataset.groupBy(function, encoder)
    	 * GroupedDataset.mapGroups(function, encoder)
    	 * JSMapFunction
    	 * JSMapGroupsFunction
    	 */
        ScriptEngine engine = TestUtils.getEngine();

        TestUtils.evalJSResource(engine, "/sql/datasettest.js");
        Object ret = ((Invocable)engine).invokeFunction("groupedDatasetReduce");	
        String schema = "{\"fields\":[{\"name\":\"_1\",\"dataType\":\"integer\",\"nullable\":true},{\"name\":\"_2\",\"dataType\":\"string\",\"nullable\":true}]}";
        String expected = "["
        		+ "{\"values\":[1,\"a\"],\"schema\":"+schema+"},"
        		+ "{\"values\":[3,\"foobar\"],\"schema\":"+schema+"}"
        		+ "]";
        assertEquals("should be same", expected, ret);
    }
}
