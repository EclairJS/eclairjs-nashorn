package org.eclairjs.nashorn;

import javax.script.ScriptEngine;
import javax.script.ScriptException;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import py4j.GatewayServer;
import py4j.reflection.ReflectionUtil;
import py4j.reflection.RootClassLoadingStrategy;

import java.util.HashMap;

/**
 * Created by bburns on 6/10/16.
 */
public class EclairJSGatewayServer {

    static {
        try {
            Class.forName("org.eclairjs.nashorn.IForeachRDD");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    private ScriptEngine engine = NashornEngineSingleton.getEngine();
    private HashMap<String, Object> listeners
            = new HashMap<String, Object>();

    public EclairJSGatewayServer() {
        engine.put("commMap", listeners);
    }

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

        //return ret.toString();
        return ret;
    }

    public String testMe() {
        String name = null;
        try {
            Class clazz = ReflectionUtil.classForName("org.eclairjs.nashorn.IForeachRDD");
            name = clazz.getName();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return name;
    }

    public void registerForeachRDD(String id, Object listener) {
        listeners.put(id, listener);
    }

    public static void main(String[] args) {
        GatewayServer gatewayServer = new GatewayServer(new EclairJSGatewayServer());
        //ReflectionUtil.setClassLoadingStrategy(new RootClassLoadingStrategy());
        gatewayServer.start();
        System.out.println("Gateway Server Started");
    }
}
