package org.eclairjs.nashorn.core;

import jdk.nashorn.api.scripting.AbstractJSObject;
import jdk.nashorn.api.scripting.ScriptUtils;
import jdk.nashorn.internal.objects.NativeArray;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import scala.Tuple2;

import java.util.ArrayList;
import java.util.List;

public class ConvertUtils {

    public static List<Tuple2<Object,Object>> toTupleList(NativeArray jsArray)
    {
        Object [] arr=jsArray.asObjectArray();
        List<Tuple2<Object,Object>> tupleList= new ArrayList(arr.length);
        for (int i=0;i<arr.length;i++)
        {
            Object obj=arr[i];
            Object[] arr2=((NativeArray)obj).asObjectArray();
            tupleList.add(new Tuple2(arr2[0],arr2[1]));
        }
        return tupleList;
    }
}
