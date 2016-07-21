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
 bin/eclairjs.sh examples/ml/binarizer_example.js"
 */


function run(sc) {
    var SQLContext = require('eclairjs/sql/SQLContext');
    var DataTypes = require('eclairjs/sql/types/DataTypes');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var Binarizer = require('eclairjs/ml/feature/Binarizer');

    var sql = new SQLContext(sc);
    var rdd = sc.parallelize([
        RowFactory.create([0, 0.1]),
        RowFactory.create([1, 0.8]),
        RowFactory.create([2, 0.2])
    ]);
    var schema = new StructType([
        new StructField("label", DataTypes.DoubleType, false, Metadata.empty()),
        new StructField("feature", DataTypes.DoubleType, false, Metadata.empty())
    ]);
    var continuousDataFrame = sql.createDataFrame(rdd, schema);
    var binarizer = new Binarizer()
        .setInputCol("feature")
        .setOutputCol("binarized_feature")
        .setThreshold(0.5);
    var binarizedDataFrame = binarizer.transform(continuousDataFrame);
    var binarizedFeatures = binarizedDataFrame.select("binarized_feature");

    return binarizedFeatures.collect();


}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript Binarizer Example");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);
    result.forEach(function (row) {
        var binarized_value = row.getDouble(0);
        print(binarized_value);
    });
    sc.stop();
}
