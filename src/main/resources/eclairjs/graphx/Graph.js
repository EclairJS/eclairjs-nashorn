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

(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    /**
     * The Graph abstractly represents a graph with arbitrary objects
     * associated with vertices and edges.  The graph provides basic
     * operations to access and manipulate the data associated with
     * vertices and edges as well as the underlying structure.  Like Spark
     * RDDs, the graph is a functional data-structure in which mutating
     * operations return new graphs.
     *
     * @note {@link GraphOps} contains additional convenience operations and graph algorithms.
     *
     * @classdesc
     * @class
     * @memberof module:eclairjs/graphx
     */


    var Graph = function (jvmObject) {
        this.logger = Logger.getLogger("Graph_js");
        JavaWrapper.call(this, jvmObject);

    };

    Graph.prototype = Object.create(JavaWrapper.prototype);

    Graph.prototype.constructor = Graph;


    /**
     * Caches the vertices and edges associated with this graph at the specified storage level,
     * ignoring any target storage levels previously set.
     *
     * @param {StorageLevel} newLevel  the level at which to cache the graph.
     *
     * @returns {Graph}  A reference to this graph for convenience.
     */
    Graph.prototype.persist = function (newLevel) {
        throw "not implemented by ElairJS";
//   var newLevel_uw = Utils.unwrapObject(newLevel);
//   var javaObject =  this.getJavaObject().persist(newLevel_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Caches the vertices and edges associated with this graph at the previously-specified target
     * storage levels, which default to `MEMORY_ONLY`. This is used to pin a graph in memory enabling
     * multiple queries to reuse the same construction process.
     * @returns {Graph}
     */
    Graph.prototype.cache = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().cache();
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Mark this Graph for checkpointing. It will be saved to a file inside the checkpoint
     * directory set with SparkContext.setCheckpointDir() and all references to its parent
     * RDDs will be removed. It is strongly recommended that this Graph is persisted in
     * memory, otherwise saving it on a file will require recomputation.
     */
    Graph.prototype.checkpoint = function () {
        throw "not implemented by ElairJS";
//    this.getJavaObject().checkpoint();
    };


    /**
     * Return whether this Graph has been checkpointed or not.
     * This returns true iff both the vertices RDD and edges RDD have been checkpointed.
     * @returns {boolean}
     */
    Graph.prototype.isCheckpointed = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().isCheckpointed();
    };


    /**
     * Gets the name of the files to which this Graph was checkpointed.
     * (The vertices RDD and edges RDD are checkpointed separately.)
     * @returns {string[]}
     */
    Graph.prototype.getCheckpointFiles = function () {
        throw "not implemented by ElairJS";
//   return  this.getJavaObject().getCheckpointFiles();
    };


    /**
     * Uncaches both vertices and edges of this graph. This is useful in iterative algorithms that
     * build a new graph in each iteration.
     * @param {boolean} blocking
     * @returns {Graph}
     */
    Graph.prototype.unpersist = function (blocking) {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().unpersist(blocking);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Uncaches only the vertices of this graph, leaving the edges alone. This is useful in iterative
     * algorithms that modify the vertex attributes but reuse the edges. This method can be used to
     * uncache the vertex attributes of previous iterations once they are no longer needed, improving
     * GC performance.
     * @param {boolean} blocking
     * @returns {Graph}
     */
    Graph.prototype.unpersistVertices = function (blocking) {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().unpersistVertices(blocking);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Repartitions the edges in the graph according to `partitionStrategy`.
     *
     * @param {PartitionStrategy} partitionStrategy  the partitioning strategy to use when partitioning the edges
     * in the graph.
     * @param {number} [numPartitions]  the number of edge partitions in the new graph.
     * @returns {Graph}
     */
    Graph.prototype.partitionBy = function (partitionStrategy, numPartitions) {
        throw "not implemented by ElairJS";
//   var partitionStrategy_uw = Utils.unwrapObject(partitionStrategy);
// 
//   if (arguments[1]) {
//   var javaObject =  this.getJavaObject().partitionBy(partitionStrategy_uw,numPartitions);
//   return Utils.javaToJs(javaObject);
//   } else {
//   var javaObject =  this.getJavaObject().partitionBy(partitionStrategy_uw);
//   return Utils.javaToJs(javaObject);
//   }
    };


    /**
     * Transforms each vertex attribute in the graph using the map function.
     *
     * @note The new graph has the same structure.  As a consequence the underlying index structures
     * can be reused.
     *
     * @param {func} map  the function from a vertex object to a new vertex value
     *
     *
     * @example We might use this operation to change the vertex values
     * from one type to another to initialize an algorithm.
     * @example
     * val rawGraph: Graph[(), ()] = Graph.textFile("hdfs://file")
     * val root = 42
     * var bfsGraph = rawGraph.mapVertices[Int]((vid, data) => if (vid == root) 0 else Math.MaxValue)
     *
     *
     * @returns {Graph}
     */
    Graph.prototype.mapVertices = function (map, eq) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var eq_uw = Utils.unwrapObject(eq);
//   var javaObject =  this.getJavaObject().mapVertices(fn,eq_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms each edge attribute in the graph using the map function.  The map function is not
     * passed the vertex value for the vertices adjacent to the edge.  If vertex values are desired,
     * use `mapTriplets`.
     *
     * @note This graph is not changed and that the new graph has the
     * same structure.  As a consequence the underlying index structures
     * can be reused.
     *
     * @param {func} map  the function from an edge object to a new edge value.
     *
     *
     * @example This function might be used to initialize edge
     * attributes.
     *
     * @returns {Graph}
     */
    Graph.prototype.mapEdgeswithfunc = function (map) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().mapEdges(fn);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms each edge attribute using the map function, passing it a whole partition at a
     * time. The map function is given an iterator over edges within a logical partition as well as
     * the partition's ID, and it should return a new iterator over the new values of each edge. The
     * new iterator's elements must correspond one-to-one with the old iterator's elements. If
     * adjacent vertex values are desired, use `mapTriplets`.
     *
     * @note This does not change the structure of the
     * graph or modify the values of this graph.  As a consequence
     * the underlying index structures can be reused.
     *
     * @param {func} map  a function that takes a partition id and an iterator
     * over all the edges in the partition, and must return an iterator over
     * the new values for each edge in the order of the input iterator
     *
     *
     * @returns {Graph}
     */
    Graph.prototype.mapEdgeswithfunc = function (map) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  this.getJavaObject().mapEdges(fn);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms each edge attribute using the map function, passing it the adjacent vertex
     * attributes as well. If adjacent vertex values are not required,
     * consider using `mapEdges` instead.
     *
     * @note This does not change the structure of the
     * graph or modify the values of this graph.  As a consequence
     * the underlying index structures can be reused.
     *
     * @param {func} map  the function from an edge object to a new edge value.
     *
     *
     * @example This function might be used to initialize edge
     * attributes based on the attributes associated with each vertex.
     * @example
     * val rawGraph: Graph[Int, Int] = someLoadFunction()
     * val graph = rawGraph.mapTriplets[Int]( edge =>
     *   edge.src.data - edge.dst.data)
     *
     *
     * @returns {Graph}
     */
    Graph.prototype.mapTriplets0 = function (map) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var javaObject =  this.getJavaObject().mapTriplets(fn);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms each edge attribute using the map function, passing it the adjacent vertex
     * attributes as well. If adjacent vertex values are not required,
     * consider using `mapEdges` instead.
     *
     * @note This does not change the structure of the
     * graph or modify the values of this graph.  As a consequence
     * the underlying index structures can be reused.
     *
     * @param {func} map  the function from an edge object to a new edge value.
     * @param {TripletFields} tripletFields  which fields should be included in the edge triplet passed to the map
     *   function. If not all fields are needed, specifying this can improve performance.
     *
     *
     * @example This function might be used to initialize edge
     * attributes based on the attributes associated with each vertex.
     * @example
     * val rawGraph: Graph[Int, Int] = someLoadFunction()
     * val graph = rawGraph.mapTriplets[Int]( edge =>
     *   edge.src.data - edge.dst.data)
     *
     *
     * @returns {Graph}
     */
    Graph.prototype.mapTriplets1 = function (map, tripletFields) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var tripletFields_uw = Utils.unwrapObject(tripletFields);
//   var javaObject =  this.getJavaObject().mapTriplets(fn,tripletFields_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Transforms each edge attribute a partition at a time using the map function, passing it the
     * adjacent vertex attributes as well. The map function is given an iterator over edge triplets
     * within a logical partition and should yield a new iterator over the new values of each edge in
     * the order in which they are provided.  If adjacent vertex values are not required, consider
     * using `mapEdges` instead.
     *
     * @note This does not change the structure of the
     * graph or modify the values of this graph.  As a consequence
     * the underlying index structures can be reused.
     *
     * @param {func} map  the iterator transform
     * @param {TripletFields} tripletFields  which fields should be included in the edge triplet passed to the map
     *   function. If not all fields are needed, specifying this can improve performance.
     *
     *
     * @returns {Graph}
     */
    Graph.prototype.mapTriplets2 = function (map, tripletFields) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(map,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var tripletFields_uw = Utils.unwrapObject(tripletFields);
//   var javaObject =  this.getJavaObject().mapTriplets(fn,tripletFields_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Reverses all edges in the graph.  If this graph contains an edge from a to b then the returned
     * graph contains an edge from b to a.
     * @returns {Graph}
     */
    Graph.prototype.reverse = function () {
        throw "not implemented by ElairJS";
//   var javaObject =  this.getJavaObject().reverse();
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Restricts the graph to only the vertices and edges satisfying the predicates. The resulting
     * subgraph satisifies
     *
     * @example
     * V' = {v : for all v in V where vpred(v)}
     * E' = {(u,v): for all (u,v) in E where epred((u,v)) && vpred(u) && vpred(v)}
     *
     *
     * @param {func} epred  the edge predicate, which takes a triplet and
     * evaluates to true if the edge is to remain in the subgraph.  Note
     * that only edges where both vertices satisfy the vertex
     * predicate are considered.
     *
     * @param {func} vpred  the vertex predicate, which takes a vertex object and
     * evaluates to true if the vertex is to be included in the subgraph
     *
     * satisfy the predicates
     * @returns {Graph}  the subgraph containing only the vertices and edges that
     */
    Graph.prototype.subgraph = function (epred, vpred) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(epred,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var bindArgs;
//  var fn2 = Utils.createLambdaFunction(vpred,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  this.getJavaObject().subgraph(fn,fn2);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Restricts the graph to only the vertices and edges that are also in `other`, but keeps the
     * attributes from this graph.
     * @param {Graph} other  the graph to project this graph onto
     * with vertex and edge data from the current graph
     * @returns {Graph}  a graph with vertices and edges that exist in both the current graph and `other`,
     */
    Graph.prototype.mask = function (other) {
        throw "not implemented by ElairJS";
//   var other_uw = Utils.unwrapObject(other);
//   var javaObject =  this.getJavaObject().mask(other_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Merges multiple edges between two vertices into a single edge. For correct results, the graph
     * must have been partitioned using {@link partitionBy}.
     *
     * @param {func} merge  the user-supplied commutative associative function to merge edge attributes
     *              for duplicate edges.
     *
     * @returns {Graph}  The resulting graph with a single edge for each (source, dest) vertex pair.
     */
    Graph.prototype.groupEdges = function (merge) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(merge,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var javaObject =  this.getJavaObject().groupEdges(fn);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Aggregates values from the neighboring edges and vertices of each vertex.  The user supplied
     * `mapFunc` function is invoked on each edge of the graph, generating 0 or more "messages" to be
     * "sent" to either vertex in the edge.  The `reduceFunc` is then used to combine the output of
     * the map phase destined to each vertex.
     *
     * This function is deprecated in 1.2.0 because of SPARK-3936. Use aggregateMessages instead.
     *
     *
     * @param {func} mapFunc  the user defined map function which returns 0 or
     * more messages to neighboring vertices
     *
     * @param {func} reduceFunc  the user defined reduce function which should
     * be commutative and associative and is used to combine the output
     * of the map phase
     *
     * @param {Tuple2} activeSetOpt  an efficient way to run the aggregation on a subset of the edges if
     * desired. This is done by specifying a set of "active" vertices and an edge direction. The
     * `sendMsg` function will then run only on edges connected to active vertices by edges in the
     * specified direction. If the direction is `In`, `sendMsg` will only be run on edges with
     * destination in the active set. If the direction is `Out`, `sendMsg` will only be run on edges
     * originating from vertices in the active set. If the direction is `Either`, `sendMsg` will be
     * run on edges with *either* vertex in the active set. If the direction is `Both`, `sendMsg`
     * will be run on edges with *both* vertices in the active set. The active set must have the
     * same index as the graph's vertices.
     *
     * @example We can use this function to compute the in-degree of each
     * vertex
     * @example
     * val rawGraph: Graph[(),()] = Graph.textFile("twittergraph")
     * val inDeg: RDD[(VertexId, Int)] =
     *   mapReduceTriplets[Int](et => Iterator((et.dst.id, 1)), _ + _)
     *
     *
     * @note By expressing computation at the edge level we achieve
     * maximum parallelism.  This is one of the core functions in the
     * Graph API in that enables neighborhood level computation. For
     * example this function can be used to count neighbors satisfying a
     * predicate or implement PageRank.
     *
     * @returns {VertexRDD}
     */
    Graph.prototype.mapReduceTriplets = function (mapFunc, reduceFunc, activeSetOpt) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(mapFunc,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var bindArgs;
//  var fn2 = Utils.createLambdaFunction(reduceFunc,org.eclairjs.nashorn.JSFunction2, bindArgs);
// // TODO: handle Tuple conversion for 'activeSetOpt'
//   var activeSetOpt_uw = Utils.unwrapObject(activeSetOpt);
//   var javaObject =  this.getJavaObject().mapReduceTriplets(fn,fn2,activeSetOpt_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Aggregates values from the neighboring edges and vertices of each vertex. The user-supplied
     * `sendMsg` function is invoked on each edge of the graph, generating 0 or more messages to be
     * sent to either vertex in the edge. The `mergeMsg` function is then used to combine all messages
     * destined to the same vertex.
     *
     *
     * @param {func} sendMsg  runs on each edge, sending messages to neighboring vertices using the
     *   {@link EdgeContext}.
     * @param {func} mergeMsg  used to combine messages from `sendMsg` destined to the same vertex. This
     *   combiner should be commutative and associative.
     * @param {TripletFields} tripletFields  which fields should be included in the {@link EdgeContext} passed to the
     *   `sendMsg` function. If not all fields are needed, specifying this can improve performance.
     *
     * @example We can use this function to compute the in-degree of each
     * vertex
     * @example
     * val rawGraph: Graph[_, _] = Graph.textFile("twittergraph")
     * val inDeg: RDD[(VertexId, Int)] =
     *   rawGraph.aggregateMessages[Int](ctx => ctx.sendToDst(1), _ + _)
     *
     *
     * @note By expressing computation at the edge level we achieve
     * maximum parallelism.  This is one of the core functions in the
     * Graph API in that enables neighborhood level computation. For
     * example this function can be used to count neighbors satisfying a
     * predicate or implement PageRank.
     *
     * @returns {VertexRDD}
     */
    Graph.prototype.aggregateMessages = function (sendMsg, mergeMsg, tripletFields) {
        throw "not implemented by ElairJS";
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(sendMsg,org.eclairjs.nashorn.JSFunction, bindArgs);
//   var bindArgs;
//  var fn2 = Utils.createLambdaFunction(mergeMsg,org.eclairjs.nashorn.JSFunction2, bindArgs);
//   var tripletFields_uw = Utils.unwrapObject(tripletFields);
//   var javaObject =  this.getJavaObject().aggregateMessages(fn,fn2,tripletFields_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Joins the vertices with entries in the `table` RDD and merges the results using `mapFunc`.
     * The input table should contain at most one entry for each vertex.  If no entry in `other` is
     * provided for a particular vertex in the graph, the map function receives `None`.
     *
     *
     * @param {RDD} other  the table to join with the vertices in the graph.
     *              The table should contain at most one entry for each vertex.
     * @param {func} mapFunc  the function used to compute the new vertex values.
     *                The map function is invoked for all vertices, even those
     *                that do not have a corresponding entry in the table.
     *
     * @example This function is used to update the vertices with new values based on external data.
     *          For example we could add the out-degree to each vertex record:
     *
     * @example
     * val rawGraph: Graph[_, _] = Graph.textFile("webgraph")
     * val outDeg: RDD[(VertexId, Int)] = rawGraph.outDegrees
     * val graph = rawGraph.outerJoinVertices(outDeg) {
 *   (vid, data, optDeg) => optDeg.getOrElse(0)
 * }
     *
     * @returns {Graph}
     */
    Graph.prototype.outerJoinVertices = function (other, mapFunc, eq) {
        throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'other'
//   var other_uw = Utils.unwrapObject(other);
//   var bindArgs;
//  var fn = Utils.createLambdaFunction(mapFunc,org.eclairjs.nashorn.JSFunction3, bindArgs);
//   var eq_uw = Utils.unwrapObject(eq);
//   var javaObject =  this.getJavaObject().outerJoinVertices(other_uw,fn,eq_uw);
//   return Utils.javaToJs(javaObject);
    };
//
// static methods
//


    /**
     * Construct a graph from a collection of edges encoded as vertex id pairs.
     *
     * @param {RDD} rawEdges  a collection of edges in (src, dst) form
     * @param {VD} defaultValue  the vertex attributes with which to create vertices referenced by the edges
     * @param {PartitionStrategy} uniqueEdges  if multiple identical edges are found they are combined and the edge
     * attribute is set to the sum.  Otherwise duplicate edges are treated as separate. To enable
     * `uniqueEdges`, a {@link PartitionStrategy} must be provided.
     * @param {StorageLevel} edgeStorageLevel  the desired storage level at which to cache the edges if necessary
     * @param {StorageLevel} vertexStorageLevel  the desired storage level at which to cache the vertices if necessary
     *
     * (if `uniqueEdges` is `None`) and vertex attributes containing the total degree of each vertex.
     * @returns {Graph}  a graph with edge attributes containing either the count of duplicate edges or 1
     */
    Graph.fromEdgeTuples = function (rawEdges, defaultValue, uniqueEdges, edgeStorageLevel, vertexStorageLevel) {
        throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'rawEdges'
//   var rawEdges_uw = Utils.unwrapObject(rawEdges);
//   var defaultValue_uw = Utils.unwrapObject(defaultValue);
//   var uniqueEdges_uw = Utils.unwrapObject(uniqueEdges);
//   var edgeStorageLevel_uw = Utils.unwrapObject(edgeStorageLevel);
//   var vertexStorageLevel_uw = Utils.unwrapObject(vertexStorageLevel);
//   var javaObject =  org.apache.spark.graphx.Graph.fromEdgeTuples(rawEdges_uw,defaultValue_uw,uniqueEdges_uw,edgeStorageLevel_uw,vertexStorageLevel_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Construct a graph from a collection of edges.
     *
     * @param {RDD} edges  the RDD containing the set of edges in the graph
     * @param {VD} defaultValue  the default vertex attribute to use for each vertex
     * @param {StorageLevel} edgeStorageLevel  the desired storage level at which to cache the edges if necessary
     * @param {StorageLevel} vertexStorageLevel  the desired storage level at which to cache the vertices if necessary
     *
     *         given by all vertices in `edges` with value `defaultValue`
     * @returns {Graph}  a graph with edge attributes described by `edges` and vertices
     */
    Graph.fromEdges = function (edges, defaultValue, edgeStorageLevel, vertexStorageLevel) {
        throw "not implemented by ElairJS";
//   var edges_uw = Utils.unwrapObject(edges);
//   var defaultValue_uw = Utils.unwrapObject(defaultValue);
//   var edgeStorageLevel_uw = Utils.unwrapObject(edgeStorageLevel);
//   var vertexStorageLevel_uw = Utils.unwrapObject(vertexStorageLevel);
//   var javaObject =  org.apache.spark.graphx.Graph.fromEdges(edges_uw,defaultValue_uw,edgeStorageLevel_uw,vertexStorageLevel_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Construct a graph from a collection of vertices and
     * edges with attributes.  Duplicate vertices are picked arbitrarily and
     * vertices found in the edge collection but not in the input
     * vertices are assigned the default attribute.
     *
     * @param {RDD} vertices  the "set" of vertices and their attributes
     * @param {RDD} edges  the collection of edges in the graph
     * @param {VD} defaultVertexAttr  the default vertex attribute to use for vertices that are
     *                          mentioned in edges but not in vertices
     * @param {StorageLevel} edgeStorageLevel  the desired storage level at which to cache the edges if necessary
     * @param {StorageLevel} vertexStorageLevel  the desired storage level at which to cache the vertices if necessary
     * @returns {Graph}
     */
    Graph.apply = function (vertices, edges, defaultVertexAttr, edgeStorageLevel, vertexStorageLevel) {
        throw "not implemented by ElairJS";
// // TODO: handle Tuple conversion for 'vertices'
//   var vertices_uw = Utils.unwrapObject(vertices);
//   var edges_uw = Utils.unwrapObject(edges);
//   var defaultVertexAttr_uw = Utils.unwrapObject(defaultVertexAttr);
//   var edgeStorageLevel_uw = Utils.unwrapObject(edgeStorageLevel);
//   var vertexStorageLevel_uw = Utils.unwrapObject(vertexStorageLevel);
//   var javaObject =  org.apache.spark.graphx.Graph.apply(vertices_uw,edges_uw,defaultVertexAttr_uw,edgeStorageLevel_uw,vertexStorageLevel_uw);
//   return Utils.javaToJs(javaObject);
    };


    /**
     * Implicitly extracts the {@link GraphOps} member from a graph.
     *
     * To improve modularity the Graph type only contains a small set of basic operations.
     * All the convenience operations are defined in the {@link GraphOps} class which may be
     * shared across multiple graph implementations.
     * @param {Graph} g
     * @returns {GraphOps}
     */
    Graph.graphToGraphOps = function (g) {
        throw "not implemented by ElairJS";
//   var g_uw = Utils.unwrapObject(g);
//   var javaObject =  org.apache.spark.graphx.Graph.graphToGraphOps(g_uw);
//   return new GraphOps(javaObject);
    };

    /**
     * An RDD containing the vertices and their associated attributes.
     * @returns {VertexRDD}
     */
    Graph.prototype.vertices = function () {
        return Utils.javaToJs(this.getJavaObject().vertices());
    };

    /**
     * An RDD containing the edges and their associated attributes.
     * @returns {VertexRDD}
     */
    Graph.prototype.edges = function () {
        return Utils.javaToJs(this.getJavaObject().edges());
    };

    module.exports = Graph;


})();