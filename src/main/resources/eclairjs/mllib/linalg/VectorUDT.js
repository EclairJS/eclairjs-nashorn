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

    /**
     * :: AlphaComponent ::
     *
     * User-defined type for {@link Vector} which allows easy interaction with SQL
     * via {@link DataFrame}.
     * @classdesc
     */

    /**
     * @returns {??}
     * @class
     * @memberof module:eclairjs/mllib/linalg
     */
    var VectorUDT = function (jvmObject) {

        this.logger = Logger.getLogger("VectorUDT_js");
        JavaWrapper.call(this, jvmObject);

    };

    VectorUDT.prototype = Object.create(JavaWrapper.prototype);

    VectorUDT.prototype.constructor = VectorUDT;


    /**
     * @returns {StructType}
     */
    VectorUDT.prototype.sqlType = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().sqlType();
        //   return new StructType(javaObject);
    };


    /**
     * @param {object} obj
     * @returns {InternalRow}
     */
    VectorUDT.prototype.serialize = function (obj) {
        throw "not implemented by ElairJS";
        //   var obj_uw = Utils.unwrapObject(obj);
        //   return  this.getJavaObject().serialize(obj_uw);
    };


    /**
     * @param {object} datum
     * @returns {Vector}
     */
    VectorUDT.prototype.deserialize = function (datum) {
        throw "not implemented by ElairJS";
        //   var datum_uw = Utils.unwrapObject(datum);
        //   var javaObject =  this.getJavaObject().deserialize(datum_uw);
        //   return Utils.javaToJs(javaObject);
    };


    /**
     * @returns {string}
     */
    VectorUDT.prototype.pyUDT = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().pyUDT();
    };


    /**
     * @returns {Class}
     */
    VectorUDT.prototype.userClass = function () {
        throw "not implemented by ElairJS";
        //   var javaObject =  this.getJavaObject().userClass();
        //   return new Class(javaObject);
    };


    /**
     * @param {object} o
     * @returns {boolean}
     */
    VectorUDT.prototype.equals = function (o) {
        throw "not implemented by ElairJS";
        //   var o_uw = Utils.unwrapObject(o);
        //   return  this.getJavaObject().equals(o_uw);
    };


    /**
     * @returns {number}
     */
    VectorUDT.prototype.hashCode = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().hashCode();
    };


    /**
     * @returns {string}
     */
    VectorUDT.prototype.typeName = function () {
        throw "not implemented by ElairJS";
        //   return  this.getJavaObject().typeName();
    };

    module.exports = VectorUDT;

})();
