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
 * A single directed edge consisting of a source id, target id,
 * and the data associated with the edge.
 *
 *
 * @param srcId The vertex id of the source vertex
 * @param dstId The vertex id of the target vertex
 * @param attr The attribute associated with the edge
 * @classdesc
 */

/**
 * @param {VertexId} srcId
 * @param {VertexId} dstId
 * @param {ED} attr
 *  @class
 */
var Edge = function(srcId,dstId,attr) {
	this.logger = Logger.getLogger("Edge_js");
	var jvmObject;
	if (arguments[0] instanceof org.apache.spark.graphx.Edge) {
		jvmObject = arguments[0];
	} else {
		jvmObject  = new org.apache.spark.graphx.Edge(arguments[0],arguments[1],Utils.unwrapObject(arguments[2]));
	}

	 JavaWrapper.call(this, jvmObject);

};

Edge.prototype = Object.create(JavaWrapper.prototype);

Edge.prototype.constructor = Edge;

/**
 * @returns {integer}
 */
Edge.prototype.srcId = function() {
	return this.getJavaObject().srcId();
};

/**
 * @returns {integer}
 */
Edge.prototype.dstId = function() {
	return this.getJavaObject().dstId();
};
/**
 * @returns {ED}
 */
Edge.prototype.attr = function() {
	return Utils.javaToJs(this.getJavaObject().attr());
};

/**
 * Given one vertex in the edge return the other vertex.
 *
 * @param {integer} vid  the id one of the two vertices on the edge.
 * @returns {integer}  the id of the other vertex on the edge.
 */
Edge.prototype.otherVertexId = function(vid) {
   var vid_uw = Utils.unwrapObject(vid);
   var javaObject =  this.getJavaObject().otherVertexId(vid_uw);
   return new VertexId(javaObject);
};


/**
 * Return the relative direction of the edge to the corresponding
 * vertex.
 *
 * @param {VertexId} vid  the id of one of the two vertices in the edge.
 * vertex.
 * @returns {EdgeDirection}  the relative direction of the edge to the corresponding
 */
Edge.prototype.relativeDirection = function(vid) {
throw "not implemented by ElairJS";
//   var vid_uw = Utils.unwrapObject(vid);
//   var javaObject =  this.getJavaObject().relativeDirection(vid_uw);
//   return new EdgeDirection(javaObject);
};
