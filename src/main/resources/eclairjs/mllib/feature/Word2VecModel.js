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
     *
     * @classdesc
     *  Word2Vec model
     * @class
     * @memberof module:eclairjs/mllib/feature
     */
    var Word2VecModel = function(jvmObject) {

         //var jvmObject = new org.apache.spark.mllib.feature.Word2VecModel(model);
         this.logger = Logger.getLogger("mllib_feature_Word2VecModel_js");
         JavaWrapper.call(this, jvmObject);

    };

    Word2VecModel.prototype = Object.create(JavaWrapper.prototype);

    Word2VecModel.prototype.constructor = Word2VecModel;



    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     */
    Word2VecModel.prototype.save = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc);
        this.getJavaObject().save(sc_uw,path);
    };


    /**
     * Transforms a word to its vector representation
     * @param {string} word  a word
     * @returns {module:eclairjs/mllib/linalg.Vector}  vector representation of word
     */
    Word2VecModel.prototype.transform = function(word) {
       var javaObject =  this.getJavaObject().transform(word);
       return Utils.javaToJs(javaObject);
    };


    /**
     * Find synonyms of a word
     * @param {string | module:eclairjs/mllib/linald.Vector} wordOrVector
     * @param {number} num  number of synonyms to find
     * @returns {module:eclairjs.Tuple[]}
     */
    Word2VecModel.prototype.findSynonyms = function(word,num) {
        var javaObject =  this.getJavaObject().findSynonyms(word,num);
        return Utils.javaToJs(javaObject);
    };


    /**
     * Returns a map of words to their vector representations.
     * @returns {object}
     */
    Word2VecModel.prototype.getVectors = function() {
       var javaObject =  this.getJavaObject().getVectors();
       return Utils.javaToJs(javaObject);
    };

    //
    // static methods
    //

    /**
     * @param {module:eclairjs.SparkContext} sc
     * @param {string} path
     * @returns {module:eclairjs/mllib/feature.Word2VecModel}
     */
    Word2VecModel.load = function(sc,path) {
       var sc_uw = Utils.unwrapObject(sc);
       var javaObject =  org.apache.spark.mllib.feature.Word2VecModel.load(sc_uw.sc(),path);
       return new Word2VecModel(javaObject);
    };

    module.exports = Word2VecModel;

})();

