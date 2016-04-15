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

    /**
     * @constructor
     * @memberof module:eclairjs/sql
     * @classdesc A thin wrapper around Date that allows the JDBC API to identify this as an SQL TIMESTAMP value.
     * It adds the ability to hold the SQL TIMESTAMP fractional seconds value, by allowing the specification of
     * fractional seconds to a precision of nanoseconds. A Timestamp also provides formatting and parsing operations
     * to support the JDBC escape syntax for timestamp values.
     * @param {number | string | Date} number of millisecond, string date representation, or Date object
     */
    var SqlTimestamp = function(o) {
        var jvmObj;
        if (!o) {
            var d = new Date();
            jvmObj = new java.sql.Timestamp(d.getTime());
        } else if (typeof o === 'number') {
            // assume millisec
            jvmObj = new java.sql.Timestamp(o);
        } else if (typeof o === 'string' || o instanceof String) {
            var d = new Date(o);
            jvmObj = new java.sql.Timestamp(d.getTime());
        } else if (o instanceof Date) {
            jvmObj = new java.sql.Timestamp(o.getTime());
        } else {
            jvmObj = o;
        }
        JavaWrapper.call(this, jvmObj);

        this.logger = Logger.getLogger("sql.SqlTimestamp_js");
        this.logger.debug("SqlTimestamp constructor");
    };

    SqlTimestamp.prototype = Object.create(JavaWrapper.prototype);

    SqlTimestamp.prototype.constructor = SqlTimestamp;

    /**
     * Indicates whether this Timestamp object is later than the given Timestamp object.
     * @param {SqlTimeStamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.after = function (when) {
        return this.getJavaObject().after(Utils.unwrapObject(when));
    };
    /**
     * Indicates whether this Timestamp object is earlier than the given Timestamp object.
     * @param {SqlTimeStamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.before = function (when) {
        return this.getJavaObject().before(Utils.unwrapObject(when));
    };
    /**
     * Compares this Timestamp object to the given Date or Timestamp object.
     * @param {SqlDate | SqlTimestamp} when
     * @returns {integer}
     */
    SqlTimestamp.prototype.compareTo = function (when) {
        return this.getJavaObject().compareTo(Utils.unwrapObject(when));
    };
    /**
     * Tests to see if this Timestamp object is equal to the given Timestamp object.
     * @param {SqlTimestamp} when
     * @returns {boolean}
     */
    SqlTimestamp.prototype.equals = function (when) {
        return this.getJavaObject().equals(Utils.unwrapObject(when));
    };
    /**
     * Gets this Timestamp object's nanos value.
     * @returns {integer}
     */
    SqlTimestamp.prototype.getNanos = function () {
        return this.getJavaObject().getNanos();
    };
    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT represented by this Timestamp object
     * @returns {integer}
     */
    SqlTimestamp.prototype.getTime = function () {
        return this.getJavaObject().getTime();
    };
    /**
     * Returns a hash code value for this object.
     * @returns {integer}
     */
    SqlTimestamp.prototype.hashCode = function () {
        return this.getJavaObject().hashCode();
    };
    /**
     * Sets this Timestamp object's nanos field to the given value.
     * @param {integer}
     */
    SqlTimestamp.prototype.setNanos = function (n) {
        return this.getJavaObject().setNanos(n);
    };
    /**
     * Sets this Timestamp object to represent a point in time that is time milliseconds after January 1, 1970 00:00:00 GMT.
     * @param {integer}
     */
    SqlTimestamp.prototype.setTime = function (n) {
        return this.getJavaObject().setTime(n);
    };
    /**
     * Formats a timestamp in JDBC timestamp escape format.
     * @returns {string}
     */
    SqlTimestamp.prototype.toString = function () {
        return this.getJavaObject().toString();
    };

    SqlTimestamp.prototype.toJSON = function () {
        return this.getJavaObject().toString();
    };

    module.exports = SqlTimestamp;

})();