package org.eclairjs.nashorn.core;


import jdk.nashorn.api.scripting.AbstractJSObject;
import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.objects.NativeArray;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import scala.Tuple2;

import java.util.List;

public class SparkContext  extends AbstractJSObject {
    // underlying nio buffer
    private final JavaSparkContext sparkContext;
    public SparkContext() {
        SparkConf sparkConf =new SparkConf().setAppName("test").setMaster("local[*]");
        sparkContext=new org.apache.spark.api.java.JavaSparkContext(sparkConf);
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
            case "parallelizePairs":
                // return a 'function' value for this property
                return new AbstractJSObject() {
                    @Override
                    public Object call(Object thiz, Object... args) {
//                        sparkContext.parallelizePairs();
                        System.out.println(thiz);
                        List<Tuple2<Object,Object>> tuples= ConvertUtils.toTupleList((NativeArray) args[0]);
                        int numSlices=((Integer)args[1]).intValue();
                        JavaPairRDD pairRDD= sparkContext.parallelizePairs(tuples,numSlices);
                        return new JRDD(pairRDD);
                    }
                    // yes, I'm a function !
                    @Override
                    public boolean isFunction() {
                        return true;
                    }
                };
        }
        throw new RuntimeException("SparkContext."+name+" is not defined");
    }
}
