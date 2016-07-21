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

    var PredictionModel = require(EclairJS_Globals.NAMESPACE + '/ml/PredictionModel');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    
    
    /**
     * @classdesc
     *
     * Model
     *
     * @class
     * @memberof module:eclairjs/ml/regression
     * @extends module:eclairjs/ml.PredictionModel
     */

    var RegressionModel = function(jvmObject) {
     	 this.logger = Logger.getLogger("RegressionModel_js");
     	 PredictionModel.call(this, jvmObject);
    
    };
    
    RegressionModel.prototype = Object.create(PredictionModel.prototype);
    
    RegressionModel.prototype.constructor = RegressionModel;
    
    
    module.exports = RegressionModel;

})();