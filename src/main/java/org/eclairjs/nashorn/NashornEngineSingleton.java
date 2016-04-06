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

import jdk.nashorn.api.scripting.NashornScriptEngineFactory;

import java.io.FileNotFoundException;
import java.io.FileReader;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;

public class NashornEngineSingleton {
	//public static ScriptEngineManager engineManager = new ScriptEngineManager();
	static ScriptEngine engine = null;
    static Boolean sparkJSLoaded = false;

	public static ScriptEngine getEngine() {
        if(engine == null) {
           // ScriptEngineManager engineManager = new ScriptEngineManager();
           // engine = engineManager.getEngineByName("nashorn");
           NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
             engine =
                    factory.getScriptEngine(new String[] { "-scripting" }); // -scripting needed for r.js (requireJS for Nashorn
            engine.put("javaNashorn", true); // set to surpress r.js showhelp message

            //engine.eval("load('src/test.js');");
            try {
                engine.eval("load('src/r.js');");
                // contents of main.js:
                engine.eval("require.config({ paths: { eclairjs: 'src/main/resources'}});"); // FIXME should be config option ?
            } catch (Exception e) {
                System.err.println(e);
            }
        }

        loadSparkJS();
        return engine;
    }

    public static void loadSparkJS ()  {
        if (sparkJSLoaded != true) {
            new SparkBootstrap().load(engine);
            sparkJSLoaded = true;
        }
    }

	public static void setEngine(ScriptEngine e) {
    	engine = e;
    	sparkJSLoaded = true;
    }

	/**
	 * @param args
	 */
	public static void main(String[] args) {
        try {
            getEngine().eval(new FileReader(args[0]));
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ScriptException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	}
}
