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
 * `EdgeRDD[ED, VD]` extends `RDD[Edge[ED]]` by storing the edges in columnar format on each
 * partition for performance. It may additionally store the vertex attributes associated with each
 * edge to provide the triplet view. Shipping of the vertex attributes is managed by
 * `impl.ReplicatedVertexView`.
 * @classdesc
 */

/**
 *  @class
 */
var EdgeRDD = function(jvmObject) {
	this.logger = Logger.getLogger("EdgeRDD_js");
	RDD.call(this, jvmObject);

};

EdgeRDD.prototype = Object.create(RDD.prototype);

EdgeRDD.prototype.constructor = EdgeRDD;



/**
 * @param {Partition} part
 * @param {TaskContext} context
 * @returns {Iterator} 
 */
EdgeRDD.prototype.compute = function(part,context) {
throw "not implemented by ElairJS";
//   var part_uw = Utils.unwrapObject(part);
//   var context_uw = Utils.unwrapObject(context);
//   var javaObject =  this.getJavaObject().compute(part_uw,context_uw);
//   return new Iterator(javaObject);
};


/**
 * Map the values in an edge partitioning preserving the structure but changing the values.
 *
 * @param {func} f  the function from an edge to a new edge value
 * @returns {EdgeRDD}  a new EdgeRDD containing the new edge values
 */
EdgeRDD.prototype.mapValues = function(f) {
throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().mapValues(fn);
//   return Utils.javaToJs(javaObject);
};


/**
 * Reverse all the edges in this RDD.
 *
 * @returns {EdgeRDD}  a new EdgeRDD containing all the edges reversed
 */
EdgeRDD.prototype.reverse = function() {
throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().reverse();
//   return Utils.javaToJs(javaObject);
};


/**
 * Inner joins this EdgeRDD with another EdgeRDD, assuming both are partitioned using the same
 * {@link PartitionStrategy}.
 *
 * @param {EdgeRDD} other  the EdgeRDD to join with
 * @param {func} f  the join function applied to corresponding values of `this` and `other`
 *         with values supplied by `f`
 * @returns {EdgeRDD}  a new EdgeRDD containing only edges that appear in both `this` and `other`,
 */
EdgeRDD.prototype.innerJoin = function(other,f) {
throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(f,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().innerJoin(other_uw,fn);
//   return Utils.javaToJs(javaObject);
};
//
// static methods
//


/**
 * Creates an EdgeRDD from a set of edges.
 *
 * @param {RDD} edges
 * @returns {EdgeRDDImpl} 
 */
EdgeRDD.fromEdges = function(edges) {
throw "not implemented by ElairJS";
//   var edges_uw = Utils.unwrapObject(edges);
//   var javaObject =  org.apache.spark.graphx.EdgeRDD.fromEdges(edges_uw);
//   return new EdgeRDDImpl(javaObject);
};
