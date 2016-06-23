package org.eclairjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import py4j.GatewayServer;

import java.util.HashMap;

/**
 * Created by bburns on 6/10/16.
 */
public class EclairJSGatewayServer {


    private ScriptEngine engine = NashornEngineSingleton.getEngine();
    private GatewayServer gateway = null;

    public EclairJSGatewayServer() {
        engine.put("eclairJSGatewayServer", this);
    }

    public void setGateway(GatewayServer gateway) {
        this.gateway = gateway;
    }

    public Object eval(String javaScript) {
        Object ret;
        try {
            ret = engine.eval(javaScript);
        }  catch (Exception e) {
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

        //return ret.toString();
        return ret;
    }

    public void onRDD(String id, String msg) {
        IForeachRDD fr = (IForeachRDD)this.gateway.getPythonServerEntryPoint(new Class[] {IForeachRDD.class});
        fr.on_rdd(id,msg);
    }

    public static void main(String[] args) {
        EclairJSGatewayServer es = new EclairJSGatewayServer();
        GatewayServer gatewayServer = new GatewayServer(es);
        es.setGateway(gatewayServer);
        gatewayServer.start();

        //ReflectionUtil.setClassLoadingStrategy(new CurrentThreadClassLoadingStrategy());
        System.out.println("Gateway Server Started");

        System.out.println("eval 1 = " + es.eval("var SparkContext = require(\"ecalirjs/SparkContext\")"));
        System.out.println("eval 2 = " + es.eval("var sc = new SparkContext(\"local[*]\", \"foo\")"));
    }
}
