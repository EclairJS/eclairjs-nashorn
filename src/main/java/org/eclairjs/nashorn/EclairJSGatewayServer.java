package org.eclairjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import py4j.GatewayServer;

/**
 * Created by bburns on 6/10/16.
 */
public class EclairJSGatewayServer {

    private ScriptEngine engine = NashornEngineSingleton.getEngine();

    public Object eval(String javaScript) {
        Object ret;
        try {
            ret = engine.eval(javaScript);
        }  catch (ScriptException e) {
            // TODO Auto-generated catch block
            System.out.println(e);
            ret = e;

        }

        //leave this here. It tells the python kernel no more stdout output
        //is coming.
        System.out.println("eclairjs_done_execute");
        //return (ret != null) ? ret.toString() : null;
        if(ret == null)
            return ret;

        if(ret instanceof Number)
            return ret;

        if(ret instanceof ScriptObjectMirror)
            return ((ScriptObjectMirror)ret).getClassName();

        return ret.toString();
    }

    public static void main(String[] args) {
        GatewayServer gatewayServer = new GatewayServer(new EclairJSGatewayServer());
        gatewayServer.start();
        System.out.println("Gateway Server Started");
    }
}
