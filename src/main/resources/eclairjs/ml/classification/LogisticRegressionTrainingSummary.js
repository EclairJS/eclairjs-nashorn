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

    var LogisticRegressionSummary = require(EclairJS_Globals.NAMESPACE + '/ml/classification/LogisticRegressionSummary');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     * Abstraction for multinomial Logistic Regression Training results.
     * Currently, the training summary ignores the training weights except
     * for the objective trace.
     * @class
     * @memberof module:eclairjs/ml/classification
     * @extends module:eclairjs/ml/classification.LogisticRegressionSummary
     */
    
    
    var LogisticRegressionTrainingSummary = function(jvmObject) {
     	 this.logger = Logger.getLogger("LogisticRegressionTrainingSummary_js");
     	 LogisticRegressionSummary.call(this, jvmObject);
    
    };
    
    LogisticRegressionTrainingSummary.prototype = Object.create(LogisticRegressionSummary.prototype);
    
    LogisticRegressionTrainingSummary.prototype.constructor = LogisticRegressionTrainingSummary;
    

    
    
    /**
     *  objective function (scaled loss + regularization) at each iteration. 
     * @returns {float[]}
     */
    LogisticRegressionTrainingSummary.prototype.objectiveHistory = function() {
       return  Utils.javaToJs(this.getJavaObject().objectiveHistory());
    };
    
    
    /**
     *  Number of training iterations until termination 
     * @returns {integer}
     */
    LogisticRegressionTrainingSummary.prototype.totalIterations = function() {
       return  this.getJavaObject().totalIterations();
    };
    
    module.exports = LogisticRegressionTrainingSummary;
})();