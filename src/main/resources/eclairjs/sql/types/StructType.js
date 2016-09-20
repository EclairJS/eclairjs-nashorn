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
/*

NOTE: not implemented
protected static StructType	fromAttributes(scala.collection.Seq<org.apache.spark.sql.catalyst.expressions.Attribute> attributes) 
org.apache.spark.sql.catalyst.expressions.InterpretedOrdering	interpretedOrdering() 
scala.collection.Iterator<StructField>	iterator() 
protected scala.collection.Seq<org.apache.spark.sql.catalyst.expressions.AttributeReference>	toAttributes() 
*/
(function () {

    var JavaWrapper = require(EclairJS_Globals.NAMESPACE + '/JavaWrapper');
    var Logger = require(EclairJS_Globals.NAMESPACE + '/Logger');
    var Utils = require(EclairJS_Globals.NAMESPACE + '/Utils');

    var StructField = require(EclairJS_Globals.NAMESPACE + '/sql/types/StructField');
    var logger = Logger.getLogger("sql.StructField_js");

    /**
     * @constructor
     * @memberof module:eclairjs/sql/types
     * @classdesc For a StructType object, one or multiple StructFields can be extracted by names.
     * If multiple StructFields are extracted, a StructType object will be returned.
     * If a provided name does not have a matching field, it will be ignored.
     * @param {module:eclairjs/sql/types.StructField[]} [fields] - The name of this field.
     */
    var StructType = function(fields) {

        var jvmObj = null;
        if (!fields)
        {
           jvmObj = new org.apache.spark.sql.types.StructType();
        }
        else if (!Array.isArray(fields)) {
            logger.debug("Java object ");
            jvmObj = fields; // the name is really a jvmObject created by one of our wrappers.
        } else {
            var f = [];
            fields.forEach(function (field) {
                f.push(Utils.unwrapObject(field));
            });
            jvmObj = new org.apache.spark.sql.types.StructType(f);

        }
        // Call the parent constructor, making sure (using Function#call)
        // that "this" is set correctly during the call
        JavaWrapper.call(this, jvmObj);

    };

//Create a StructType.prototype object that inherits from JavaWrapper.prototype.

    StructType.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to StructType
    StructType.prototype.constructor = StructType;

    /**
     * Creates a new StructType by adding a new nullable field with no metadata.
     * @param {string | module:eclairjs/sql/types.StructField} name
     * @param {module:eclairjs/sql/types.DataType | string} dataType
     * @param {boolean} [nullable]  defaults true, nullable field
     * @param {module:eclairjs/sql/types.Metadata} [metadata] defaults to null, specifying metadata
     * @returns {module:eclairjs/sql/types.StructType}
     */
    StructType.prototype.add = function (name, dataType, nullable, metadata) {
        /*
         StructType	add(java.lang.String name, DataType dataType)
         Creates a new StructType by adding a new nullable field with no metadata.

         StructType	add(java.lang.String name, DataType dataType, boolean nullable)
         Creates a new StructType by adding a new field with no metadata.

         StructType	add(java.lang.String name, DataType dataType, boolean nullable, Metadata metadata)
         Creates a new StructType by adding a new field and specifying metadata.

         StructType	add(java.lang.String name, java.lang.String dataType)
         Creates a new StructType by adding a new nullable field with no metadata where the dataType is specified as a String.

         StructType	add(java.lang.String name, java.lang.String dataType, boolean nullable)
         Creates a new StructType by adding a new field with no metadata where the dataType is specified as a String.

         StructType	add(java.lang.String name, java.lang.String dataType, boolean nullable, Metadata metadata)
         Creates a new StructType by adding a new field and specifying metadata where the dataType is specified as a String.

         StructType	add(StructField field)
         Creates a new StructType by adding a new field.
         */
         if (arguments.length==1)
            return new StructType(this.getJavaObject().add(Utils.unwrapObject(arguments[0])));
        else
            return new StructType(this.getJavaObject().add(Utils.unwrapObject(name), Utils.unwrapObject(dataType)), nullable, Utils.unwrapObject(metadata));
    };
    /**
     * Extracts a StructField of the given name or index.
     * @param {integer | string} field - index or name
     * @returns {module:eclairjs/sql/types.StructField}
     */
    StructType.prototype.apply = function (field) {

        /*
         StructField	apply(int fieldIndex)
         StructField	apply(java.lang.String name)
         Extracts a StructField of the given name.
         NOTE: method below is not supported.
         StructType	apply(scala.collection.immutable.Set<java.lang.String> names)
         Returns a StructType containing StructFields of the given names, preserving the original order of fields.
         */
        return new StructField(this.getJavaObject().apply(fields));

    };
    /**
     * The default size of a value of the StructType is the total default sizes of all field types.
     * @returns {integer}
     */
    StructType.prototype.defaultSize = function () {

        /*
         int	defaultSize()
         The default size of a value of the StructType is the total default sizes of all field types.
         */
        return this.getJavaObject().defaultSize();

    };
    /**
     * Returns index of a given field
     * @param {string} name
     * @returns {integer}
     */
    StructType.prototype.fieldIndex = function (name) {

        /*
         int	fieldIndex(java.lang.String name)
         Returns index of a given field
         */
        return this.getJavaObject().fieldIndex(name);

    };
    /**
     * Returns all field names in an array.
     * @returns {string[]}
     */
    StructType.prototype.fieldNames = function () {

        /*
         java.lang.String[]	fieldNames()
         Returns all field names in an array.
         */
        return this.getJavaObject().fieldNames();

    };
    /**
     *
     * @returns {module:eclairjs/sql/types.StructField[]}
     */
    StructType.prototype.fields = function () {

        /*
         StructField[]	fields()
         */
        var fieldsJava = this.getJavaObject().fields();
        var fields = [];
        for (var i = 0; i < fieldsJava.length; i++) {
            fields.push(new StructField(fieldsJava[i])); // wrapper the object for javascipt
        }
        return fields;

    };
    /**
     * @returns {integer}
     */
    StructType.prototype.length = function () {

        /*
         int	length()
         */
        return this.getJavaObject().length();
    };
    /**
     *
     * @returns {void}
     */
    StructType.prototype.printTreeString = function () {

        /*
         void	printTreeString()
         */
        return this.getJavaObject().printTreeString();
    };
    /**
     *
     * @returns {string} Readable string representation for the type.
     */
    StructType.prototype.simpleString = function () {

        /*
         java.lang.String	simpleString()
         */
        return this.getJavaObject().simpleString();
    };
    /**
     *
     * @returns {string}
     */
    StructType.prototype.treeString = function () {

        /*
         java.lang.String	treeString()
         */
        return this.getJavaObject().treeString();
    };

    StructType.prototype.toJSON = function () {
        var jsonObj = {};
        jsonObj.fields = [];
        var sf = this.fields();
        sf.forEach(function (f) {
            jsonObj.fields.push(f.toJSON());
        });

        return jsonObj;
    };

    module.exports = StructType;

})();
