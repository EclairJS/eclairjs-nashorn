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
	/**
	 *
	 * @constructor
     * @memberof module:eclairjs/sql
	 * @classdesc A column in a DataFrame.
	 * @param {string} column name of the column
	 */
	var Column = function (column) {
		var jvmObj;
		if (typeof column === 'string' || column instanceof String) {
			jvmObj = new org.apache.spark.sql.Column(column);
		} else {
			jvmObj = column;

		}
		this.logger = Logger.getLogger("sql.Column_js");
		JavaWrapper.call(this, jvmObj);
	};

	Column.prototype = Object.create(JavaWrapper.prototype);

//Set the "constructor" property to refer to Column
	Column.prototype.constructor = Column;


	/**
	 * Gives the column an alias. Same as as.
	 * @param {string} alias
	 * @returns {Column}
	 * @example
	 * // Renames colA to colB in select output.
	 * df.select(df.col("colA").alias("colB"))
	 */
	Column.prototype.alias = function (a) {
		return new Column(this.getJavaObject().alias(a));
	}
	/**
	 * Boolean AND.
	 * @param {Column} other
	 * @returns {Column}
	 * @example
	 * people.select( people.col("inSchool").and(people.col("isEmployed")));
	 */
	Column.prototype.and = function (other) {
		return new Column(this.getJavaObject().and(Utils.unwrapObject(other)));
	}
	/**
	 * Extracts a value or values from a complex type.
	 * The following types of extraction are supported:
	 * - Given an Array, an integer ordinal can be used to retrieve a single value.
	 * - Given a Map, a key of the correct type can be used to retrieve an individual value.
	 * - Given a Struct, a string fieldName can be used to extract that field.
	 * - Given an Array of Structs, a string fieldName can be used to extract filed
	 *   of every struct in that array, and return an Array of fields
	 * @param {string}
	 * @returns {Column}
	 * @private
	 */
	Column.prototype.apply = function (extraction) {
		throw "not implemented by ElairJS";
		//return new Column(this.getJavaObject().apply(extraction));
	}
	/**
	 * Gives the column an alias.
	 * @param {string | string[]} aliases, if array of strings assigns the given aliases to the results of a table generating function.
	 * @param {Metadata} [metadata] not valid with string array
	 * @returns {Column}
	 */
	Column.prototype.as = function (aliases, metadata) {
		var c;
		if (!Array.isArray(aliases) && metadata) {
			c = this.getJavaObject().as(aliases, metadata);
		} else {
			c = this.getJavaObject().as(aliases);
		}
		return new Column(c);
	}
	/**
	 * Returns an ordering used in sorting.
	 * @returns {Column}
	 * @example
	 * df.sort(df.col("age").asc());
	 */
	Column.prototype.asc = function () {
		return new Column(this.getJavaObject().asc());
	};
	/**
	 * True if the current column is between the lower bound and upper bound, inclusive.
	 * @param {object} lowerBound
	 * @param {object} upperBound
	 * @returns {Column}
	 * @example
	 * var col = new Column("age");
	 * var testCol = col.between(10, 29);
	 * var results = peopleDataFrame.select(testCol);
	 */
	Column.prototype.between = function (lowerBound, upperBound) {
		this.logger.debug("between");
		return new Column(this.getJavaObject().between(lowerBound, upperBound));
	};
	/**
	 * Compute bitwise AND of this expression with another expression.
	 * @example
	 *   df.select(df.col("colA").bitwiseAND(df.col("colB")));
	 *
	 * @since EclairJS 0.1 Spark  1.4.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.bitwiseAND = function (other) {
		var javaObject = this.getJavaObject().bitwiseAND(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Compute bitwise OR of this expression with another expression.
	 * @example
	 *   df.select(df.col("colA").bitwiseOR(df.col("colB")));
	 *
	 * @since EclairJS 0.1 Spark  1.4.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.bitwiseOR = function (other) {
		var javaObject = this.getJavaObject().bitwiseOR(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Compute bitwise XOR of this expression with another expression.
	 * @example
	 *   df.select(df.col("colA").bitwiseXOR(df.col("colB")));
	 *
	 * @since EclairJS 0.1 Spark  1.4.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.bitwiseXOR = function (other) {
		var javaObject = this.getJavaObject().bitwiseXOR(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Casts the column to a different data type.
	 * @example
	 *   // Casts colA to IntegerType.
	 *   df.select(df("colA").cast(DataTpes.IntegerType))
	 *
	 *   // equivalent to
	 *   df.select(df.col("colA").cast("int"))
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {DataType | string} to If string supported types are: `string`, `boolean`, `int`,
	 * `float`, `double`, `date`, `timestamp`.
	 * @returns {Column}
	 */
	Column.prototype.cast = function (to) {
		var javaObject = this.getJavaObject().cast(Utils.unwrapObject(to));
		return new Column(javaObject);
	};
	/**
	 * Contains the other element.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object}
	 * @returns {Column}
	 */
	Column.prototype.contains = function (other) {
		var javaObject = this.getJavaObject().contains(other);
		return new Column(javaObject);
	}
	/**
	 * Returns an ordering used in sorting.
	 * @returns {Column}
	 * @example
	 * df.sort(df.col("age").desc());
	 */
	Column.prototype.desc = function () {
		return new Column(this.getJavaObject().desc());
	};
	/**
	 * Division this expression by another expression.
	 * @example
	 *   people.select( people.col("height").divide(people.col("weight")) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.divide = function (other) {
		var javaObject = this.getJavaObject().divide(Utils.unwrapObject(other));
		return new Column(javaObject);
	}
	/**
	 * String ends with.
	 * with another string literal
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {string | Column} other, if string ends with another string literal.
	 * @returns {Column}
	 */
	Column.prototype.endsWith = function (other) {
		var javaObject = this.getJavaObject().endsWith(Utils.unwrapObject(other));
		return new Column(javaObject);
	}
	/**
	 * Equality test that is safe for null values.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object} other
	 * @returns {Column}
	 */
	Column.prototype.eqNullSafe = function (other) {
		var javaObject = this.getJavaObject().eqNullSafe(Utils.unwrapObject(other));
		return new Column(javaObject);
	}
	/**
	 * Equality test
	 * @param {object}
	 * @returns {boolean}
	 */
	Column.prototype.equals = function (that) {
		return this.getJavaObject().equals(Utils.unwrapObject(that));
	};
	/**
	 * Equality test
	 * @param {object}
	 * @returns {Column}
	 */
	Column.prototype.equalTo = function (obj) {
		return new Column(this.getJavaObject().equalTo(Utils.unwrapObject(obj)));
	};
	/**
	 * Prints the expression to the console for debugging purpose.
	 * @parma {boolean} extended
	 * @since EclairJS 0.1 Spark  1.3.0
	 */
	Column.prototype.explain = function (extended) {
		var ex = extended ? true : false;
		this.getJavaObject().explain(extended);
	};
	/**
	 * Greater than or equal to an expression.
	 * @example
	 * people.select( people.col("age").geq(21) )
	 * @param {object}
	 * @returns {Column}
	 */
	Column.prototype.geq = function (obj) {
		return new Column(this.getJavaObject().geq(Utils.unwrapObject(obj)));
	};
	/**
	 * An expression that gets a field by name in a {@link StructType}.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {string} fieldName
	 * @returns {Column}
	 */
	Column.prototype.getField = function (fieldName) {
		var javaObject = this.getJavaObject().getField(fieldName);
		return new Column(javaObject);
	};
	/**
	 * An expression that gets an item at position `ordinal` out of an array,
	 * or gets a value by key `key` in a {@link MapType}.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object} key
	 * @returns {Column}
	 */
	Column.prototype.getItem = function (key) {
		var javaObject = this.getJavaObject().getItem(Utils.unwrapObject(key));
		return new Column(javaObject);
	};
	/**
	 * Greater than.
	 * @example
	 *   people.select( people.col("age").gt(21) );
	 * @param {object}
	 * @returns {Column}
	 */
	Column.prototype.gt = function (obj) {
		return new Column(this.getJavaObject().gt(Utils.unwrapObject(obj)));
	};
	/**
	 * @returns {integer}
	 */
	Column.prototype.hashCode = function () {
		return this.getJavaObject().hashCode();
	};
	/**
	 * A boolean expression that is evaluated to true if the value of this expression is contained
	 * by the evaluated values of the arguments.
	 * @example
	 * var col = peopleDataFrame.col("age");
	 * var testCol = col.in([20, 19]);
	 * var results = peopleDataFrame.select(testCol);
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {array}
	 * @returns {Column}
	 */
	Column.prototype.in = function (list) {
		var javaObject = this.getJavaObject().in(list);
		return new Column(javaObject);
	};
	/**
	 * A boolean expression that is evaluated to true if the value of this expression is contained
	 * by the evaluated values of the arguments.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {array}
	 * @returns {Column}
	 */
	Column.prototype.isin = function (list) {
		var javaObject = this.getJavaObject().isin(list);
		return new Column(javaObject);
	};
	/**
	 * True if the current expression is NaN.
	 *
	 * @since EclairJS 0.1 Spark  1.5.0
	 * @returns {Column}
	 */
	Column.prototype.isNaN = function () {
		var javaObject = this.getJavaObject().isNaN();
		return new Column(javaObject);
	};
	/**
	 * True if the current expression is null.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @returns {Column}
	 */
	Column.prototype.isNull = function () {
		var javaObject = this.getJavaObject().isNull();
		return new Column(javaObject);
	};
	/**
	 * True if the current expression is NOT null.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @returns {Column}
	 */
	Column.prototype.isNotNull = function () {
		var javaObject = this.getJavaObject().isNotNull();
		return new Column(javaObject);
	};
	/**
	 * Less than or equal to.
	 * @example
	 *   people.select( people.col("age").leq(21) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object} other
	 * @returns {Column}
	 */
	Column.prototype.leq = function (other) {
		var javaObject = this.getJavaObject().leq(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * SQL like expression.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {string} literal
	 * @returns {Column}
	 */
	Column.prototype.like = function (literal) {
		var javaObject = this.getJavaObject().like(literal);
		return new Column(javaObject);
	};
	/**
	 * Less than.
	 * @example
	 *   people.select( people.col("age").lt(21) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object} other
	 * @returns {Column}
	 */
	Column.prototype.lt = function (other) {
		var javaObject = this.getJavaObject().lt(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Subtraction. Subtract the other expression from this expression.
	 * @example
	 *   people.select( people.col("height").minus(people.col("weight")) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.minus = function (other) {
		var javaObject = this.getJavaObject().minus(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Modulo (a.k.a. remainder) expression.
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {object} other
	 * @returns {Column}
	 */
	Column.prototype.mod = function (other) {
		var javaObject = this.getJavaObject().mod(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Multiplication of this expression and another expression.
	 * @example
	 *   people.select( people.col("height").multiply(people.col("weight")) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.multiply = function (other) {
		var javaObject = this.getJavaObject().multiply(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Inequality test.
	 * @example
	 *   df.filter( df.col("colA").notEqual(df.col("colB")) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.notEqual = function (other) {
		var javaObject = this.getJavaObject().notEqual(Utils.unwrapObject(other));
		return new Column(javaObject);
	};
	/**
	 * Boolean OR.
	 * @example
	 *   people.filter( people.col("inSchool").or(people.col("isEmployed")) );
	 *
	 * @since EclairJS 0.1 Spark  1.3.0
	 * @param {Column} other
	 * @returns {Column}
	 */
	Column.prototype.or = function (other) {
		var other_uw = Utils.unwrapObject(other);
		var javaObject = this.getJavaObject().or(other_uw);
		return new Column(javaObject);
	};
	/**
	 * Evaluates a list of conditions and returns one of multiple possible result expressions.
	 * If otherwise is not defined at the end, null is returned for unmatched conditions.
	 *
	 * @example
	 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
	 *     .when(people.col("gender").equalTo("female"), 1)
	 *     .otherwise(2))
	 *
	 * @since EclairJS 0.1 Spark  1.4.0
	 * @param {object} value
	 * @returns {Column}
	 */
	Column.prototype.otherwise = function (value) {
		var javaObject = this.getJavaObject().otherwise(value);
		return new Column(javaObject);
	};
	/**
	 * Evaluates a list of conditions and returns one of multiple possible result expressions.
	 * If otherwise is not defined at the end, null is returned for unmatched conditions.
	 *
	 * @example
	 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
	 *     .when(people.col("gender").equalTo("female"), 1)
	 *     .otherwise(2))
	 *
	 * @since EclairJS 0.1 Spark  1.4.0
	 * @returns {Column}
	 */
	Column.prototype.when = function (condition, value) {
		var condition_uw = Utils.unwrapObject(condition);
		var javaObject = this.getJavaObject().when(condition_uw, value);
		return new Column(javaObject);
	}

    module.exports = Column;

})();










