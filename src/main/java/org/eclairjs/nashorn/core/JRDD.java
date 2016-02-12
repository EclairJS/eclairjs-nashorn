package org.eclairjs.nashorn.core;


import jdk.nashorn.api.scripting.AbstractJSObject;
import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.objects.NativeArray;
import jdk.nashorn.internal.runtime.ScriptFunction;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.util.List;

public class JRDD extends AbstractJSObject {
    // underlying nio buffer
    private final JavaPairRDD rdd;
    public JRDD(JavaPairRDD rdd) {
        this.rdd=rdd;
    }

    // do you have a property of that given name?
    @Override
    public boolean hasMember(String name) {
        return "length".equals(name) || "buf".equals(name);
    }
    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
//            case "length":
//                return buf.capacity();
            case "cache":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {
//                        sparkContext.parallelizePairs();
                        JavaPairRDD pairRDD= rdd.cache();
                        return new JRDD(pairRDD);
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
            case "mapToPair":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {
//                        sparkContext.parallelizePairs();

                        ScriptFunction scriptFunction=(ScriptFunction) args[0];
                        PairFunction pairFunction=new JPairFunction(scriptFunction);
                        JavaPairRDD pairRDD= rdd.mapToPair(pairFunction);
                        return new JRDD(pairRDD);
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
            case "count":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {
                        return new Long(rdd.count());
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
            case "distinct":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {
                        return new JRDD(rdd.distinct());
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
            case "union":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {

                       return new JRDD( rdd.union(((JRDD) args[0]).rdd));
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
            case "join":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {

                        return new JRDD( rdd.join(((JRDD) args[0]).rdd));
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
        }
        throw new RuntimeException("RDD."+name+" is not defined");
    }
}
