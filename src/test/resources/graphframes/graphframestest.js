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
var SparkConf = require(EclairJS_Globals.NAMESPACE + '/SparkConf');
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');
var SQLContext = require(EclairJS_Globals.NAMESPACE + '/sql/SQLContext');
var RowFactory = require(EclairJS_Globals.NAMESPACE + '/sql/RowFactory');
var DataTypes = require(EclairJS_Globals.NAMESPACE + '/sql/types/DataTypes');

var GraphFrame  = require(EclairJS_Globals.NAMESPACE + '/graphframes/GraphFrame')
var sparkConf = new SparkConf().setAppName("GraphFrames Example");
var sparkContext = new SparkContext(sparkConf);
var sqlContext = new SQLContext(sparkContext);


var vSchema = DataTypes.createStructType([
    DataTypes.createStructField("id", DataTypes.IntegerType, true),
    DataTypes.createStructField("name", DataTypes.StringType, true)
]);

var eSchema = DataTypes.createStructType([
    DataTypes.createStructField("src", DataTypes.IntegerType, true),
    DataTypes.createStructField("dst", DataTypes.IntegerType, true),
    DataTypes.createStructField("action", DataTypes.StringType, true)
]);

var verticesDF = sqlContext.createDataFrame([
    RowFactory.create([1,"A"]),
    RowFactory.create([2,"B"]),
    RowFactory.create([3, "C"])
], vSchema);

var edgesDF = sqlContext.createDataFrame([
    RowFactory.create([1,2,"love"]),
    RowFactory.create([2,1,"hate"]),
    RowFactory.create([2,3,"follow"])
], eSchema);

var constructionFromDataFrames = function() {
    var gf = new GraphFrame(verticesDF, edgesDF);
    return gf.toString();
}

var graphXFromDF = function() {
    var gf = new GraphFrame(verticesDF, edgesDF);
    var g = gf.toGraphX();
    var vertexRows = g.vertices().collect();
    /*
    var ret = "";
    for (var i = 0; i < vertexRows.length; i++) {
        ret = ret + vertexRows[i];
    }
    print(JSON.stringify(vertexRows))
    */
    var edgeRows = g.edges().collect();
    /*
    for (var i = 0; i < edgeRows.length; i++) {
        ret = ret + edgeRows[i];
    }
    print(JSON.stringify(edgeRows))
    */
    var ret = {};
    ret.vertexRows = vertexRows;
    ret.edgeRows = edgeRows;
    return JSON.stringify(ret);
}