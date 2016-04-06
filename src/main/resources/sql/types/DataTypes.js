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
define("eclairjs/sql/types/DataTypes",
    [
        'eclairjs/sql/types/BooleanType', 'eclairjs/sql/types/DateType', 'eclairjs/sql/types/DoubleType',
        'eclairjs/sql/types/FloatType', 'eclairjs/sql/types/IntegerType', 'eclairjs/sql/types/StringType',
        'eclairjs/sql/types/TimestampType', 'eclairjs/sql/types/NullType', 'eclairjs/sql/types/BinaryType',
        'eclairjs/sql/types/CalendarIntervalType'
    ],
    function (BooleanType, DateType, DoubleType,
              FloatType, IntegerType, StringType,
              TimestampType, NullType, BinaryType,
              CalendarIntervalType) {
        /**
         * @constructor
         * @classdesc The base type of all Spark SQL data types.
         */
        var DataTypes = function () {

        };
        /**
         * Gets the BooleanType object.
         * @static
         */
        DataTypes.BooleanType = new BooleanType(org.apache.spark.sql.types.DataTypes.BooleanType);
        /**
         * Gets the DateType object.
         * @static
         */
        DataTypes.DateType = new DateType(org.apache.spark.sql.types.DataTypes.DateType);
        /**
         * Gets the DoubleType object. Note: JavaScript float types are mapped to DoubleTypes in Spark,
         * The user should use the DoubleType for all float processing
         * @static
         */
        DataTypes.DoubleType = new DoubleType(org.apache.spark.sql.types.DataTypes.DoubleType);
        /*
         * NOTE:
         * Nashorn interprets numbers as java.lang.Double, java.lang.Long, or java.lang.Integer objects, depending on the computation performed.
         * You can use the Number() function to force a number to be a Double object
         * https://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/api.html
         */
        /**
         * Gets the FloatType object. Note: JavaScript float types are mapped to DoubleTypes in Spark,
         * The user should use the DoubleType for all float processing
         * @static
         */
        DataTypes.FloatType = new FloatType(org.apache.spark.sql.types.DataTypes.FloatType);
        /** Gets the IntegerType object.
         * @static
         */
        DataTypes.IntegerType = new IntegerType(org.apache.spark.sql.types.DataTypes.IntegerType);
        /**
         * Gets the StringType object.
         * @static
         */
        DataTypes.StringType = new StringType(org.apache.spark.sql.types.DataTypes.StringType);
        /**
         * Gets the TimestampType object.
         * @static
         */
        DataTypes.TimestampType = new TimestampType(org.apache.spark.sql.types.DataTypes.TimestampType);
        /**
         * Gets the NullType object.
         * @static
         */
        DataTypes.NullType = new NullType(org.apache.spark.sql.types.DataTypes.NullType);
        /**
         * Gets the LongType object. not a valid primitive type for JavaScript
         * @static
         * @ignore
         */
//DataTypes.LongType = new LongType(org.apache.spark.sql.types.DataTypes.LongType);
        /**
         * Gets the BinaryType object.
         * @static
         */
        DataTypes.BinaryType = new BinaryType(org.apache.spark.sql.types.DataTypes.BinaryType);
        /*
         * Gets the ByteType object. Not a valid primitive type for JavaScript
         */
//DataTypes.ByteType = new ByteType(org.apache.spark.sql.types.DataTypes.ByteType);
        /**
         * Gets the CalendarIntervalType object.
         * @static
         */
        DataTypes.CalendarIntervalType = new CalendarIntervalType(org.apache.spark.sql.types.DataTypes.CalendarIntervalType);
        /*
         * Gets the DecimalType object. not a valid primitive type for JavaScript
         */
//DataTypes.DecimalType = new DecimalType(org.apache.spark.sql.types.DataTypes.DecimalType);
        /**
         * Gets the ShortType object. not a valid primitive type for JavaScript
         * @static
         * @ignore
         */
//DataTypes.ShortType = new ShortType(org.apache.spark.sql.types.DataTypes.ShortType);


        /**
         * Creates a StructField with empty metadata.
         * @param {String} fieldName
         * @param {DataType} dataType
         * @param {boolean} nullable
         * @returns {StructField}
         */
        DataTypes.createStructField = function (fieldName, dataType, nullable) {
            /*	public static StructField createStructField(java.lang.String name,
             DataType dataType,
             boolean nullable)
             Creates a StructField with empty metadata.
             */
            Logger.getLogger("DataType_js").debug(dataType);

            return new StructField(org.apache.spark.sql.types.DataTypes.createStructField(fieldName, Utils.unwrapObject(dataType), nullable));

        };
        /**
         * Creates a StructType with the given StructField array (fields).
         * @param {Array} fields
         * @returns {StructType}
         */
        DataTypes.createStructType = function (fields) {
            //public static StructType createStructType(java.util.List<StructField> fields)
            //var list = new java.util.List();
            /*public static StructType createStructType(StructField[] fields)
             Creates a StructType with the given StructField array (fields).
             */
            //return org.apache.spark.sql.types.DataTypes.createStructType(fields);
            var f = [];
            fields.forEach(function (field) {
                f.push(Utils.unwrapObject(field));
                //field.getJavaObject ? f.push(field.getJavaObject()) : f.push(field);
            });
            var ret = new StructType(org.apache.spark.sql.types.DataTypes.createStructType(f));
            return ret;
        };

        return DataTypes;
    })

