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

var sparkContext = new SparkContext("local[*]", "dataframe");
var sqlContext = new SQLContext(sparkContext);
var accum;


/*
 * Dataset tests
 */

var createDatasetFromArray = function() {
	var data = ["abc", "abc", "xyz"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	ds.show();
	return JSON.stringify(ds);
};

var datasetAsEncoder = function() {
	var data = [1, 2, 3];
	var ds = sqlContext.createDataset(data, Encoders.INT());
	var ds2 = ds.as(Encoders.STRING());
	return JSON.stringify(ds2);
};

var createDatasetFromRDD = function() {
	var data = [1, 2, 3];
	var rdd = sparkContext.parallelize(data).collect();
	var ds = sqlContext.createDataset(rdd, Encoders.INT());
	var ds2 = ds.as(Encoders.STRING());
	return JSON.stringify(ds2);
};

var datasetFilter = function() {
	var data = [1, 2, 3];
	var ds = sqlContext.createDataset(data, Encoders.INT());
	var ds2 = ds.filter(function(t){
		return (t < 3);
	});
	return JSON.stringify(ds2);
};

var datasetMap = function() {
	var data = ["hello", "world"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	var ds2 = ds.map(function(s){
		return s.length();
	}, Encoders.INT());
	return JSON.stringify(ds2);
};

var datasetMapPartitions = function() {
	var data = ["hello", "world"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	var ds2 = ds.mapPartitions(function(strs) {
		var r = [];
		strs.forEach(function(s) {
			r.push(s.toUpperCase());
		});
		return r;
	}, Encoders.STRING());
	
	return JSON.stringify(ds2);
};

var datasetForeach = function() {
	var data = [1, 2, 3];
	accum = sparkContext.accumulator(0);
	var ds = sqlContext.createDataset(data, Encoders.INT());
	var ds2 = ds.foreach(function(s, accum) {
		accum.add(s)
	});
	
	return accum.value();
};

var datasetForeachPartition = function() {
	var data = [1.11, 2.22, 3.33];
	accum = sparkContext.intAccumulator(0);
	var ds = sqlContext.createDataset(data, Encoders.FLOAT());
	var ds2 = ds.foreachPartition(function(nums, accum) {
		nums.forEach(function(n) {
			accum.add(n);
		});
	});
	
	return accum.value();
};

var datasetReduce = function() {
	var data = [1, 2, 3];;
	var ds = sqlContext.createDataset(data, Encoders.INT());
	var reduced = ds.reduce(function(n1, n2) {
		return n1 + n2;
	});
	return parseInt(reduced);

};

var datasetGroupBy = function() {
	var data = ["a", "foo", "bar"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	var grouped = ds.groupBy(function(v) {
		return v.length();
	}, Encoders.INT());
	var mapped = grouped.mapGroups(function(key, values) {
		var str = "" + key;
		values.forEach(function(v) {
			str = str + v;
		});
		return str;
	},Encoders.STRING());
	return JSON.stringify(mapped);

};

var datasetGroupByFlatMap = function() {
	var data = ["a", "foo", "bar"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	var grouped = ds.groupBy(function(v) {
		return v.length();
	}, Encoders.INT());
	var mapped = grouped.flatMapGroups(function(key, values) {
		var result = [ ""+key];
		var str = "";
		values.forEach(function(v) {
			str += v;
		});
		result.push(str);
		return result;
	},Encoders.STRING());
	return JSON.stringify(mapped);

};

var groupedDatasetReduce = function() {
	var data = ["a", "foo", "bar"];
	var ds = sqlContext.createDataset(data, Encoders.STRING());
	var grouped = ds.groupBy(function(v) {
		return v.length();
	}, Encoders.INT());
	var reduced = grouped.reduce(function(s1, s2) {
		return s1 + s2;
	});
	return JSON.stringify(reduced);

};
