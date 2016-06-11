package org.eclairjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptException;
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
        return ret;

    }

    public static void main(String[] args) {
        GatewayServer gatewayServer = new GatewayServer(new EclairJSGatewayServer());
        gatewayServer.start();
        System.out.println("Gateway Server Started");
    }
}
