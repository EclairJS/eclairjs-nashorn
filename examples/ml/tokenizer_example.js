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
 bin/eclairjs.sh examples/ml/tokenizer_example.js"
 */

function run(sc) {


    var SQLContext = require('eclairjs/sql/SQLContext');
    var RowFactory = require('eclairjs/sql/RowFactory');
    var StructField = require('eclairjs/sql/types/StructField');
    var StructType = require('eclairjs/sql/types/StructType');
    var Metadata = require('eclairjs/sql/types/Metadata');
    var DataTypes = require('eclairjs/sql/types').DataTypes;
    var Tokenizer = require('eclairjs/ml/feature/Tokenizer');
    var RegexTokenizer = require('eclairjs/ml/feature/RegexTokenizer');

    var sqlContext = new SQLContext(sc);

    var jrdd = sc.parallelize([
      RowFactory.create(0, "Hi I heard about Spark"),
      RowFactory.create(1, "I wish Java could use case classes"),
      RowFactory.create(2, "Logistic,regression,models,are,neat")
    ]);

    var schema = new StructType([
      new StructField("label", DataTypes.IntegerType, false, Metadata.empty()),
      new StructField("sentence", DataTypes.StringType, false, Metadata.empty())
    ]);

    var sentenceDataFrame = sqlContext.createDataFrame(jrdd, schema);

    var tokenizer = new Tokenizer().setInputCol("sentence").setOutputCol("words");

    var wordsDataFrame = tokenizer.transform(sentenceDataFrame);
    var output="";
    var wordList=wordsDataFrame.select("words", "label"). take(3);

print(JSON.stringify(wordList))
    for (var i=0;i<wordList.length;i++) {
      var words = wordList[i].getList(0);
        words = words.concat(['cccc', 'yyy']);
      for (var inx=0;inx<words.length;inx++) output+=words[inx] + " ";
      output+="\n";
    }

    var regexTokenizer = new RegexTokenizer()
      .setInputCol("sentence")
      .setOutputCol("words")
      .setPattern("\\W");  // alternatively .setPattern("\\w+").setGaps(false);


    return output;

}

/*
 check if SparkContext is defined, if it is we are being run from Unit Test
 */

if (typeof sparkContext === 'undefined')  {
    var SparkConf = require('eclairjs/SparkConf');
    var SparkContext = require('eclairjs/SparkContext');
    var sparkConf = new SparkConf().setAppName("JavaScript TokenizerExample");
    var sc = new SparkContext(sparkConf);
    var result = run(sc);

    print(result);
    // $example off$
    sc.stop();
}
