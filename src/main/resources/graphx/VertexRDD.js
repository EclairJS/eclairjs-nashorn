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



/**
 * Extends `RDD[(VertexId, VD)]` by ensuring that there is only one entry for each vertex and by
 * pre-indexing the entries for fast, efficient joins. Two VertexRDDs with the same index can be
 * joined efficiently. All operations except {@link reindex} preserve the index. To construct a
 * `VertexRDD`, use the [[org.apache.spark.graphx.VertexRDD$ VertexRDD object]].
 *
 * Additionally, stores routing information to enable joining the vertex attributes with an
 * {@link EdgeRDD}.
 *
 * @example Construct a `VertexRDD` from a plain RDD:
 * @example 
 * // Construct an initial vertex set
 * val someData: RDD[(VertexId, SomeType)] = loadData(someFile)
 * val vset = VertexRDD(someData)
 * // If there were redundant values in someData we would use a reduceFunc
 * val vset2 = VertexRDD(someData, reduceFunc)
 * // Finally we can use the VertexRDD to index another dataset
 * val otherData: RDD[(VertexId, OtherType)] = loadData(otherFile)
 * val vset3 = vset2.innerJoin(otherData) { (vid, a, b) => b }
 * // Now we can construct very fast joins between the two sets
 * val vset4: VertexRDD[(SomeType, OtherType)] = vset.leftJoin(vset3)
 *  
 *
 * @classdesc
 */

/**
 *  @class
 */
var VertexRDD = function(jvmObject) {
	 this.logger = Logger.getLogger("VertexRDD_js");
	RDD.call(this, jvmObject);

};

VertexRDD.prototype = Object.create(RDD.prototype);

VertexRDD.prototype.constructor = VertexRDD;



/**
 * Provides the `RDD[(VertexId, VD)]` equivalent output.
 * @param {Partition} part
 * @param {TaskContext} context
 * @returns {Iterator} 
 */
VertexRDD.prototype.compute = function(part,context) {
throw "not implemented by ElairJS";
//   var part_uw = Utils.unwrapObject(part);
//   var context_uw = Utils.unwrapObject(context);
//   var javaObject =  this.getJavaObject().compute(part_uw,context_uw);
//   return new Iterator(javaObject);
};


/**
 * Construct a new VertexRDD that is indexed by only the visible vertices. The resulting
 * VertexRDD will be based on a different index and can no longer be quickly joined with this
 * RDD.
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.reindex = function() {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().reindex();
//   return Utils.javaToJs(javaObject);
};


/**
 * Restricts the vertex set to the set of vertices satisfying the given predicate. This operation
 * preserves the index for efficient joins with the original RDD, and it sets bits in the bitmask
 * rather than allocating new memory.
 *
 * It is declared and defined here to allow refining the return type from `RDD[(VertexId, VD)]` to
 * `VertexRDD[VD]`.
 *
 * @param {func} pred  the user defined predicate, which takes a tuple to conform to the
 * `RDD[(VertexId, VD)]` interface
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.filter = function(pred) {
throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(pred,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().filter(fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Maps each vertex attribute, preserving the index.
 *
 *
 * @param {func} f  the function applied to each value in the RDD
 * original VertexRDD
 * @returns {VertexRDD}  a new VertexRDD with values obtained by applying `f` to each of the entries in the
 */
VertexRDD.prototype.mapValueswithfunc = function(f) {
throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().mapValues(fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Maps each vertex attribute, additionally supplying the vertex ID.
 *
 *
 * @param {func} f  the function applied to each ID-value pair in the RDD
 * original VertexRDD.  The resulting VertexRDD retains the same index.
 * @returns {VertexRDD}  a new VertexRDD with values obtained by applying `f` to each of the entries in the
 */
VertexRDD.prototype.mapValueswithfunc = function(f) {
throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  this.getJavaObject().mapValues(fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * For each VertexId present in both `this` and `other`, minus will act as a set difference
 * operation returning only those unique VertexId's present in `this`.
 *
 * @param {RDD} other  an RDD to run the set operation against
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.minuswithRDD = function(other) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'other'
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().minus(other_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * For each VertexId present in both `this` and `other`, minus will act as a set difference
 * operation returning only those unique VertexId's present in `this`.
 *
 * @param {VertexRDD} other  a VertexRDD to run the set operation against
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.minuswithVertexRDD = function(other) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().minus(other_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * For each vertex present in both `this` and `other`, `diff` returns only those vertices with
 * differing values; for values that are different, keeps the values from `other`. This is
 * only guaranteed to work if the VertexRDDs share a common ancestor.
 *
 * @param {RDD} other  the other RDD[(VertexId, VD)] with which to diff against.
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.diffwithRDD = function(other) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'other'
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().diff(other_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * For each vertex present in both `this` and `other`, `diff` returns only those vertices with
 * differing values; for values that are different, keeps the values from `other`. This is
 * only guaranteed to work if the VertexRDDs share a common ancestor.
 *
 * @param {VertexRDD} other  the other VertexRDD with which to diff against.
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.diffwithVertexRDD = function(other) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().diff(other_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Left joins this RDD with another VertexRDD with the same index. This function will fail if
 * both VertexRDDs do not share the same index. The resulting vertex set contains an entry for
 * each vertex in `this`.
 * If `other` is missing any vertex in this VertexRDD, `f` is passed `None`.
 *
 *
 * @param {VertexRDD} other  the other VertexRDD with which to join.
 * @param {func} f  the function mapping a vertex id and its attributes in this and the other vertex set
 * to a new vertex attribute.
 * @returns {VertexRDD}  a VertexRDD containing the results of `f`
 */
VertexRDD.prototype.leftZipJoin = function(other,f) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction3, bindArgs);
//   var javaObject =  this.getJavaObject().leftZipJoin(other_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Left joins this VertexRDD with an RDD containing vertex attribute pairs. If the other RDD is
 * backed by a VertexRDD with the same index then the efficient {@link leftZipJoin} implementation is
 * used. The resulting VertexRDD contains an entry for each vertex in `this`. If `other` is
 * missing any vertex in this VertexRDD, `f` is passed `None`. If there are duplicates,
 * the vertex is picked arbitrarily.
 *
 *
 * @param {RDD} other  the other VertexRDD with which to join
 * @param {func} f  the function mapping a vertex id and its attributes in this and the other vertex set
 * to a new vertex attribute.
 * by `f`.
 * @returns {VertexRDD}  a VertexRDD containing all the vertices in this VertexRDD with the attributes emitted
 */
VertexRDD.prototype.leftJoin = function(other,f) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'other'
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction3, bindArgs);
//   var javaObject =  this.getJavaObject().leftJoin(other_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Efficiently inner joins this VertexRDD with another VertexRDD sharing the same index. See
 * {@link innerJoin} for the behavior of the join.
 * @param {VertexRDD} other
 * @param {func} f
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.innerZipJoin = function(other,f) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction3, bindArgs);
//   var javaObject =  this.getJavaObject().innerZipJoin(other_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Inner joins this VertexRDD with an RDD containing vertex attribute pairs. If the other RDD is
 * backed by a VertexRDD with the same index then the efficient {@link innerZipJoin} implementation
 * is used.
 *
 * @param {RDD} other  an RDD containing vertices to join. If there are multiple entries for the same
 * vertex, one is picked arbitrarily. Use {@link aggregateUsingIndex} to merge multiple entries.
 * @param {func} f  the join function applied to corresponding values of `this` and `other`
 *         `this` and `other`, with values supplied by `f`
 * @returns {VertexRDD}  a VertexRDD co-indexed with `this`, containing only vertices that appear in both
 */
VertexRDD.prototype.innerJoin = function(other,f) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'other'
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction3, bindArgs);
//   var javaObject =  this.getJavaObject().innerJoin(other_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Aggregates vertices in `messages` that have the same ids using `reduceFunc`, returning a
 * VertexRDD co-indexed with `this`.
 *
 * @param {RDD} messages  an RDD containing messages to aggregate, where each message is a pair of its
 * target vertex ID and the message data
 * @param {func} reduceFunc  the associative aggregation function for merging messages to the same vertex
 * For those vertices, their values are the result of applying `reduceFunc` to all received
 * messages.
 * @returns {VertexRDD}  a VertexRDD co-indexed with `this`, containing only vertices that received messages.
 */
VertexRDD.prototype.aggregateUsingIndex = function(messages,reduceFunc) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'messages'
//   var messages_uw = Utils.unwrapObject(messages);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(reduceFunc,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  this.getJavaObject().aggregateUsingIndex(messages_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Returns a new `VertexRDD` reflecting a reversal of all edge directions in the corresponding
 * {@link EdgeRDD}.
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.reverseRoutingTables = function() {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().reverseRoutingTables();
//   return Utils.javaToJs(javaObject);
};


/**
 * @param {EdgeRDD} edges
 * @returns {VertexRDD} 
 */
VertexRDD.prototype.withEdges = function(edges) {
throw "not implemented by ElairJS";
//   var edges_uw = Utils.unwrapObject(edges);
//   var javaObject =  this.getJavaObject().withEdges(edges_uw);
//   return Utils.javaToJs(javaObject);
};


//
// static methods
//


/**
 * Constructs a standalone `VertexRDD` (one that is not set up for efficient joins with an
 * {@link EdgeRDD}) from an RDD of vertex-attribute pairs. Duplicate entries are removed arbitrarily.
 *
 *
 * @param {RDD} vertices  the collection of vertex-attribute pairs
 * @returns {VertexRDD} 
 */
VertexRDD.apply0 = function(vertices) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'vertices'
//   var vertices_uw = Utils.unwrapObject(vertices);
//   var javaObject =  org.apache.spark.graphx.VertexRDD.apply(vertices_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Constructs a `VertexRDD` from an RDD of vertex-attribute pairs. Duplicate vertex entries are
 * removed arbitrarily. The resulting `VertexRDD` will be joinable with `edges`, and any missing
 * vertices referred to by `edges` will be created with the attribute `defaultVal`.
 *
 *
 * @param {RDD} vertices  the collection of vertex-attribute pairs
 * @param {EdgeRDD} edges  the {@link EdgeRDD} that these vertices may be joined with
 * @param {VD} defaultVal  the vertex attribute to use when creating missing vertices
 * @returns {VertexRDD} 
 */
VertexRDD.apply1 = function(vertices,edges,defaultVal) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'vertices'
//   var vertices_uw = Utils.unwrapObject(vertices);
//   var edges_uw = Utils.unwrapObject(edges);
//   var defaultVal_uw = Utils.unwrapObject(defaultVal);
//   var javaObject =  org.apache.spark.graphx.VertexRDD.apply(vertices_uw,edges_uw,defaultVal_uw);
//   return Utils.javaToJs(javaObject);
};


/**
 * Constructs a `VertexRDD` from an RDD of vertex-attribute pairs. Duplicate vertex entries are
 * merged using `mergeFunc`. The resulting `VertexRDD` will be joinable with `edges`, and any
 * missing vertices referred to by `edges` will be created with the attribute `defaultVal`.
 *
 *
 * @param {RDD} vertices  the collection of vertex-attribute pairs
 * @param {EdgeRDD} edges  the {@link EdgeRDD} that these vertices may be joined with
 * @param {VD} defaultVal  the vertex attribute to use when creating missing vertices
 * @param {func} mergeFunc  the commutative, associative duplicate vertex attribute merge function
 * @returns {VertexRDD} 
 */
VertexRDD.apply2 = function(vertices,edges,defaultVal,mergeFunc) {
throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'vertices'
//   var vertices_uw = Utils.unwrapObject(vertices);
//   var edges_uw = Utils.unwrapObject(edges);
//   var defaultVal_uw = Utils.unwrapObject(defaultVal);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(mergeFunc,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  org.apache.spark.graphx.VertexRDD.apply(vertices_uw,edges_uw,defaultVal_uw,fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Constructs a `VertexRDD` containing all vertices referred to in `edges`. The vertices will be
 * created with the attribute `defaultVal`. The resulting `VertexRDD` will be joinable with
 * `edges`.
 *
 *
 * @param {EdgeRDD} edges  the {@link EdgeRDD} referring to the vertices to create
 * @param {number} numPartitions  the desired number of partitions for the resulting `VertexRDD`
 * @param {VD} defaultVal  the vertex attribute to use when creating missing vertices
 * @returns {VertexRDD} 
 */
VertexRDD.fromEdges = function(edges,numPartitions,defaultVal) {
throw "not implemented by ElairJS";
//   var edges_uw = Utils.unwrapObject(edges);
//   var defaultVal_uw = Utils.unwrapObject(defaultVal);
//   var javaObject =  org.apache.spark.graphx.VertexRDD.fromEdges(edges_uw,numPartitions,defaultVal_uw);
//   return Utils.javaToJs(javaObject);
};

