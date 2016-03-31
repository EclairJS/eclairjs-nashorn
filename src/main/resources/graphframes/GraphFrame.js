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

var GraphFrame = function() {
    this.logger = Logger.getLogger("graphframes.GraphFrame_js");
    var jvmObj;
    if (arguments[0] instanceof org.graphframes.GraphFrame) {
        jvmObj = arguments[0];
    } else {
        jvmObj = new org.graphframes.GraphFrame(Utils.unwrapObject(arguments[0]), Utils.unwrapObject(arguments[1]));
    }
    JavaWrapper.call(this, jvmObj);

};

GraphFrame.prototype = Object.create(JavaWrapper.prototype);

GraphFrame.prototype.constructor = GraphFrame;

/**
 *
 * @returns {DataFrame}
 */
GraphFrame.prototype.vertices = function() {

    return new DataFrame(this.getJavaObject().vertices());

};

GraphFrame.prototype.edges = function() {

    return new DataFrame(this.getJavaObject().edges());

};

GraphFrame.prototype.toGraphX = function() {
    var x = this.getJavaObject().toGraphX();
    return Utils.javaToJs(x);

};

GraphFrame.prototype.toString = function() {
    return this.getJavaObject().toString();

};

GraphFrame.fromEdges = function(edges) {
    var x = org.graphframes.GraphFrame.fromEdges(Utils.unwrapObject(edges));
    return Utils.javaToJs(x);

};

