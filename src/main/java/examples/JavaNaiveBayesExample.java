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
// $example on$
import org.apache.spark.ml.classification.NaiveBayes;
import org.apache.spark.ml.classification.NaiveBayesModel;
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator;
import org.apache.spark.sql.DataFrame;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
// $example off$

/**
 * An example for Naive Bayes Classification.
 */
public class JavaNaiveBayesExample {

    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaNaiveBayesExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext jsql = new SQLContext(jsc);

        // $example on$
        // Load training data
        DataFrame dataFrame = jsql.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");
        // Split the data into train and test
        DataFrame[] splits = dataFrame.randomSplit(new double[]{0.6, 0.4}, 1234L);
        DataFrame train = splits[0];
        DataFrame test = splits[1];

        // create the trainer and set its parameters
        NaiveBayes nb = new NaiveBayes();
        // train the model
        NaiveBayesModel model = nb.fit(train);
        // compute precision on the test set
        DataFrame result = model.transform(test);
        DataFrame predictionAndLabels = result.select("prediction", "label");
        MulticlassClassificationEvaluator evaluator = new MulticlassClassificationEvaluator()
                .setMetricName("precision");
        System.out.println("Precision = " + evaluator.evaluate(predictionAndLabels));
        // $example off$

        jsc.stop();
    }
}
