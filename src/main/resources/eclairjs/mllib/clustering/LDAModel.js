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
     * Latent Dirichlet Allocation (LDA) model.
     *
     * This abstraction permits for different underlying representations,
     * including local and distributed data structures.
     * @memberof module:eclairjs/mllib/clustering
     * @classdesc
     * @abstract
     * @class
     */


    var LDAModel = function (jvmObject) {

        this.logger = Logger.getLogger("LDAModel_js");
        JavaWrapper.call(this, jvmObject);

    };

    LDAModel.prototype = Object.create(JavaWrapper.prototype);

    LDAModel.prototype.constructor = LDAModel;


    /**
     * @returns {number}
     */
    LDAModel.prototype.k = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().k();
    };


    /**
     * @returns {number}
     */
    LDAModel.prototype.vocabSize = function () {
       return  this.getJavaObject().vocabSize();
    };


    /**
     * Concentration parameter (commonly named "alpha") for the prior placed on documents'
     * distributions over topics ("theta").
     *
     * This is the parameter to a Dirichlet distribution.
     * @returns {Vector}
     */
    LDAModel.prototype.docConcentration = function () {
        throw "not implemented by ElairJS";
    //   var javaObject =  this.getJavaObject().docConcentration();
    //   return Utils.javaToJs(javaObject);
    };


    /**
     * Concentration parameter (commonly named "beta" or "eta") for the prior placed on topics'
     * distributions over terms.
     *
     * This is the parameter to a symmetric Dirichlet distribution.
     *
     * Note: The topics' distributions over terms are called "beta" in the original LDA paper
     * by Blei et al., but are called "phi" in many later papers such as Asuncion et al., 2009.
     * @returns {number}
     */
    LDAModel.prototype.topicConcentration = function () {
        throw "not implemented by ElairJS";
    //   return  this.getJavaObject().topicConcentration();
    };


    /**
     * Inferred topics, where each topic is represented by a distribution over terms.
     * This is a matrix of size vocabSize x k, where each column is a topic.
     * No guarantees are given about the ordering of the topics.
     * @returns {Matrix}
     */
    LDAModel.prototype.topicsMatrix = function () {
       var javaObject =  this.getJavaObject().topicsMatrix();
       return Utils.javaToJs(javaObject);
    };


    /**
     * Return the topics described by weighted terms.
     *
     * @param {number} [maxTermsPerTopic]   Maximum number of terms to collect for each topic.
     *          (term indices, term weights in topic).
     *          Each topic's terms are sorted in order of decreasing weight.
     * @returns {Tuple2[]}   Array over topics.  Each topic is represented as a pair of matching arrays:
     */
    LDAModel.prototype.describeTopics = function (maxTermsPerTopic) {
        throw "not implemented by ElairJS";
    // 
    //   if (arguments[0]) {
    //   var javaObject =  this.getJavaObject().describeTopics(maxTermsPerTopic);
    //   return Utils.javaToJs(javaObject);
    //   } else {
    //   var javaObject =  this.getJavaObject().describeTopics();
    //   return Utils.javaToJs(javaObject);
    //   }
    };

    module.exports = LDAModel;

})();
