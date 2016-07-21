package examples;/*
 * Copyright 2016 IBM Corp.
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

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.*;

// $example on$
import java.util.Arrays;
import java.util.List;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.ml.feature.PolynomialExpansion;
import org.apache.spark.mllib.linalg.VectorUDT;
import org.apache.spark.mllib.linalg.Vectors;
import org.apache.spark.sql.types.Metadata;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;
// $example off$

public class JavaPolynomialExpansionExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaPolynomialExpansionExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext jsql = new SQLContext(jsc);

        // $example on$
        PolynomialExpansion polyExpansion = new PolynomialExpansion()
                .setInputCol("features")
                .setOutputCol("polyFeatures")
                .setDegree(3);

        JavaRDD<Row> data = jsc.parallelize(Arrays.asList(
                RowFactory.create(Vectors.dense(-2.0, 2.3)),
                RowFactory.create(Vectors.dense(0.0, 0.0)),
                RowFactory.create(Vectors.dense(0.6, -1.1))
        ));

        StructType schema = new StructType(new StructField[]{
                new StructField("features", new VectorUDT(), false, Metadata.empty()),
        });

        DataFrame df = jsql.createDataFrame(data, schema);
        DataFrame polyDF = polyExpansion.transform(df);

        List<Row> rows = polyDF.select("polyFeatures").takeAsList(3);
        for (Row r : rows) {
            System.out.println(r.get(0));
        }
        // $example off$
        jsc.stop();
    }
}

