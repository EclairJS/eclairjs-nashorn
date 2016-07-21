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

    var Predictor = require(EclairJS_Globals.NAMESPACE + '/ml/Predictor');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     *
     * Single-label binary or multiclass classification.
     * Classes are indexed {0, 1, ..., numClasses - 1}.
     *
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml.Predictor
     */

    var Classifier = function(jvmObject) {
     	 this.logger = Logger.getLogger("Classifier_js");
     	 Predictor.call(this, jvmObject);
    
    };
    
    Classifier.prototype = Object.create(Predictor.prototype);
    
    Classifier.prototype.constructor = Classifier;
    
    
    
    /**
     * @param {string} value
     * @returns {module:eclairjs/ml/classification.Classifier}
     */
    Classifier.prototype.setRawPredictionCol = function(value) {
       var javaObject =  this.getJavaObject().setRawPredictionCol(value);
       return Utils.javaToJs(javaObject);
    };
    
    module.exports = Classifier;
})();