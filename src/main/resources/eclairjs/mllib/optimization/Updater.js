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
     * Class used to perform steps (weight update) using Gradient Descent methods.
     * For general minimization problems, or for regularized problems of the form min L(w) + regParam * R(w),
     * the compute function performs the actual update step, when given some (e.g. stochastic) gradient direction
     * for the loss L(w), and a desired step-size (learning rate).The updater is responsible to also perform the
     * update coming from the regularization term R(w) (if any regularization is used).
     * @class
     * @memberof module:eclairjs/mllib/optimization
     * @constructor
     */
    var Updater = function () {
        this.logger = Logger.getLogger("Updater_js");
        var jvmObject;
        if (arguments[0] instanceof org.apache.spark.mllib.optimization.Updater) {
            jvmObject = arguments[0];
        } else {
            jvmObject = new org.apache.spark.mllib.optimization.Updater();
        }

        JavaWrapper.call(this, jvmObject);

    };

    Updater.prototype = Object.create(JavaWrapper.prototype);

    Updater.prototype.constructor = Updater;

    /**
     * Compute an updated value for weights given the gradient, stepSize, iteration number and regularization parameter.
     * Also returns the regularization value regParam * R(w) computed using the *updated* weights.
     * @abstract
     * @param {Vector} weightsOld - - Column matrix of size dx1 where d is the number of features.
     * @param {Vector} gradient - - Column matrix of size dx1 where d is the number of features.
     * @param {float} stepSize - - step size across iterations
     * @param {integer} iter - - Iteration number
     * @param {float} regParam - - Regularization parameter
     * @returns {Tuple} A tuple of 2 elements. The first element is a column matrix containing updated weights,
     * and the second element is the regularization value computed using updated weights.
     */
    Updater.prototype.compute = function (weightsOld,gradient,stepSize,iter,regParam) {
        var weightsOld_uw = Utils.unwrapObject(weightsOld);
        var gradient_uw = Utils.unwrapObject(gradient);
        var javaObject = this.getJavaObject().compute(weightsOld_uw,gradient_uw,stepSize,iter,regParam);
        var Tuple = require('eclairjs/Tuple');
        return new Tuple(javaObject);
    };

    module.exports = Updater;

})();
