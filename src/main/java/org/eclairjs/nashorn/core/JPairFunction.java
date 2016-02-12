package org.eclairjs.nashorn.core;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Context;
import jdk.nashorn.internal.runtime.ScriptFunction;
import jdk.nashorn.internal.runtime.ScriptRuntime;
import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.api.java.function.PairFunction;
import org.eclairjs.nashorn.NashornEngineSingleton;
import org.eclairjs.nashorn.Utils;
import scala.Tuple2;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.List;

public class JPairFunction implements PairFunction {

    private final String func;
    private final Object[] scopeVar;
    private String functionName = null;
    private ScriptFunction scriptFunction;


    public JPairFunction(ScriptFunction scriptFunction)
    {
        this.functionName = Utils.getUniqeFunctionName();
        this.func = "var " + this.functionName +" = " + scriptFunction.safeToString();
        this.scopeVar = new Object[0];
        this.scriptFunction=scriptFunction;
    }

    public Tuple2 call(Object a) throws Exception {

        ScriptEngine e = NashornEngineSingleton.getEngine();

//        e.eval(this.func);
//        Invocable invocable = (Invocable) e;
        Object o = Utils.javaToJs(a, e);
        Object params[] = {o};
        if (this.scopeVar.length > 0 ) {
        	/*
        	 * We need to wrap the Spark objects
        	 */
            @SuppressWarnings("rawtypes")
            List sv = new ArrayList();
            for (int i = 0; i < this.scopeVar.length; i++) {
                sv.add(Utils.javaToJs(this.scopeVar[i], e));
            }
            params = ArrayUtils.addAll(params, sv.toArray());
        }


        Object obj=ScriptRuntime.apply(this.scriptFunction, Context.getGlobal(),params);
//        ScriptObjectMirror ret = (ScriptObjectMirror) invocable.invokeFunction(this.functionName, params); // FIXME reusing the function name in same engine not a good idea

        @SuppressWarnings("rawtypes")
        ArrayList l = new ArrayList();
//        ArrayList l = new ArrayList(ret.values());
        Object t1 = Utils.jsToJava(l.get(0));
        Object t2 = Utils.jsToJava(l.get(1));
        @SuppressWarnings("rawtypes")
        Tuple2 t = new Tuple2(t1, t2);

        return t;
    }

}
