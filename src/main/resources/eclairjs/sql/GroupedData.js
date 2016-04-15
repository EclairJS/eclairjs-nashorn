/*
 * Copyright 2015 IBM Corp.
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

    var Column = require(EclairJS_Globals.NAMESPACE + '/sql/Column');

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdec A set of methods for aggregations on a DataFrame, created by DataFrame.groupBy.
     */
    var GroupedData = function (jvmGroupedData) {

        JavaWrapper.call(this, jvmGroupedData);

        this.logger = Logger.getLogger("sql.GroupDataed_js");
        this.logger.debug('constructor');
    }

    GroupedData.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to GroupedData
    GroupedData.prototype.constructor = GroupedData;

    /**
     * Compute aggregates by specifying a series of aggregate columns. Note that this function by default retains the grouping columns in its output.
     * To not retain grouping columns, set spark.sql.retainGroupColumns to false.
     * The available aggregate methods are defined in {@link functions}.
     * @example
     * // Java:
     * df.groupBy("department").agg(max("age"), sum("expense"));
     * @since EclairJS 0.1 Spark  1.3.0
     * @param {Column | string} columnExpr,...columnExpr or columnName, ...columnName
     * @returns {DataFrame}
     */
    GroupedData.prototype.agg = function () {
        /*
         * First convert any strings to Columns
         */

        var args = Utils.createJavaObjectArguments(arguments, Column);
        /*
         * Create a argument list we can send to Java
         */
        var str = "this.getJavaObject().agg("
        for (var i = 0; i < args.length; i++) {
            var spacer = i < 1 ? "" : ",";
            str += spacer + "args[" + i + "]";
        }
        str += ");";

        var javaObject = eval(str);
        return Utils.javaToJs(javaObject);
    };
    /**
     * Compute the avg value for each numeric columns for each group.
     * @param {string[]} cols
     * @returns {DataFrame}
     */
    GroupedData.prototype.avg = function (cols) {
        return Utils.javaToJs(this.getJavaObject().avg(cols));
    };

    GroupedData.prototype.apply = function (cols) {
        throw "not implemented by ElairJS";
    };
    /**
     * Count the number of rows for each group.
     * @returns {DataFrame}
     */
    GroupedData.prototype.count = function () {
        this.logger.debug("count");
        var jdf = this.getJavaObject().count();
        this.logger.debug("count1");
        var df = Utils.javaToJs(jdf);
        this.logger.debug("count return df");
        return df;
    };
    /**
     * Compute the max value for each numeric columns for each group.
     * @param {string[]} cols
     * @returns {DataFrame}
     */
    GroupedData.prototype.max = function (cols) {
        return Utils.javaToJs(this.getJavaObject().max(cols));
    };
    /**
     * Compute the mean value for each numeric columns for each group.
     * @param {string[]} cols
     * @returns {DataFrame}
     */
    GroupedData.prototype.mean = function (cols) {
        return Utils.javaToJs(this.getJavaObject().mean(cols));
    };
    /**
     * Compute the min value for each numeric columns for each group.
     * @param {string[]} cols
     * @returns {DataFrame}
     */
    GroupedData.prototype.min = function (cols) {
        return Utils.javaToJs(this.getJavaObject().min(cols));
    };
    /**
     * Compute the sum value for each numeric columns for each group.
     * @param {string[]} cols
     * @returns {DataFrame}
     */
    GroupedData.prototype.sum = function (cols) {
        return Utils.javaToJs(this.getJavaObject().sum(cols));
    };


    /**
     * Pivots a column of the current {@link DataFrame} and perform the specified aggregation.
     * There are two versions of pivot function: one that requires the caller to specify the list
     * of distinct values to pivot on, and one that does not. The latter is more concise but less
     * efficient, because Spark needs to first compute the list of distinct values internally.
     *
     * @example
     *   // Compute the sum of earnings for each year by course with each course as a separate column
     *   df.groupBy("year").pivot("course", new List(["dotNET", "Java"])).sum("earnings")
     *
     *   // Or without specifying column values (less efficient)
     *   df.groupBy("year").pivot("course").sum("earnings")
     *
     *
     * @param {string} pivotColumn  Name of the column to pivot.
     * @param {List} [values]  List of values that will be translated to columns in the output DataFrame.
     * @since EclairJS 0.1 Spark  1.6.0
     * @returns {GroupedData}
     */
    GroupedData.prototype.pivot = function (pivotColumn, values) {
        var javaObject;
        if (values) {
            javaObject = this.getJavaObject().pivot(pivotColumn, Utils.unwrapObject(values));
        } else {
            javaObject = this.getJavaObject().pivot(pivotColumn);
        }

        return new GroupedData(javaObject);
    };

    module.exports = GroupedData;

})();

