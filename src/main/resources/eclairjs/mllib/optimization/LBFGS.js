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
     * Class used to solve an optimization problem using Limited-memory BFGS.
     * Reference: http://en.wikipedia.org/wiki/Limited-memory_BFGS param: gradient
     * Gradient function to be used. param: updater Updater to be used to update weights after every iteration.
     * @class
     * @memberof module:eclairjs/mllib/optimization
     * @constructor
     * @param {Gradient} gradient
     * @param {Updater} updater
     */

    var LBFGS = function (gradient, updater) {
        this.logger = Logger.getLogger("LBFGS_js");
        var jvmObject;
        if (gradient instanceof org.apache.spark.mllib.optimization.LBFGS) {
            jvmObject = gradient;
        } else {
            jvmObject = new org.apache.spark.mllib.optimization.LBFGS(Utils.unwrapObject(gradient), Utils.unwrapObject(updater));
        }

        JavaWrapper.call(this, jvmObject);

    };

    LBFGS.prototype = Object.create(JavaWrapper.prototype);

    LBFGS.prototype.constructor = LBFGS;
    /**
     * Run Limited-memory BFGS (L-BFGS) in parallel. Averaging the subgradients over different partitions is performed
     * using one standard spark map-reduce in each iteration.
     * @param {RDD} data - - Input data for L-BFGS. RDD of the set of data examples, each of the form (label, [feature values]).
     * @param {Gradient} gradient - - Gradient object (used to compute the gradient of the loss function of one single data example)
     * @param {Updater} updater - - Updater function to actually perform a gradient step in a given direction.
     * @param {integer} numCorrections - - The number of corrections used in the L-BFGS update.
     * @param {float} convergenceTol - - The convergence tolerance of iterations for L-BFGS which is must be nonnegative.
     * Lower values are less tolerant and therefore generally cause more iterations to be run.
     * @param {integer} maxNumIterations - - Maximal number of iterations that L-BFGS can be run.
     * @param {float} regParam - - Regularization parameter
     * @param {Vector} initialWeights - (undocumented)
     * @returns {Tuple} A tuple containing two elements. The first element is a column matrix containing weights for every feature,
     * and the second element is an array containing the loss computed for every iteration.
     * @param testData
     */
    LBFGS.runLBFGS = function (data,gradient,updater,numCorrections,convergenceTol,maxNumIterations,regParam,initialWeights) {
        var data_uw = Utils.unwrapObject(data);
        var rdd = data_uw.rdd();
        var gradient_uw = Utils.unwrapObject(gradient);
        var updater_uw = Utils.unwrapObject(updater);
        var initialWeights_uw = Utils.unwrapObject(initialWeights);
        var javaObject = org.apache.spark.mllib.optimization.LBFGS.runLBFGS(rdd,gradient_uw,updater_uw,numCorrections,convergenceTol,maxNumIterations,regParam,initialWeights_uw);

        return Utils.javaToJs(javaObject);
    };


    /**
     * Description copied from interface: {@link Optimizer}
     * Solve the provided convex optimization problem.
     * @param {RDD} data
     * @param {Vector} initialWeights
     * @returns {Vector}
     */
    LBFGS.prototype.optimize = function (data,initialWeights) {
        var data_uw = Utils.unwrapObject(data);
        var initialWeights_uw = Utils.unwrapObject(initialWeights);
        var javaObject = this.getJavaObject().optimize(data_uw,initialWeights_uw);

        return Utils.javaToJs(javaObject);
    };

    /**
     * Set the number of corrections used in the LBFGS update. Default 10. Values of numCorrections less than 3 are not recommended;
     * large values of numCorrections will result in excessive computing time. 3 < numCorrections < 10 is recommended. Restriction: numCorrections > 0
     * @param {integer} corrections
     * @returns {LBFGS}
     */
    LBFGS.prototype.setNumCorrections = function (corrections) {
        var javaObject = this.getJavaObject().setNumCorrections(corrections);

        return new LBFGS(javaObject);
    };

    /**
     * Set the convergence tolerance of iterations for L-BFGS. Default 0.0001. Smaller value will lead to higher accuracy with the cost of more iterations.
     * This value must be nonnegative. Lower convergence values are less tolerant and therefore generally cause more iterations to be run.
     * @param {float} tolerance
     * @returns {LBFGS}
     */
    LBFGS.prototype.setConvergenceTol = function (tolerance) {
        var javaObject = this.getJavaObject().setConvergenceTol(tolerance);

        return new LBFGS(javaObject);
    };

    /**
     * Set the maximal number of iterations for L-BFGS. Default 100.
     * @param {integer} iters
     * @returns {LBFGS}
     */
    LBFGS.prototype.setNumIterations = function (iters) {
        var javaObject = this.getJavaObject().setNumIterations(iters);

        return new LBFGS(javaObject);
    };

    /**
     * Set the regularization parameter. Default 0.0.
     * @param {float} regParam
     * @returns {LBFGS}
     */
    LBFGS.prototype.setRegParam = function (regParam) {
        var javaObject = this.getJavaObject().setRegParam(regParam);

        return new LBFGS(javaObject);
    };

    /**
     * Set the gradient function (of the loss function of one single data example) to be used for L-BFGS.
     * @param {Gradient} gradient
     * @returns {LBFGS}
     */
    LBFGS.prototype.setGradient = function (gradient) {
        var javaObject = this.getJavaObject().setGradient(Utils.unwrapObject(gradient));

        return new LBFGS(javaObject);
    };

    /**
     * Set the updater function to actually perform a gradient step in a given direction.
     * The updater is responsible to perform the update from the regularization term as well,
     * and therefore determines what kind or regularization is used, if any.
     * @param {Updater} updater
     * @returns {LBFGS}
     */
    LBFGS.prototype.setUpdater = function (updater) {
        var javaObject = this.getJavaObject().setUpdater(Utils.unwrapObject(updater));

        return new LBFGS(javaObject);
    };

    module.exports = LBFGS;

})();
