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
 * A {@link Dataset} has been logically grouped by a user specified grouping key.  Users should not
 * construct a {@link GroupedDataset} directly, but should instead call `groupBy` on an existing
 * {@link Dataset}.
 *
 * COMPATIBILITY NOTE: Long term we plan to make [[GroupedDataset)]] extend `GroupedData`.  However,
 * making this change to the class hierarchy would break some function signatures. As such, this
 * class should be considered a preview of the final API.  Changes will be made to the interface
 * after Spark 1.6.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @classdesc
 */


var GroupedDataset = function(jvmObject) {
	 
	 this.logger = Logger.getLogger("GroupedDataset_js");
	 JavaWrapper.call(this, jvmObject);

};

GroupedDataset.prototype = Object.create(JavaWrapper.prototype);

GroupedDataset.prototype.constructor = GroupedDataset;



/**
 * Returns a new {@link GroupedDataset} where the type of the key has been mapped to the specified
 * type. The mapping of key columns to the type follows the same rules as `as` on {@link Dataset}.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {GroupedDataset} 
 */
GroupedDataset.prototype.keyAs = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().keyAs();
}


/**
 * Returns a {@link Dataset} that contains each unique key.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
GroupedDataset.prototype.keys = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().keys();
}


/**
 * Applies the given function to each group of data.  For each unique group, the function will
 * be passed the group key and an array that contains all of the elements in the group. The
 * function can return an array containing elements of an arbitrary type which will be returned
 * as a new {@link Dataset}.
 *
 * This function does not support partial aggregation, and as a result requires shuffling all
 * the data in the {@link Dataset}. If an application intends to perform an aggregation over each
 * key, it is best to use the reduce function or an {@link Aggregator}.
 *
 * Internally, the implementation will spill to disk if any given group is too large to fit into
 * memory.  However, users must take care to avoid materializing the whole iterator for a group
 * (for example, by calling `toList`) unless they are sure that this is possible given the memory
 * constraints of their cluster.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} func
 * @param {Encoder}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.flatMapGroups = function(func,encoder) {
	 var sv = Utils.createJavaParams(func, 2);
	    var encoder_uw = Utils.unwrapObject(encoder);
	    var fn = new org.eclairjs.nashorn.JSFlatMapGroupsFunction(sv.funcStr, sv.scopeVars);
	    var javaObject =  this.getJavaObject().flatMapGroups(fn, encoder_uw);
	    return Utils.javaToJs(javaObject); // Dataset
}


/**
 * Applies the given function to each group of data.  For each unique group, the function will
 * be passed the group key and an array that contains all of the elements in the group. The
 * function can return an element of arbitrary type which will be returned as a new {@link Dataset}.
 *
 * This function does not support partial aggregation, and as a result requires shuffling all
 * the data in the {@link Dataset}. If an application intends to perform an aggregation over each
 * key, it is best to use the reduce function or an {@link Aggregator}.
 *
 * Internally, the implementation will spill to disk if any given group is too large to fit into
 * memory.  However, users must take care to avoid materializing the whole iterator for a group
 * (for example, by calling `toList`) unless they are sure that this is possible given the memory
 * constraints of their cluster.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} func
 * @param {Encoder}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.mapGroups = function(func,encoder) {
    var sv = Utils.createJavaParams(func, 2);
    var encoder_uw = Utils.unwrapObject(encoder);
    var fn = new org.eclairjs.nashorn.JSMapGroupsFunction(sv.funcStr, sv.scopeVars);
    var javaObject =  this.getJavaObject().mapGroups(fn, encoder_uw);
    return Utils.javaToJs(javaObject); // Dataset
}


/**
 * Reduces the elements of each group of data using the specified binary function.
 * The given function must be commutative and associative or the result may be non-deterministic.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {function} func
 * @returns {Dataset} 
 */
GroupedDataset.prototype.reduce = function(func) {
   var sv = Utils.createJavaParams(func, 2);
   var fn = new org.eclairjs.nashorn.JSReduceFunction(sv.funcStr, sv.scopeVars);
   return  new Dataset(this.getJavaObject().reduce(fn));
}



/**
 * Computes the given aggregation, returning a {@link Dataset} of tuples for each unique key
 * and the result of computing this aggregation over all elements in the group.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.agg0 = function(col1) {
throw "not implemented by ElairJS";
//   var col1_uw = Utils.unwrapObject(col1);
//   return  this.getJavaObject().agg(col1_uw);
}


/**
 * Computes the given aggregations, returning a {@link Dataset} of tuples for each unique key
 * and the result of computing these aggregations over all elements in the group.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.agg1 = function(col1,col2) {
throw "not implemented by ElairJS";
//   var col1_uw = Utils.unwrapObject(col1);
//   var col2_uw = Utils.unwrapObject(col2);
//   return  this.getJavaObject().agg(col1_uw,col2_uw);
}


/**
 * Computes the given aggregations, returning a {@link Dataset} of tuples for each unique key
 * and the result of computing these aggregations over all elements in the group.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.agg2 = function(col1,col2,col3) {
throw "not implemented by ElairJS";
//   var col1_uw = Utils.unwrapObject(col1);
//   var col2_uw = Utils.unwrapObject(col2);
//   var col3_uw = Utils.unwrapObject(col3);
//   return  this.getJavaObject().agg(col1_uw,col2_uw,col3_uw);
}


/**
 * Computes the given aggregations, returning a {@link Dataset} of tuples for each unique key
 * and the result of computing these aggregations over all elements in the group.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @param {TypedColumn}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.agg3 = function(col1,col2,col3,col4) {
throw "not implemented by ElairJS";
//   var col1_uw = Utils.unwrapObject(col1);
//   var col2_uw = Utils.unwrapObject(col2);
//   var col3_uw = Utils.unwrapObject(col3);
//   var col4_uw = Utils.unwrapObject(col4);
//   return  this.getJavaObject().agg(col1_uw,col2_uw,col3_uw,col4_uw);
}


/**
 * Returns a {@link Dataset} that contains a tuple with each key and the number of items present
 * for that key.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Dataset} 
 */
GroupedDataset.prototype.count = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().count();
}


/**
 * Applies the given function to each cogrouped data.  For each unique group, the function will
 * be passed the grouping key and 2 iterators containing all elements in the group from
 * {@link Dataset} `this` and `other`.  The function can return an iterator containing elements of an
 * arbitrary type which will be returned as a new {@link Dataset}.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {GroupedDataset}
 * @param {func}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.cogroup = function(other,f) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction3(sv.funcStr, sv.scopeVars);
//   return  this.getJavaObject().cogroup(other_uw,fn);
}


/**
 * Applies the given function to each cogrouped data.  For each unique group, the function will
 * be passed the grouping key and 2 iterators containing all elements in the group from
 * {@link Dataset} `this` and `other`.  The function can return an iterator containing elements of an
 * arbitrary type which will be returned as a new {@link Dataset}.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {GroupedDataset}
 * @param {CoGroupFunction}
 * @param {Encoder}
 * @returns {Dataset} 
 */
GroupedDataset.prototype.cogroupwithEncoder = function(other,f,encoder) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var f_uw = Utils.unwrapObject(f);
//   var encoder_uw = Utils.unwrapObject(encoder);
//   return  this.getJavaObject().cogroup(other_uw,f_uw,encoder_uw);
}
