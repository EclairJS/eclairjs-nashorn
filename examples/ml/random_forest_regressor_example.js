/*
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
/*
 Usage:
 bin/eclairjs.sh examples/ml/random_forest_regressor_example.js"
 */

function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var VectorIndexer = require("eclairjs/ml/feature/VectorIndexer");
   var RandomForestRegressor = require("eclairjs/ml/regression/RandomForestRegressor");
   var RegressionEvaluator = require("eclairjs/ml/evaluation/RegressionEvaluator");
    var Pipeline = require("eclairjs/ml/Pipeline");


    var sqlContext = new SQLContext(sc);

    // Load and parse the data file, converting it to a DataFrame.
    var data =
        sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    // Automatically identify categorical features, and index them.
    // Set maxCategories so features with > 4 distinct values are treated as continuous.
    var featureIndexer = new VectorIndexer()
        .setInputCol("features")
        .setOutputCol("indexedFeatures")
        .setMaxCategories(4)
        .fit(data);

    // Split the data into training and test sets (30% held out for testing)
    var splits = data.randomSplit([0.7, 0.3]);
    var trainingData = splits[0];
    var testData = splits[1];

    // Train a RandomForest model.
    var rf = new RandomForestRegressor()
        .setLabelCol("label")
        .setFeaturesCol("indexedFeatures");

    // Chain indexer and forest in a Pipeline
    var pipeline = new Pipeline()
        .setStages([featureIndexer, rf]);

    // Train model.  This also runs the indexer.
    var model = pipeline.fit(trainingData);

    // Make predictions.
    var predictions = model.transform(testData);

    var ret = {};
    // Select example rows to display.
    ret.predictionsDF =  predictions.select("prediction", "label", "features");

    // Select (prediction, true label) and compute test error
    var evaluator = new RegressionEvaluator()
        .setLabelCol("label")
        .setPredictionCol("prediction")
        .setMetricName("rmse");
    ret.rmse = evaluator.evaluate(predictions);

    ret.rfModel = model.stages()[1];

    return ret;

}


/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined') {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');

    var sparkConf = new SparkConf().setAppName("Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.predictionsDF.show(5);
    print("Root Mean Squared Error (RMSE) on test data = " + result.rmse);
    print("Learned regression forest model:\n" + result.rfModel.toDebugString());

    sc.stop();
}