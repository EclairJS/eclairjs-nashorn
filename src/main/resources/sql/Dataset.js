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



/**
 * :: Experimental ::
 * A {@link Dataset} is a strongly typed collection of objects that can be transformed in parallel
 * using functional or relational operations.
 *
 * A [[Dataset]] differs from an {@link RDD} in the following ways:
 *  - Internally, a {@link Dataset} is represented by a Catalyst logical plan and the data is stored
 *    in the encoded form.  This representation allows for additional logical operations and
 *    enables many operations (sorting, shuffling, etc.) to be performed without deserializing to
 *    an object.
 *  - The creation of a [[Dataset]] requires the presence of an explicit {@link Encoder} that can be
 *    used to serialize the object into a binary format.  Encoders are also capable of mapping the
 *    schema of a given object to the Spark SQL type system.  In contrast, RDDs rely on runtime
 *    reflection based serialization. Operations that change the type of object stored in the
 *    dataset also need an encoder for the new type.
 *
 * A {@link Dataset} can be thought of as a specialized DataFrame, where the elements map to a specific
 * JVM object type, instead of to a generic {@link Row} container. A DataFrame can be transformed into
 * specific Dataset by calling `df.as[ElementType]`.  Similarly you can transform a strongly-typed
 * {@link Dataset} to a generic DataFrame by calling `ds.toDF()`.
 *
 * COMPATIBILITY NOTE: Long term we plan to make {@link DataFrame} extend `Dataset[Row]`.  However,
 * making this change to the class hierarchy would break the function signatures for the existing
 * functional operations (map, flatMap, etc).  As such, this class should be considered a preview
 * of the final API.  Changes will be made to the interface after Spark 1.6.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @classdesc
 * @constructor
 */


var Dataset = function(jvmObject) {
	 
	 this.logger = Logger.getLogger("Dataset_js");
	 JavaWrapper.call(this, jvmObject);

};

Dataset.prototype = Object.create(JavaWrapper.prototype);

Dataset.prototype.constructor = Dataset;



/**
 * Returns the schema of the encoded form of the objects in this {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {StructType} 
 */
Dataset.prototype.schema = function() {
   return  new StructType(this.getJavaObject().schema());
}


/**
 * Prints the schema of the underlying {@link Dataset} to the console in a nice tree format.
 * @since EclairJS 0.1 Spark  1.6.0
 */
Dataset.prototype.printSchema = function() {
    this.getJavaObject().printSchema();
}


/**
 * Prints the plans (logical and physical) to the console for debugging purposes.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {boolean} extended if true prints (logical and physical) plans, defaults is false;
 */
Dataset.prototype.explain = function(extended) {
	var ext = extended ? true : false;
    this.getJavaObject().explain(extended);
}


/**
 * Returns a new {@link Dataset} where each record has been mapped on to the specified type.  
 * @since EclairJS 0.1 Spark  1.6.0
 * @para {Encoder} encoder
 * @returns {Dataset} 
 */
Dataset.prototype.as = function(encoder) {
	return  new Dataset(this.getJavaObject().as(Utils.unwrapObject(encoder)));
}


/**
 * Converts this strongly typed collection of data to generic Dataframe.  In contrast to the
 * strongly typed objects that Dataset operations work on, a Dataframe returns generic {@link Row}
 * objects that allow fields to be accessed by ordinal or name.
 * @returns {DataFrame} 
 */
Dataset.prototype.toDF = function() {
	return  new DataFrame(this.getJavaObject().toDF());
}

/**
 * Returns this {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
Dataset.prototype.toDS = function() {
	return  new Dataset(this.getJavaObject().toDS());
}


/**
 * Converts this [[Dataset]] to an {@link RDD}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {RDD} 
 */
Dataset.prototype.rdd = function() {
	return  new RDD(this.getJavaObject().rdd());
}


/**
 * Returns the number of elements in the {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {number} 
 */
Dataset.prototype.count = function() {
	return  this.getJavaObject().count();
}


/**
 * Displays the content of this {@link Dataset} in a tabular form. Strings more than 20 characters
 * will be truncated, and all cells will be aligned right. For example:
 * @example 
 *   year  month AVG('Adj Close) MAX('Adj Close)
 *   1980  12    0.503218        0.595103
 *   1981  01    0.523289        0.570307
 *   1982  02    0.436504        0.475256
 *   1983  03    0.410516        0.442194
 *   1984  04    0.450090        0.483521
 *  
 * @param {number} numRows  Number of rows to show, default is 20 rows
 * @param {boolean} truncate  Whether truncate long strings. If true, strings more than 20 characters will
 *              be truncated and all cells will be aligned right, default is false;
 *
 * @since EclairJS 0.1 Spark  1.6.0
 */
Dataset.prototype.show = function(numRows, truncate) {
	var nr = numRows ? numRows : 20;
	var trunc = truncate ? truncate : false;
	this.getJavaObject().show(nr, trunc);
}

/**
 * Returns a new {@link Dataset} that has exactly `numPartitions` partitions.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {integer} numPartitions
 * @returns {Dataset} 
 */
Dataset.prototype.repartition = function(numPartitions) {
	return  new Dataset(this.getJavaObject().repartition(numPartitions));
}


/**
 * Returns a new {@link Dataset} that has exactly `numPartitions` partitions.
 * Similar to coalesce defined on an {@link RDD}, this operation results in a narrow dependency, e.g.
 * if you go from 1000 partitions to 100 partitions, there will not be a shuffle, instead each of
 * the 100 new partitions will claim 10 of the current partitions.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {integer}
 * @returns {Dataset} 
 */
Dataset.prototype.coalesce = function(numPartitions) {
	return  new Dataset(this.getJavaObject().coalesce(numPartitions));
}


/**
 * Concise syntax for chaining custom transformations.
 * @example 
 *   def featurize(ds: Dataset[T]) = ...
 *
 *   dataset
 *     .transform(featurize)
 *     .transform(...)
 *  
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {func}
 * @returns {Dataset} 
 * @private
 */
Dataset.prototype.transform = function(t) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(t);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   return  this.getJavaObject().transform(fn);
}


/**
 * Returns a new {@link Dataset} that only contains elements where `func` returns `true`.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} filterFunction
 * @returns {Dataset} 
 */
Dataset.prototype.filter = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSFilterFunction(sv.funcStr, sv.scopeVars);
	return  new Dataset(this.getJavaObject().filter(fn));
}


/**
 * Returns a new {@link Dataset} that contains the result of applying `func` to each element.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} MapFunction
 * @param {Encoder}
 * @returns {Dataset} 
 */
Dataset.prototype.map = function(func,encoder) {
	var sv = Utils.createJavaParams(func);
	var encoder_uw = Utils.unwrapObject(encoder);
	var fn = new org.eclairjs.nashorn.JSMapFunction(sv.funcStr, sv.scopeVars);
	return  new Dataset(this.getJavaObject().map(fn, encoder_uw));
}


/**
 * Returns a new {@link Dataset} that contains the result of applying `func` to each partition.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} MapPartitionsFunction
 * @param {Encoder}
 * @returns {Dataset} 
 */
Dataset.prototype.mapPartitions = function(func,encoder) {
	var encoder_uw = Utils.unwrapObject(encoder);
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSMapPartitionsFunction(sv.funcStr, sv.scopeVars);
	return  new Dataset(this.getJavaObject().mapPartitions(fn,encoder_uw));
}


/**
 * Returns a new [[Dataset]] by first applying a function to all elements of this {@link Dataset},
 * and then flattening the results.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {functions} FlatMapFunction
 * @param {Encoder}
 * @returns {Dataset} 
 */
Dataset.prototype.flatMap = function(func,encoder) {
	var encoder_uw = Utils.unwrapObject(encoder);
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSMapPartitionsFunction(sv.funcStr, sv.scopeVars);
	return  new Dataset(this.getJavaObject().flatMap(fn,encoder_uw));
}


/**
 * Runs `func` on each element of this {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} ForeachFunction
 */
Dataset.prototype.foreach = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSForeachFunction(sv.funcStr, sv.scopeVars);
	this.getJavaObject().foreach(fn);
}


/**
 * Runs `func` on each partition of this {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} ForeachPartitionFunction
 */
Dataset.prototype.foreachPartition = function(func) {
	var sv = Utils.createJavaParams(func);
	var fn = new org.eclairjs.nashorn.JSForeachPartitionFunction(sv.funcStr, sv.scopeVars);
	this.getJavaObject().foreachPartition(fn);
}


/**
 * Reduces the elements of this Dataset using the specified binary function.  The given `func`
 * must be commutative and associative or the result may be non-deterministic.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {ReduceFunction}
 * @returns {object} 
 */
Dataset.prototype.reduce = function(func) {
    var sv = Utils.createJavaParams(func, 2);
    var fn = new org.eclairjs.nashorn.JSReduceFunction(sv.funcStr, sv.scopeVars);
    var javaObject =  this.getJavaObject().reduce(fn);
    return Utils.javaToJs(javaObject);
}


/**
 * Returns a {@link GroupedDataset} where the data is grouped by the given key `func` or by the given {@link Column} expressions.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Column[] | function} columnsOrFunction- Array of Column objects or function.
 * @returns {GroupedDataset} 
 */
Dataset.prototype.groupBy = function() {
	var args = Array.prototype.slice.call(arguments);
	var jGroupedData;
	if (typeof args[0] === 'function') {
		var sv = Utils.createJavaParams(args[0]);
		var encoder_uw = Utils.unwrapObject(args[1]);
		var fn = new org.eclairjs.nashorn.JSMapFunction(sv.funcStr, sv.scopeVars);
		jGroupedData =  this.getJavaObject().groupBy(fn, encoder_uw);
	} else {
		// must be columns
		var jCols = args.map(function(v) {
			return Utils.unwrapObject(v);
		});
		jGroupedData = this.getJavaObject().groupBy(jCols);
	}
	return new GroupedDataset(jGroupedData);

}


/**
 * Returns a new [[Dataset]] by computing the given {@link Column} expression for each element.
 *
 * @example 
 *   val ds = Seq(1, 2, 3).toDS()
 *   val newDS = ds.select(expr("value + 1").as[Int])
 *  
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
Dataset.prototype.select0 = function(c1) {
throw "not implemented by ElairJS";
//   var c1_uw = Utils.unwrapObject(c1);
//   return  this.getJavaObject().select(c1_uw);
}


/**
 * Returns a new [[Dataset]] by computing the given {@link Column} expressions for each element.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
Dataset.prototype.select1 = function(c1,c2) {
throw "not implemented by ElairJS";
//   var c1_uw = Utils.unwrapObject(c1);
//   var c2_uw = Utils.unwrapObject(c2);
//   return  this.getJavaObject().select(c1_uw,c2_uw);
}


/**
 * Returns a new [[Dataset]] by computing the given {@link Column} expressions for each element.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
Dataset.prototype.select2 = function(c1,c2,c3) {
throw "not implemented by ElairJS";
//   var c1_uw = Utils.unwrapObject(c1);
//   var c2_uw = Utils.unwrapObject(c2);
//   var c3_uw = Utils.unwrapObject(c3);
//   return  this.getJavaObject().select(c1_uw,c2_uw,c3_uw);
}


/**
 * Returns a new [[Dataset]] by computing the given {@link Column} expressions for each element.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
Dataset.prototype.select3 = function(c1,c2,c3,c4) {
throw "not implemented by ElairJS";
//   var c1_uw = Utils.unwrapObject(c1);
//   var c2_uw = Utils.unwrapObject(c2);
//   var c3_uw = Utils.unwrapObject(c3);
//   var c4_uw = Utils.unwrapObject(c4);
//   return  this.getJavaObject().select(c1_uw,c2_uw,c3_uw,c4_uw);
}


/**
 * Returns a new [[Dataset]] by computing the given {@link Column} expressions for each element.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
Dataset.prototype.select4 = function(c1,c2,c3,c4,c5) {
throw "not implemented by ElairJS";
//   var c1_uw = Utils.unwrapObject(c1);
//   var c2_uw = Utils.unwrapObject(c2);
//   var c3_uw = Utils.unwrapObject(c3);
//   var c4_uw = Utils.unwrapObject(c4);
//   var c5_uw = Utils.unwrapObject(c5);
//   return  this.getJavaObject().select(c1_uw,c2_uw,c3_uw,c4_uw,c5_uw);
}


/**
 * Returns a new {@link Dataset} by sampling a fraction of records.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {boolean}
 * @param {number}
 * @param {number}
 * @returns {Dataset} 
 */
Dataset.prototype.samplewithSeed = function(withReplacement,fraction,seed) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().sample(withReplacement,fraction,seed);
}


/**
 * Returns a new {@link Dataset} by sampling a fraction of records, using a random seed.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {boolean}
 * @param {number}
 * @returns {Dataset} 
 */
Dataset.prototype.sample = function(withReplacement,fraction) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().sample(withReplacement,fraction);
}


/**
 * Returns a new [[Dataset]] that contains only the unique elements of this {@link Dataset}.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
Dataset.prototype.distinct = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().distinct();
}


/**
 * Returns a new [[Dataset]] that contains only the elements of this {@link Dataset} that are also
 * present in `other`.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Dataset}
 * @returns {Dataset} 
 */
Dataset.prototype.intersect = function(other) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   return  this.getJavaObject().intersect(other_uw);
}


/**
 * Returns a new [[Dataset]] that contains the elements of both this and the `other` {@link Dataset}
 * combined.
 *
 * Note that, this function is not a typical set union operation, in that it does not eliminate
 * duplicate items.  As such, it is analogous to `UNION ALL` in SQL.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Dataset}
 * @returns {Dataset} 
 */
Dataset.prototype.union = function(other) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   return  this.getJavaObject().union(other_uw);
}


/**
 * Returns a new {@link Dataset} where any elements present in `other` have been removed.
 *
 * Note that, equality checking is performed directly on the encoded representation of the data
 * and thus is not affected by a custom `equals` function defined on `T`.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Dataset}
 * @returns {Dataset} 
 */
Dataset.prototype.subtract = function(other) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   return  this.getJavaObject().subtract(other_uw);
}


/**
 * Joins this [[Dataset]] returning a {@link Tuple2} for each pair where `condition` evaluates to
 * true.
 *
 * This is similar to the relation `join` function with one important difference in the
 * result schema. Since `joinWith` preserves objects present on either side of the join, the
 * result schema is similarly nested into a tuple under the column names `_1` and `_2`.
 *
 * This type of join can be useful both for preserving type-safety with the original object
 * types as well as working with relational data where either side of the join has column
 * names in common.
 *
 * @param {Dataset} other  Right side of the join.
 * @param {Column} condition  Join expression.
 * @param {string} joinType  One of: `inner`, `outer`, `left_outer`, `right_outer`, `leftsemi`.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
Dataset.prototype.joinWithwithJoinType = function(other,condition,joinType) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var condition_uw = Utils.unwrapObject(condition);
//   return  this.getJavaObject().joinWith(other_uw,condition_uw,joinType);
}


/**
 * Using inner equi-join to join this [[Dataset]] returning a {@link Tuple2} for each pair
 * where `condition` evaluates to true.
 *
 * @param {Dataset} other  Right side of the join.
 * @param {Column} condition  Join expression.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
Dataset.prototype.joinWith = function(other,condition) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var condition_uw = Utils.unwrapObject(condition);
//   return  this.getJavaObject().joinWith(other_uw,condition_uw);
}


/**
 * Returns the first element in this {@link Dataset}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {object} 
 */
Dataset.prototype.first = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().first();
}


/**
 * Returns an array that contains all the elements in this {@link Dataset}.
 *
 * Running collect requires moving all the data into the application's driver process, and
 * doing so on a very large {@link Dataset} can crash the driver process with OutOfMemoryError.
 *
 * For Java API, use {@link collectAsList}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {object[]} 
 */
Dataset.prototype.collect = function() {
	var c = this.getJavaObject().collect();
	var obj = [];
	for (var i = 0; i < c.length; i++) {
		var values = c[i];
		if (!Array.isArray(values)) {
			var x = Utils.javaToJs(values); // Tuple2
			if (!Array.isArray(x)) {
				values = [x];
			} else {
				values = x;
			}
		}
		obj.push(values);
	}
	return obj;
}


/**
 * Returns an array that contains all the elements in this {@link Dataset}.
 *
 * Running collect requires moving all the data into the application's driver process, and
 * doing so on a very large {@link Dataset} can crash the driver process with OutOfMemoryError.
 *
 * For Java API, use {@link collectAsList}.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {[]} 
 */
Dataset.prototype.collectAsList = function() {
	return  this.getJavaObject().collectAsList();
}


/**
 * Returns the first `num` elements of this {@link Dataset} as an array.
 *
 * Running take requires moving data into the application's driver process, and doing so with
 * a very large `num` can crash the driver process with OutOfMemoryError.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {number}
 * @returns {object[]} 
 */
Dataset.prototype.take = function(num) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().take(num);
}


/**
 * Returns the first `num` elements of this {@link Dataset} as an array.
 *
 * Running take requires moving data into the application's driver process, and doing so with
 * a very large `num` can crash the driver process with OutOfMemoryError.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {number}
 * @returns {[]} 
 */
Dataset.prototype.takeAsList = function(num) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().takeAsList(num);
}


/**
 * Persist this {@link Dataset} with the default storage level (`MEMORY_AND_DISK`).
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {??Sing??} 
 */
Dataset.prototype.persist = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().persist();
}


/**
 * Persist this {@link Dataset} with the default storage level (`MEMORY_AND_DISK`).
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {??Sing??} 
 */
Dataset.prototype.cache = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().cache();
}


/**
 * Persist this {@link Dataset} with the given storage level.
 * @param {StorageLevel} newLevel  One of: `MEMORY_ONLY`, `MEMORY_AND_DISK`, `MEMORY_ONLY_SER`,
 *                 `MEMORY_AND_DISK_SER`, `DISK_ONLY`, `MEMORY_ONLY_2`,
 *                 `MEMORY_AND_DISK_2`, etc.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {??Sing??} 
 */
Dataset.prototype.persistwithNewLevel = function(newLevel) {
throw "not implemented by ElairJS";
//   var newLevel_uw = Utils.unwrapObject(newLevel);
//   return  this.getJavaObject().persist(newLevel_uw);
}


/**
 * Mark the {@link Dataset} as non-persistent, and remove all blocks for it from memory and disk.
 * @param {boolean} blocking  Whether to block until all blocks are deleted.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {??Sing??} 
 */
Dataset.prototype.unpersistwithBlocking = function(blocking) {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().unpersist(blocking);
}


/**
 * Mark the {@link Dataset} as non-persistent, and remove all blocks for it from memory and disk.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {??Sing??} 
 */
Dataset.prototype.unpersist = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().unpersist();
}

Dataset.prototype.toJSON = function() {

	var c = this.collect();
	var scheamJson = this.schema().toJSON();
	var jsonObj = [];
	for (var i = 0; i < c.length; i++) {
		var item = { "values": c[i], "schema": scheamJson};
		jsonObj.push(item);
	}
	return  jsonObj;
}