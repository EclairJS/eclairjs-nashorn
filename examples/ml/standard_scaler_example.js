/*
 * Copyright 2015 IBM Corp.
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
 bin/eclairjs.sh examples/ml/vector_slicer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var StandardScaler = require('eclairjs/ml/feature/StandardScaler');


    var sqlContext = new SQLContext(sc);

    var dataFrame = sqlContext.read().format("libsvm").load("examples/data/mllib/sample_libsvm_data.txt");

    var scaler = new StandardScaler()
      .setInputCol("features")
      .setOutputCol("scaledFeatures")
      .setWithStd(true)
      .setWithMean(false);

    // Compute summary statistics by fitting the StandardScaler
    var scalerModel = scaler.fit(dataFrame);

    // Normalize each feature to have unit standard deviation.
    var scaledData = scalerModel.transform(dataFrame);

    return scaledData;


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript StandardScalerExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

    result.show(20,true);

    // $example off$
    sc.stop();
}
