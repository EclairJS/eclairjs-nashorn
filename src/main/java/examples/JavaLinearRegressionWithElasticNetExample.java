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
        import org.apache.spark.ml.regression.LinearRegression;
        import org.apache.spark.ml.regression.LinearRegressionModel;
        import org.apache.spark.ml.regression.LinearRegressionTrainingSummary;
        import org.apache.spark.mllib.linalg.Vectors;
        import org.apache.spark.sql.DataFrame;
        import org.apache.spark.sql.Dataset;
        import org.apache.spark.sql.Row;
        import org.apache.spark.sql.SQLContext;
// $example off$

public class JavaLinearRegressionWithElasticNetExample {
    public static void main(String[] args) {
        SparkConf conf = new SparkConf().setAppName("JavaLinearRegressionWithElasticNetExample").setMaster("local[*]");
        JavaSparkContext jsc = new JavaSparkContext(conf);
        SQLContext sqlContext = new SQLContext(jsc);

        // $example on$
        // Load training data
        DataFrame training = sqlContext.read().format("libsvm")
                .load("examples/data/mllib/sample_linear_regression_data.txt");

        LinearRegression lr = new LinearRegression()
                .setMaxIter(10)
                .setRegParam(0.3)
                .setElasticNetParam(0.8);

        // Fit the model
        LinearRegressionModel lrModel = lr.fit(training);

        // Print the coefficients and intercept for linear regression
        System.out.println("Coefficients: "
                + lrModel.coefficients() + " Intercept: " + lrModel.intercept());

        // Summarize the model over the training set and print out some metrics
        LinearRegressionTrainingSummary trainingSummary = lrModel.summary();
        System.out.println("numIterations: " + trainingSummary.totalIterations());
        System.out.println("objectiveHistory: " + Vectors.dense(trainingSummary.objectiveHistory()));
        trainingSummary.residuals().show();
        System.out.println("RMSE: " + trainingSummary.rootMeanSquaredError());
        System.out.println("r2: " + trainingSummary.r2());
        // $example off$

        jsc.stop();
    }
}

