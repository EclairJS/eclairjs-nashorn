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

    var NumericType = require(EclairJS_Globals.NAMESPACE + '/sql/types/NumericType');

    /**
     * @constructor
     * @extends module:eclairjs/sql/types.NumericType
     * @classdesc The data type representing Long values. Please use the singleton DataTypes.LongType. not a valid primitive type for JavaScript
     * @memberof module:eclairjs/sql/types
     * @ignore
     */

    var LongType = function(jvmObj) {
        NumericType.call(this, jvmObj);
    };


    LongType.prototype = Object.create(NumericType.prototype);


    LongType.prototype.constructor = LongType;

    /**
     * The default size of a value of the LongType is 8 bytes.
     * @returns {integer}
     * @ignore
     */
    LongType.prototype.defaultSize = function () {
        return this.getJavaObject().defaultSize();
    };
    LongType.prototype.classTag = function () {
        return this.getJavaObject().classTag();
    };
    LongType.prototype.integral = function () {
        return this.getJavaObject().integral();
    };
    LongType.prototype.numeric = function () {
        return this.getJavaObject().numeric();
    };
    LongType.prototype.ordering = function () {
        return this.getJavaObject().ordering();
    };
    LongType.prototype.tag = function () {
        return this.getJavaObject().tag();
    };
    LongType.prototype.unapply = function () {
        return this.getJavaObject().unapply();
    };
    /**
     * @returns {string}
     * @ignore
     */
    LongType.prototype.simpleString = function () {
        return this.getJavaObject().simpleString();
    };

    module.exports = LongType;

})();
