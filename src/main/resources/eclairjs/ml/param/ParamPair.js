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
     * A param and its value.
     * @classdesc
     * @param {module:eclairjs/ml/param.Param} param
     * @param {object} value
     *  @class
     *  @memberof module:eclairjs/ml/param
     */
    var ParamPair = function (param, value) {
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.ml.param.ParamPair) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.ml.param.ParamPair(param, value);
        }
        this.logger = Logger.getLogger("ParamPair_js");
        JavaWrapper.call(this, jvmObject);

    };

    ParamPair.prototype = Object.create(JavaWrapper.prototype);

    ParamPair.prototype.constructor = ParamPair;

    module.exports = ParamPair;

})();
