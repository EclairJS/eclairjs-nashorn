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

//
// static methods
//

/**
 * @constructor
 * @classdesc Spark SQL functions.
 */

var functions = function() {

};

/**
 * Returns a {@link Column} based on the given column name.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} colName
 * @returns {Column} 
 */
functions.col = function(colName) {
	var javaObject = org.apache.spark.sql.functions.col(colName);
	return new Column(javaObject);
};


/**
 * Returns a [[Column]] based on the given column name. Alias of {@link col}.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} colName
 * @returns {Column} 
 */
functions.column = function(colName) {
	var javaObject = org.apache.spark.sql.functions.column(colName);
	return new Column(javaObject);
};


/**
 * Creates a {@link Column} of literal value.
 *
 * The passed in object is returned directly if it is already a {@link Column}.
 * Otherwise, a new {@link Column} is created to represent the literal value.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {object} literal
 * @returns {Column} 
 */
functions.lit = function(literal) {
	var javaObject = org.apache.spark.sql.functions.lit(Utils.unwrapObject(literal));
	return new Column(javaObject);
};


/**
 * Returns a sort expression based on ascending order of the column.
 * @example
 *   // Sort by dept in ascending order, and then age in descending order.
 *   df.sort(functions.asc("dept"), functions.desc("age"))
 *  
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} columnName
 * @returns {Column} 
 */
functions.asc = function(columnName) {
	var javaObject = org.apache.spark.sql.functions.asc(columnName);
	return new Column(javaObject);
};


/**
 * Returns a sort expression based on the descending order of the column.
 * @example
 *   // Sort by dept in ascending order, and then age in descending order.
 *   df.sort(functions.asc("dept"), functions.desc("age"))
 *  
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {string} columnName
 * @returns {Column} 
 */
functions.desc = function(columnName) {
   var javaObject = org.apache.spark.sql.functions.desc(columnName);
   return new Column(javaObject);
};


/**
 * Aggregate function: returns the approximate number of distinct items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @param {float} rsd Optional
 * @returns {Column} 
 */
functions.approxCountDistinct = function(column, rsd) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject;
   if (rsd) {
	   javaObject = org.apache.spark.sql.functions.approxCountDistinct(e_uw, rsd);
   } else {
	   javaObject = org.apache.spark.sql.functions.approxCountDistinct(e_uw);
   }
   
   return new Column(javaObject);
};


/**
 * Aggregate function: returns the average of the values in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.avg = function(column) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.avg(e_uw);
   return new Column(javaObject);
}


/**
 * Aggregate function: returns the number of items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.count = function(column) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.count(e_uw);
   return new Column(javaObject);
}



/**
 * Aggregate function: returns the number of distinct items in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column} 
 */
functions.countDistinct  = function() {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	var str = "org.apache.spark.sql.functions.countDistinct("
	for (var i = 0; i < args.length; i++) {
		var spacer = i < 1 ? "" : ",";
		str += spacer + "args[" + i + "]";
	}	
	str += ");";

	var javaObject = eval(str);

    return new Column(javaObject);

}

/**
 * Aggregate function: returns the first value in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.first = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.first(e_uw);
   return new Column(javaObject);
}


/**
 * Aggregate function: returns the last value in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.last = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.last(e_uw);
   return new Column(javaObject);
}

/**
 * Aggregate function: returns the maximum value of the expression in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.max = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.max(e_uw);
   return new Column(javaObject);
}

/**
 * Aggregate function: returns the average of the values in a group.
 * Alias for avg.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.mean = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.mean(e_uw);
   return new Column(javaObject);
}

/**
 * Aggregate function: returns the minimum value of the expression in a group.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.min = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.min(e_uw);
   return new Column(javaObject);
}


/**
 * Aggregate function: returns the sum of all values in the expression.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.sum = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.sum(e_uw);
   return new Column(javaObject);
}


/**
 * Aggregate function: returns the sum of distinct values in the expression.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column | string} column object or column name as a string
 * @returns {Column} 
 */
functions.sumDistinct = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.sumDistinct(e_uw);
   return new Column(javaObject);
}

/**
 * Window function: returns the cumulative distribution of values within a window partition,
 * i.e. the fraction of rows that are below the current row.
 *
 * @example
 *   N = total number of rows in the partition
 *   cumeDist(x) = number of values before (and including) x / N
 *  
 *
 *
 * This is equivalent to the CUME_DIST function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.cumeDist = function() {
   var javaObject = org.apache.spark.sql.functions.cumeDist();
   return new Column(javaObject);
}


/**
 * Window function: returns the rank of rows within a window partition, without any gaps.
 *
 * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
 * sequence when there are ties. That is, if you were ranking a competition using denseRank
 * and had three people tie for second place, you would say that all three were in second
 * place and that the next person came in third.
 *
 * This is equivalent to the DENSE_RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.denseRank = function() {
   var javaObject = org.apache.spark.sql.functions.denseRank();
   return new Column(javaObject);
}


/**
 * Window function: returns the value that is `offset` rows before the current row, and
 * `null` or defaultValue if there is less than `offset` rows before the current row. For example,
 * an `offset` of one will return the previous row at any given point in the window partition.
 *
 * This is equivalent to the LAG function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column
 * @param {integer} offset
 * @param {object} defaultValue
 * @returns {Column} 
 */
functions.lag = function(column, offset, defaultValue) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject
   if (defaultValue) {
	   javaObject = org.apache.spark.sql.functions.lag(e_uw, offset, defaultValue);
   } else {
	   javaObject = org.apache.spark.sql.functions.lag(e_uw, offset);
   }

   return new Column(javaObject);
}


/**
 * Window function: returns the value that is `offset` rows after the current row, and
 * `null` or defaultValue if there is less than `offset` rows after the current row. For example,
 * an `offset` of one will return the next row at any given point in the window partition.
 *
 * This is equivalent to the LEAD function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} column
 * @param {integer} offset
 * @param {object} defaultValue
 * @returns {Column} 
 */
functions.lead = function(e, offset, defaultValue) {
	var e_uw = Utils.unwrapObject(e);
	var javaObject
	if (defaultValue) {
		   javaObject = org.apache.spark.sql.functions.lead(e_uw, offset, defaultValue);
	} else {
		   javaObject = org.apache.spark.sql.functions.lead(e_uw, offset);
	}

   return new Column(javaObject);
}


/**
 * Window function: returns the ntile group id (from 1 to `n` inclusive) in an ordered window
 * partition. Fow example, if `n` is 4, the first quarter of the rows will get value 1, the second
 * quarter will get 2, the third quarter will get 3, and the last quarter will get 4.
 *
 * This is equivalent to the NTILE function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} n
 * @returns {Column} 
 */
functions.ntile = function(n) {
   var javaObject = org.apache.spark.sql.functions.ntile(n);
   return new Column(javaObject);
}


/**
 * Window function: returns the relative rank (i.e. percentile) of rows within a window partition.
 *
 * This is computed by:
 * @example
 *   (rank of row in its partition - 1) / (number of rows in the partition - 1)
 *  
 *
 * This is equivalent to the PERCENT_RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.percentRank = function() {
   var javaObject = org.apache.spark.sql.functions.percentRank();
   return new Column(javaObject);
}


/**
 * Window function: returns the rank of rows within a window partition.
 *
 * The difference between rank and denseRank is that denseRank leaves no gaps in ranking
 * sequence when there are ties. That is, if you were ranking a competition using denseRank
 * and had three people tie for second place, you would say that all three were in second
 * place and that the next person came in third.
 *
 * This is equivalent to the RANK function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.rank = function() {
   var javaObject = org.apache.spark.sql.functions.rank();
   return new Column(javaObject);
}


/**
 * Window function: returns a sequential number starting at 1 within a window partition.
 *
 * This is equivalent to the ROW_NUMBER function in SQL.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.rowNumber = function() {
   var javaObject = org.apache.spark.sql.functions.rowNumber();
   return new Column(javaObject);
}


/**
 * Computes the absolute value.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column
 * @returns {Column} 
 */
functions.abs = function(column) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.abs(e_uw);
   return new Column(javaObject);
}


/**
 * Creates a new array column. The input columns must all have the same data type.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column} 
 */
functions.array = function() {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		var o = args[i];
		if (!(o instanceof Column)) {
			// must name column name
			o = new Column(o);
		}
		args[i] = Utils.unwrapObject(o);
	}
	var javaObject = org.apache.spark.sql.functions.array(args);
    return new Column(javaObject);

}


/**
 * Marks a DataFrame as small enough for use in broadcast joins.
 *
 * The following example marks the right DataFrame for broadcast hash join using `joinKey`.
 * @example
 *   // left and right are DataFrames
 *   left.join(broadcast(right), "joinKey")
 *  
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {DataFrame} df
 * @returns {DataFrame} 
 */
functions.broadcast = function(df) {
   var df_uw = Utils.unwrapObject(df);
   var javaObject = org.apache.spark.sql.functions.broadcast(df_uw);
   return new DataFrame(javaObject);
}


/**
 * Returns the first column that is not null, or null if all inputs are null.
 *
 * For example, `coalesce(a, b, c)` will return a if a is not null,
 * or b if a is null and b is not null, or c if both a and b are null but c is not null.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} column, ...column 
 * @returns {Column} 
 */
functions.coalesce = function() {
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		var o = args[i];
		args[i] = Utils.unwrapObject(o);
	}
	var javaObject = org.apache.spark.sql.functions.coalesce(args);
	return new Column(javaObject);
}


/**
 * Creates a string column for the file name of the current Spark task.
 *
 * @returns {Column} 
 */
functions.inputFileName = function() {
   var javaObject = org.apache.spark.sql.functions.inputFileName();
   return new Column(javaObject);
}


/**
 * Return true iff the column is NaN.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column} 
 */
functions.isNaN = function(column) {
   var e_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.isNaN(e_uw);
   return new Column(javaObject);
}


/**
 * A column expression that generates monotonically increasing 64-bit integers.
 *
 * The generated ID is guaranteed to be monotonically increasing and unique, but not consecutive.
 * The current implementation puts the partition ID in the upper 31 bits, and the record number
 * within each partition in the lower 33 bits. The assumption is that the data frame has
 * less than 1 billion partitions, and each partition has less than 8 billion records.
 *
 * As an example, consider a {@link DataFrame} with two partitions, each with 3 records.
 * This expression would return the following IDs:
 * 0, 1, 2, 8589934592 (1L << 33), 8589934593, 8589934594.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.monotonicallyIncreasingId = function() {
   var javaObject = org.apache.spark.sql.functions.monotonicallyIncreasingId();
   return new Column(javaObject);
}


/**
 * Returns col1 if it is not NaN, or col2 if col1 is NaN.
 *
 * Both inputs should be floating point columns (DoubleType or FloatType).
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} col1
 * @param {Column} col2
 * @returns {Column} 
 */
functions.nanvl = function(col1,col2) {
   var col1_uw = Utils.unwrapObject(col1);
   var col2_uw = Utils.unwrapObject(col2);
   var javaObject = org.apache.spark.sql.functions.nanvl(col1_uw,col2_uw);
   return new Column(javaObject);
}


/**
 * Unary minus, i.e. negate the expression.
 * @example
 *   df.select(functions.negate(df.col("amount")) );
 *  
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.negate = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.negate(e_uw);
   return new Column(javaObject);
}


/**
 * Inversion of boolean expression, i.e. NOT.
 * @example
 *   df.filter( functions.not(df.col("isActive")) );
 *  
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.not = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.not(e_uw);
   return new Column(javaObject);
}


/**
 * Generate a random column with i.i.d. samples from U[0.0, 1.0].
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} seed Optional
 * @returns {Column} 
 */
functions.rand = function(seed) {
	var javaObject;
	if (seed) {
		javaObject = org.apache.spark.sql.functions.rand(seed);
	} else {
		javaObject = org.apache.spark.sql.functions.rand();
	}

	return new Column(javaObject);
}


/**
 * Generate a column with i.i.d. samples from the standard normal distribution.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {integer} seed Optional
 * @returns {Column} 
 */
functions.randn = function(seed) {
	var javaObject;
	if (seed) {
		javaObject = org.apache.spark.sql.functions.randn(seed);
	} else {
		javaObject = org.apache.spark.sql.functions.randn();
	}

	return new Column(javaObject);
}


/**
 * Partition ID of the Spark task.
 *
 * Note that this is indeterministic because it depends on data partitioning and task scheduling.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.sparkPartitionId = function() {
   var javaObject = org.apache.spark.sql.functions.sparkPartitionId();
   return new Column(javaObject);
}


/**
 * Computes the square root of the specified float value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.sqrt = function(col) {
	var e_uw = Utils.unwrapObject(col);
	var javaObject = org.apache.spark.sql.functions.sqrt(e_uw);
	return new Column(javaObject);
}


/**
 * Creates a new struct column.
 * If the input column is a column in a {@link DataFrame}, or a derived column expression
 * that is named (i.e. aliased), its name would be remained as the StructField's name,
 * otherwise, the newly generated StructField's name would be auto generated as col${index + 1},
 * i.e. col1, col2, col3, ...
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column} 
 */
functions.struct = function() {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		var o = args[i];
		if (!(o instanceof Column)) {
			// must name column name
			o = new Column(o);
		}
		args[i] = Utils.unwrapObject(o);
	}
	
	var javaObject = org.apache.spark.sql.functions.struct(args);
	return new Column(javaObject);
}


/**
 * Evaluates a list of conditions and returns one of multiple possible result expressions.
 * If otherwise is not defined at the end, null is returned for unmatched conditions.
 *
 * @example
 *   // Example: encoding gender string column into integer.
 *   people.select(functions.when(people.col("gender").equalTo("male"), 0)
 *     .when(people.col("gender").equalTo("female"), 1)
 *     .otherwise(2))
 *  
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @returns {Column} 
 */
functions.when = function(condition,value) {
	var condition_uw = Utils.unwrapObject(condition);
	var javaObject = org.apache.spark.sql.functions.when(condition_uw,value);
	return new Column(javaObject);
}


/**
 * Computes bitwise NOT.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.bitwiseNOT = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.bitwiseNOT(e_uw);
   return new Column(javaObject);
}


/**
 * Parses the expression string into the column that it represents, similar to
 * DataFrame.selectExpr
 * @example
 *   // get the number of words of each length
 *   df.groupBy(functions.expr("length(word)")).count()
 *  
 * @param {string} expr
 * @returns {Column} 
 */
functions.expr = function(expr) {
   var javaObject = org.apache.spark.sql.functions.expr(expr);
   return new Column(javaObject);
}


/**
 * Computes the cosine inverse of the given value; the returned angle is in the range
 * 0.0 through pi.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.acos = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.acos(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the sine inverse of the given value; the returned angle is in the range
 * -pi/2 through pi/2.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.asin = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.asin(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the tangent inverse of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.atan = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.atan(e_uw);
   return new Column(javaObject);
}


/**
 * Returns the angle theta from the conversion of rectangular coordinates (x, y) to
 * polar coordinates (r, theta).
 * 
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.atan2(col1, col2);
 *  // or
 *  result = functions.atan2(col1, "name");
 *  // or
 *  result = functions.atan2("age", col2);
 *  // or
 *  result = functions.atan2("age", "expense");
 *  // or
 *  result = functions.atan2(col1, 2.0);
 *  // or
 *  result = functions.atan2("age", 2.0);
 *  // or
 *  result = functions.atan2(2.0, col2);
 *  // or
 *  result = functions.atan2(2.0, "expense");
 *  	
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column} 
 */
functions.atan2 = function(left,right) {
   var l_uw = Utils.unwrapObject(left);
   var r_uw = Utils.unwrapObject(right);
   var javaObject = org.apache.spark.sql.functions.atan2(l_uw,r_uw);
   return new Column(javaObject);
}


/**
 * An expression that returns the string representation of the binary value of the given long
 * column. For example, bin("12") returns "1100".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.bin = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.bin(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the cube-root of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.cbrt = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.cbrt(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the ceiling of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.ceil = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.ceil(e_uw);
   return new Column(javaObject);
}


/**
 * Convert a number in a string column from one base to another.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} num
 * @param {integer} fromBase
 * * @param {integer} toBase
 * @returns {Column} 
 */
functions.conv = function(num,fromBase,toBase) {
   var num_uw = Utils.unwrapObject(num);
   var javaObject = org.apache.spark.sql.functions.conv(num_uw,fromBase,toBase);
   return new Column(javaObject);
}


/**
 * Computes the cosine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.cos = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.cos(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the hyperbolic cosine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.cosh = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.cosh(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the exponential of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.exp = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.exp(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the exponential of the given value minus one.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.expm1 = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.expm1(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the factorial of the given value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.factorial = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.factorial(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the floor of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.floor = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.floor(e_uw);
   return new Column(javaObject);
}


/**
 * Returns the greatest value of the list of values, skipping null values.
 * This function takes at least 2 parameters. It will return null if all parameters are null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column} 
 */
functions.greatest = function() {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		var o = args[i];
		if (!(o instanceof Column)) {
			// must name column name
			o = new Column(o);
		}
		args[i] = Utils.unwrapObject(o);
	}
	
	var javaObject = org.apache.spark.sql.functions.greatest(args);
	return new Column(javaObject);

}

/**
 * Computes hex value of the given column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column} 
 */
functions.hex = function(column) {
   var column_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.hex(column_uw);
   return new Column(javaObject);
}


/**
 * Inverse of hex. Interprets each pair of characters as a hexadecimal number
 * and converts to the byte representation of number.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} column
 * @returns {Column} 
 */
functions.unhex = function(column) {
   var column_uw = Utils.unwrapObject(column);
   var javaObject = org.apache.spark.sql.functions.unhex(column_uw);
   return new Column(javaObject);
}


/**
 * Computes `sqrt(a^2^ + b^2^)` without intermediate overflow or underflow.
 *
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.hypot(col1, col2);
 *  // or
 *  result = functions.hypot(col1, "name");
 *  // or
 *  result = functions.hypot("age", col2);
 *  // or
 *  result = functions.hypot("age", "expense");
 *  // or
 *  result = functions.hypot(col1, 2.0);
 *  // or
 *  result = functions.hypot("age", 2.0);
 *  // or
 *  result = functions.hypot(2.0, col2);
 *  // or
 *  result = functions.hypot(2.0, "expense");
 *  	
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column} 
 */
functions.hypot = function(left,right) {
   var l_uw = Utils.unwrapObject(left);
   var r_uw = Utils.unwrapObject(right);
   var javaObject = org.apache.spark.sql.functions.hypot(l_uw,r_uw);
   return new Column(javaObject);
}


/**
 * Returns the least value of the list of values, skipping null values.
 * This function takes at least 2 parameters. It will return null iff all parameters are null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} columnExpr, ...columnExpr or columnName, ...columnName
 * @returns {Column} 
 */
functions.least = function(exprs) {
	/*
	 * Create a argument list we can send to Java
	 */
	var args = Array.prototype.slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		var o = args[i];
		if (!(o instanceof Column)) {
			// must name column name
			o = new Column(o);
		}
		args[i] = Utils.unwrapObject(o);
	}
	var javaObject = org.apache.spark.sql.functions.least(args);
	return new Column(javaObject);
}


/**
 * Computes the natural logarithm of the given column.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string}
 * @param {float} base Optional, Returns the first argument-base logarithm for the column
 * @returns {Column} 
 */
functions.log = function(col, base) {
	var e_uw = Utils.unwrapObject(col);
	var javaObject;
	if (base) {
		javaObject = org.apache.spark.sql.functions.log(e_uw, base)
	} else {
		javaObject = org.apache.spark.sql.functions.log(e_uw)
	}  
	return new Column(javaObject);
}


/**
 * Computes the logarithm of the given value in base 10.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.log10 = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.log10(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the natural logarithm of the given value plus one.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.log1p = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.log1p(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the logarithm of the given column in base 2.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.log2 = function(col) {
   var expr_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.log2(expr_uw);
   return new Column(javaObject);
}


/**
 * Returns the value of the first argument raised to the power of the second argument.
 *
 * @example
 * var col1 = new Column("age");
 * var col2 = new Column("expense");
 * var result = functions.atan2(col1, col2);
 *  // or
 *  result = functions.pow(col1, "name");
 *  // or
 *  result = functions.pow("age", col2);
 *  // or
 *  result = functions.pow("age", "expense");
 *  // or
 *  result = functions.pow(col1, 2.0);
 *  // or
 *  result = functions.pow("age", 2.0);
 *  // or
 *  result = functions.pow(2.0, col2);
 *  // or
 *  result = functions.pow(2.0, "expense");
 *  	
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string | float} left
 * @param {Column | string | float} right
 * @returns {Column} 
 */
functions.pow = function(l,r) {
   var l_uw = Utils.unwrapObject(l);
   var r_uw = Utils.unwrapObject(r);
   var javaObject = org.apache.spark.sql.functions.pow(l_uw,r_uw);
   return new Column(javaObject);
}


/**
 * Returns the positive value of dividend mod divisor.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} dividend
 * @param {Column} divisor
 * @returns {Column} 
 */
functions.pmod = function(dividend,divisor) {
   var dividend_uw = Utils.unwrapObject(dividend);
   var divisor_uw = Utils.unwrapObject(divisor);
   var javaObject = org.apache.spark.sql.functions.pmod(dividend_uw,divisor_uw);
   return new Column(javaObject);
}


/**
 * Returns the double value that is closest in value to the argument and
 * is equal to a mathematical integer.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.rint = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.rint(e_uw);
   return new Column(javaObject);
}


/**
 * Returns the value of the column `e` rounded to 0 decimal places.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.round = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.round(e_uw);
   return new Column(javaObject);
}


/**
 * Shift the the given value numBits left. If the given value is a long value, this function
 * will return a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @param {integer} numBits
 * @returns {Column} 
 */
functions.shiftLeft = function(e,numBits) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.shiftLeft(e_uw,numBits);
   return new Column(javaObject);
}


/**
 * Shift the the given value numBits right. If the given value is a long value, it will return
 * a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @param {integer} numBits
 * @returns {Column} 
 */
functions.shiftRight = function(e,numBits) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.shiftRight(e_uw,numBits);
   return new Column(javaObject);
}


/**
 * Unsigned shift the the given value numBits right. If the given value is a long value,
 * it will return a long value else it will return an integer value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @param {integer} numBits
 * @returns {Column} 
 */
functions.shiftRightUnsigned = function(e,numBits) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.shiftRightUnsigned(e_uw,numBits);
   return new Column(javaObject);
}


/**
 * Computes the signum of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.signum = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.signum(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the sine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.sin = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.sin(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the hyperbolic sine of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.sinh = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.sinh(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the tangent of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.tan = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.tan(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the hyperbolic tangent of the given value.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.tanh = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.tanh(e_uw);
   return new Column(javaObject);
}


/**
 * Converts an angle measured in radians to an approximately equivalent angle measured in degrees.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.toDegrees = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.toDegrees(e_uw);
   return new Column(javaObject);
}


/**
 * Converts an angle measured in degrees to an approximately equivalent angle measured in radians.
 *
 * @since EclairJS 0.1 Spark  1.4.0
 * @param {Column | string} col
 * @returns {Column} 
 */
functions.toRadians = function(col) {
   var e_uw = Utils.unwrapObject(col);
   var javaObject = org.apache.spark.sql.functions.toRadians(e_uw);
   return new Column(javaObject);
}


/**
 * Calculates the MD5 digest of a binary column and returns the value
 * as a 32 character hex string.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.md5 = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.md5(e_uw);
   return new Column(javaObject);
}


/**
 * Calculates the SHA-1 digest of a binary column and returns the value
 * as a 40 character hex string.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.sha1 = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.sha1(e_uw);
   return new Column(javaObject);
}


/**
 * Calculates the SHA-2 family of hash functions of a binary column and
 * returns the value as a hex string.
 *
 * @param {Column} e  column to compute SHA-2 on.
 * @param {number} numBits  one of 224, 256, 384, or 512.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.sha2 = function(e,numBits) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.sha2(e_uw,numBits);
   return new Column(javaObject);
}


/**
 * Calculates the cyclic redundancy check value  (CRC32) of a binary column and
 * returns the value as a bigint.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.crc32 = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.crc32(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the numeric value of the first character of the string column, and returns the
 * result as a int column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.ascii = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.ascii(e_uw);
   return new Column(javaObject);
}


/**
 * Computes the BASE64 encoding of a binary column and returns it as a string column.
 * This is the reverse of unbase64.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @param {Column} e
 * @returns {Column} 
 */
functions.base64 = function(e) {
   var e_uw = Utils.unwrapObject(e);
   var javaObject = org.apache.spark.sql.functions.base64(e_uw);
   return new Column(javaObject);
}


/**
 * Concatenates multiple input string columns together into a single string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.concat = function(exprs) {
throw "not implemented by ElairJS";
//   var exprs_uw = Utils.unwrapObject(exprs);
//   var javaObject = org.apache.spark.sql.functions.concat(exprs_uw);
//   return new Column(javaObject);
}


/**
 * Concatenates multiple input string columns together into a single string column,
 * using the given separator.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.concat_ws = function(sep,exprs) {
throw "not implemented by ElairJS";
//   var exprs_uw = Utils.unwrapObject(exprs);
//   var javaObject = org.apache.spark.sql.functions.concat_ws(sep,exprs_uw);
//   return new Column(javaObject);
}


/**
 * Computes the first argument into a string from a binary using the provided character set
 * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
 * If either argument is null, the result will also be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.decode = function(value,charset) {
throw "not implemented by ElairJS";
//   var value_uw = Utils.unwrapObject(value);
//   var javaObject = org.apache.spark.sql.functions.decode(value_uw,charset);
//   return new Column(javaObject);
}


/**
 * Computes the first argument into a binary from a string using the provided character set
 * (one of 'US-ASCII', 'ISO-8859-1', 'UTF-8', 'UTF-16BE', 'UTF-16LE', 'UTF-16').
 * If either argument is null, the result will also be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.encode = function(value,charset) {
throw "not implemented by ElairJS";
//   var value_uw = Utils.unwrapObject(value);
//   var javaObject = org.apache.spark.sql.functions.encode(value_uw,charset);
//   return new Column(javaObject);
}


/**
 * Formats numeric column x to a format like '#,###,###.##', rounded to d decimal places,
 * and returns the result as a string column.
 *
 * If d is 0, the result has no decimal point or fractional part.
 * If d < 0, the result will be null.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.format_number = function(x,d) {
throw "not implemented by ElairJS";
//   var x_uw = Utils.unwrapObject(x);
//   var javaObject = org.apache.spark.sql.functions.format_number(x_uw,d);
//   return new Column(javaObject);
}


/**
 * Formats the arguments in printf-style and returns the result as a string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.format_string = function(format,arguments) {
throw "not implemented by ElairJS";
//   var arguments_uw = Utils.unwrapObject(arguments);
//   var javaObject = org.apache.spark.sql.functions.format_string(format,arguments_uw);
//   return new Column(javaObject);
}


/**
 * Returns a new string column by converting the first letter of each word to uppercase.
 * Words are delimited by whitespace.
 *
 * For example, "hello world" will become "Hello World".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.initcap = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.initcap(e_uw);
//   return new Column(javaObject);
}


/**
 * Locate the position of the first occurrence of substr column in the given string.
 * Returns null if either of the arguments are null.
 *
 * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
 * could not be found in str.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.instr = function(str,substring) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.instr(str_uw,substring);
//   return new Column(javaObject);
}


/**
 * Computes the length of a given string or binary column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.length = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.length(e_uw);
//   return new Column(javaObject);
}


/**
 * Converts a string column to lower case.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {Column} 
 */
functions.lower = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.lower(e_uw);
//   return new Column(javaObject);
}


/**
 * Computes the Levenshtein distance of the two given string columns.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.levenshtein = function(l,r) {
throw "not implemented by ElairJS";
//   var l_uw = Utils.unwrapObject(l);
//   var r_uw = Utils.unwrapObject(r);
//   var javaObject = org.apache.spark.sql.functions.levenshtein(l_uw,r_uw);
//   return new Column(javaObject);
}


/**
 * Locate the position of the first occurrence of substr.
 * NOTE: The position is not zero based, but 1 based index, returns 0 if substr
 * could not be found in str.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.locate = function(substr,str) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.locate(substr,str_uw);
//   return new Column(javaObject);
}


/**
 * Locate the position of the first occurrence of substr in a string column, after position pos.
 *
 * NOTE: The position is not zero based, but 1 based index. returns 0 if substr
 * could not be found in str.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.locatewithPos = function(substr,str,pos) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.locate(substr,str_uw,pos);
//   return new Column(javaObject);
}


/**
 * Left-pad the string column with
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.lpad = function(str,len,pad) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.lpad(str_uw,len,pad);
//   return new Column(javaObject);
}


/**
 * Trim the spaces from left end for the specified string value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.ltrim = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.ltrim(e_uw);
//   return new Column(javaObject);
}


/**
 * Extract a specific(idx) group identified by a java regex, from the specified string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.regexp_extract = function(e,exp,groupIdx) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.regexp_extract(e_uw,exp,groupIdx);
//   return new Column(javaObject);
}


/**
 * Replace all substrings of the specified string value that match regexp with rep.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.regexp_replace = function(e,pattern,replacement) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.regexp_replace(e_uw,pattern,replacement);
//   return new Column(javaObject);
}


/**
 * Decodes a BASE64 encoded string column and returns it as a binary column.
 * This is the reverse of base64.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.unbase64 = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.unbase64(e_uw);
//   return new Column(javaObject);
}


/**
 * Right-padded with pad to a length of len.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.rpad = function(str,len,pad) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.rpad(str_uw,len,pad);
//   return new Column(javaObject);
}


/**
 * Repeats a string column n times, and returns it as a new string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.repeat = function(str,n) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.repeat(str_uw,n);
//   return new Column(javaObject);
}


/**
 * Reverses the string column and returns it as a new string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.reverse = function(str) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.reverse(str_uw);
//   return new Column(javaObject);
}


/**
 * Trim the spaces from right end for the specified string value.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.rtrim = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.rtrim(e_uw);
//   return new Column(javaObject);
}


/**
 * * Return the soundex code for the specified expression.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.soundex = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.soundex(e_uw);
//   return new Column(javaObject);
}


/**
 * Splits str around pattern (pattern is a regular expression).
 * NOTE: pattern is a string represent the regular expression.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.split = function(str,pattern) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.split(str_uw,pattern);
//   return new Column(javaObject);
}


/**
 * Substring starts at `pos` and is of length `len` when str is String type or
 * returns the slice of byte array that starts at `pos` in byte and is of length `len`
 * when str is Binary type
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.substring = function(str,pos,len) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.substring(str_uw,pos,len);
//   return new Column(javaObject);
}


/**
 * Returns the substring from string str before count occurrences of the delimiter delim.
 * If count is positive, everything the left of the final delimiter (counting from left) is
 * returned. If count is negative, every to the right of the final delimiter (counting from the
 * right) is returned. substring_index performs a case-sensitive match when searching for delim.
 *
 * @returns {Column} 
 */
functions.substring_index = function(str,delim,count) {
throw "not implemented by ElairJS";
//   var str_uw = Utils.unwrapObject(str);
//   var javaObject = org.apache.spark.sql.functions.substring_index(str_uw,delim,count);
//   return new Column(javaObject);
}


/**
 * Translate any character in the src by a character in replaceString.
 * The characters in replaceString is corresponding to the characters in matchingString.
 * The translate will happen when any character in the string matching with the character
 * in the matchingString.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.translate = function(src,matchingString,replaceString) {
throw "not implemented by ElairJS";
//   var src_uw = Utils.unwrapObject(src);
//   var javaObject = org.apache.spark.sql.functions.translate(src_uw,matchingString,replaceString);
//   return new Column(javaObject);
}


/**
 * Trim the spaces from both ends for the specified string column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.trim = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.trim(e_uw);
//   return new Column(javaObject);
}


/**
 * Converts a string column to upper case.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {Column} 
 */
functions.upper = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.upper(e_uw);
//   return new Column(javaObject);
}


/**
 * Returns the date that is numMonths after startDate.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.add_months = function(startDate,numMonths) {
throw "not implemented by ElairJS";
//   var startDate_uw = Utils.unwrapObject(startDate);
//   var javaObject = org.apache.spark.sql.functions.add_months(startDate_uw,numMonths);
//   return new Column(javaObject);
}


/**
 * Returns the current date as a date column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.current_date = function() {
throw "not implemented by ElairJS";
//   var javaObject = org.apache.spark.sql.functions.current_date();
//   return new Column(javaObject);
}


/**
 * Returns the current timestamp as a timestamp column.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.current_timestamp = function() {
throw "not implemented by ElairJS";
//   var javaObject = org.apache.spark.sql.functions.current_timestamp();
//   return new Column(javaObject);
}


/**
 * Converts a date/timestamp/string to a value of string in the format specified by the date
 * format given by the second argument.
 *
 * A pattern could be for instance `dd.MM.yyyy` and could return a string like '18.03.1993'. All
 * pattern letters of {@link SimpleDateFormat} can be used.
 *
 * NOTE: Use when ever possible specialized functions like {@link year}. These benefit from a
 * specialized implementation.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.date_format = function(dateExpr,format) {
throw "not implemented by ElairJS";
//   var dateExpr_uw = Utils.unwrapObject(dateExpr);
//   var javaObject = org.apache.spark.sql.functions.date_format(dateExpr_uw,format);
//   return new Column(javaObject);
}


/**
 * Returns the date that is `days` days after `start`
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.date_add = function(start,days) {
throw "not implemented by ElairJS";
//   var start_uw = Utils.unwrapObject(start);
//   var javaObject = org.apache.spark.sql.functions.date_add(start_uw,days);
//   return new Column(javaObject);
}


/**
 * Returns the date that is `days` days before `start`
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.date_sub = function(start,days) {
throw "not implemented by ElairJS";
//   var start_uw = Utils.unwrapObject(start);
//   var javaObject = org.apache.spark.sql.functions.date_sub(start_uw,days);
//   return new Column(javaObject);
}


/**
 * Returns the number of days from `start` to `end`.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.datediff = function(end,start) {
throw "not implemented by ElairJS";
//   var end_uw = Utils.unwrapObject(end);
//   var start_uw = Utils.unwrapObject(start);
//   var javaObject = org.apache.spark.sql.functions.datediff(end_uw,start_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the year as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.year = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.year(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the quarter as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.quarter = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.quarter(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the month as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.month = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.month(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the day of the month as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.dayofmonth = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.dayofmonth(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the day of the year as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.dayofyear = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.dayofyear(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the hours as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.hour = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.hour(e_uw);
//   return new Column(javaObject);
}


/**
 * Given a date column, returns the last day of the month which the given date belongs to.
 * For example, input "2015-07-27" returns "2015-07-31" since July 31 is the last day of the
 * month in July 2015.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.last_day = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.last_day(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the minutes as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.minute = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.minute(e_uw);
//   return new Column(javaObject);
}



functions.months_between = function(date1,date2) {
throw "not implemented by ElairJS";
//   var date1_uw = Utils.unwrapObject(date1);
//   var date2_uw = Utils.unwrapObject(date2);
//   var javaObject = org.apache.spark.sql.functions.months_between(date1_uw,date2_uw);
//   return new Column(javaObject);
}


/**
 * Given a date column, returns the first date which is later than the value of the date column
 * that is on the specified day of the week.
 *
 * For example, `next_day('2015-07-27', "Sunday")` returns 2015-08-02 because that is the first
 * Sunday after 2015-07-27.
 *
 * Day of the week parameter is case insensitive, and accepts:
 * "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun".
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.next_day = function(date,dayOfWeek) {
throw "not implemented by ElairJS";
//   var date_uw = Utils.unwrapObject(date);
//   var javaObject = org.apache.spark.sql.functions.next_day(date_uw,dayOfWeek);
//   return new Column(javaObject);
}


/**
 * Extracts the seconds as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.second = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.second(e_uw);
//   return new Column(javaObject);
}


/**
 * Extracts the week number as an integer from a given date/timestamp/string.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.weekofyear = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.weekofyear(e_uw);
//   return new Column(javaObject);
}


/**
 * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
 * representing the timestamp of that moment in the current system time zone in the given
 * format.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.from_unixtime = function(ut) {
throw "not implemented by ElairJS";
//   var ut_uw = Utils.unwrapObject(ut);
//   var javaObject = org.apache.spark.sql.functions.from_unixtime(ut_uw);
//   return new Column(javaObject);
}


/**
 * Converts the number of seconds from unix epoch (1970-01-01 00:00:00 UTC) to a string
 * representing the timestamp of that moment in the current system time zone in the given
 * format.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.from_unixtimewithF = function(ut,f) {
throw "not implemented by ElairJS";
//   var ut_uw = Utils.unwrapObject(ut);
//   var javaObject = org.apache.spark.sql.functions.from_unixtime(ut_uw,f);
//   return new Column(javaObject);
}


/**
 * Gets current Unix timestamp in seconds.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.unix_timestamp0 = function() {
throw "not implemented by ElairJS";
//   var javaObject = org.apache.spark.sql.functions.unix_timestamp();
//   return new Column(javaObject);
}


/**
 * Converts time string in format yyyy-MM-dd HH:mm:ss to Unix timestamp (in seconds),
 * using the default timezone and the default locale, return null if fail.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.unix_timestamp1 = function(s) {
throw "not implemented by ElairJS";
//   var s_uw = Utils.unwrapObject(s);
//   var javaObject = org.apache.spark.sql.functions.unix_timestamp(s_uw);
//   return new Column(javaObject);
}


/**
 * Convert time string with given pattern
 * (see [http://docs.oracle.com/javase/tutorial/i18n/format/simpleDateFormat.html])
 * to Unix time stamp (in seconds), return null if fail.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.unix_timestamp2 = function(s,p) {
throw "not implemented by ElairJS";
//   var s_uw = Utils.unwrapObject(s);
//   var javaObject = org.apache.spark.sql.functions.unix_timestamp(s_uw,p);
//   return new Column(javaObject);
}


/**
 * Converts the column into DateType.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.to_date = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.to_date(e_uw);
//   return new Column(javaObject);
}


/**
 * Returns date truncated to the unit specified by the format.
 *
 * @param {string} format : 'year', 'yyyy', 'yy' for truncate by year,
 *               or 'month', 'mon', 'mm' for truncate by month
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.trunc = function(date,format) {
throw "not implemented by ElairJS";
//   var date_uw = Utils.unwrapObject(date);
//   var javaObject = org.apache.spark.sql.functions.trunc(date_uw,format);
//   return new Column(javaObject);
}


/**
 * Assumes given timestamp is UTC and converts to given timezone.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.from_utc_timestamp = function(ts,tz) {
throw "not implemented by ElairJS";
//   var ts_uw = Utils.unwrapObject(ts);
//   var javaObject = org.apache.spark.sql.functions.from_utc_timestamp(ts_uw,tz);
//   return new Column(javaObject);
}


/**
 * Assumes given timestamp is in given timezone and converts to UTC.
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.to_utc_timestamp = function(ts,tz) {
throw "not implemented by ElairJS";
//   var ts_uw = Utils.unwrapObject(ts);
//   var javaObject = org.apache.spark.sql.functions.to_utc_timestamp(ts_uw,tz);
//   return new Column(javaObject);
}


/**
 * Returns true if the array contain the value
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.array_contains = function(column,value) {
throw "not implemented by ElairJS";
//   var column_uw = Utils.unwrapObject(column);
//   var javaObject = org.apache.spark.sql.functions.array_contains(column_uw,value);
//   return new Column(javaObject);
}


/**
 * Creates a new row for each element in the given array or map column.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {Column} 
 */
functions.explode = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.explode(e_uw);
//   return new Column(javaObject);
}


/**
 * Returns length of array or map.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.size = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.size(e_uw);
//   return new Column(javaObject);
}


/**
 * Sorts the input array for the given column in ascending order,
 * according to the natural ordering of the array elements.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.sort_array = function(e) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.sort_array(e_uw);
//   return new Column(javaObject);
}


/**
 * Sorts the input array for the given column in ascending / descending order,
 * according to the natural ordering of the array elements.
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.sort_arraywithAsc = function(e,asc) {
throw "not implemented by ElairJS";
//   var e_uw = Utils.unwrapObject(e);
//   var javaObject = org.apache.spark.sql.functions.sort_array(e_uw,asc);
//   return new Column(javaObject);
}


/**
 * Defines a user-defined function of 0 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf0 = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject = org.apache.spark.sql.functions.udf(fn);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 1 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf1 = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject = org.apache.spark.sql.functions.udf(fn);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 2 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf2 = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject = org.apache.spark.sql.functions.udf(fn);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 3 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf3 = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject = org.apache.spark.sql.functions.udf(fn);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 4 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf4 = function(f) {
throw "not implemented by ElairJS";
//   var sv = Utils.createJavaParams(f);
//   var fn = new org.eclairjs.nashorn.JSFunction(sv.funcStr, sv.scopeVars);
//   var javaObject = org.apache.spark.sql.functions.udf(fn);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 5 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf5 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 6 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf6 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 7 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf7 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 8 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf8 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 9 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf9 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Defines a user-defined function of 10 arguments as user-defined function (UDF).
 * The data types are automatically inferred based on the function's signature.
 *
 * @since EclairJS 0.1 Spark  1.3.0
 * @returns {UserDefinedFunction} 
 */
functions.udf10 = function(f) {
throw "not implemented by ElairJS";
//   var f_uw = Utils.unwrapObject(f);
//   var javaObject = org.apache.spark.sql.functions.udf(f_uw);
//   return new UserDefinedFunction(javaObject);
}


/**
 * Call an user-defined function.
 * Example:
 * @example
 *  import org.apache.spark.sql._
 *
 *  val df = Seq(("id1", 1), ("id2", 4), ("id3", 5)).toDF("id", "value")
 *  val sqlContext = df.sqlContext
 *  sqlContext.udf.register("simpleUDF", (v: Int) => v * v)
 *  df.select($"id", callUDF("simpleUDF", $"value"))
 *  
 *
 * @since EclairJS 0.1 Spark  1.5.0
 * @returns {Column} 
 */
functions.callUDF = function(udfName,cols) {
throw "not implemented by ElairJS";
//   var cols_uw = Utils.unwrapObject(cols);
//   var javaObject = org.apache.spark.sql.functions.callUDF(udfName,cols_uw);
//   return new Column(javaObject);
}