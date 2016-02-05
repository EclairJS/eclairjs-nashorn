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



/**
 * :: Experimental ::
 * Used to convert a JVM object of type `T` to and from the internal Spark SQL representation.
 *
 * == Scala ==
 * Encoders are generally created automatically through implicits from a `SQLContext`.
 *
 * @example 
 *   import sqlContext.implicits._
 *
 *   val ds = Seq(1, 2, 3).toDS() // implicitly provided (sqlContext.implicits.newIntEncoder)
 *  
 *
 * == Java ==
 * Encoders are specified by calling static methods on {@link Encoders}.
 *
 * @example 
 *   List<String> data = Arrays.asList("abc", "abc", "xyz");
 *   Dataset<String> ds = context.createDataset(data, Encoders.STRING());
 *  
 *
 * Encoders can be composed into tuples:
 *
 * @example 
 *   Encoder<Tuple2<Integer, String>> encoder2 = Encoders.tuple(Encoders.INT(), Encoders.STRING());
 *   List<Tuple2<Integer, String>> data2 = Arrays.asList(new scala.Tuple2(1, "a");
 *   Dataset<Tuple2<Integer, String>> ds2 = context.createDataset(data2, encoder2);
 *  
 *
 * Or constructed from Java Beans:
 *
 * @example 
 *   Encoders.bean(MyClass.class);
 *  
 *
 * == Implementation ==
 *  - Encoders are not required to be thread-safe and thus they do not need to use locks to guard
 *    against concurrent access if they reuse internal buffers to improve performance.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @classdesc
 * @interface
 * @abstract
 */


var Encoder = function(jvmObj) {
	this.logger = Logger.getLogger("sql.Encoder_js");
	JavaWrapper.call(this, jvmObj);
}

Encoder.prototype = Object.create(JavaWrapper.prototype);

Encoder.prototype.constructor = Encoder;



/**
 * Returns the schema of encoding this type of object as a Row.
 * @returns {StructType} 
 */
Encoder.prototype.schema = function() {
	return  new StructType(this.getJavaObject().schema());
}


/**
 * Returns the schema of encoding this type of object as a Row.
 * @returns {ClassTag} 
 * @private
 */
Encoder.prototype.clsTag = function() {
throw "not implemented by ElairJS";
//   return  this.getJavaObject().clsTag();
}


var Encoders = {
		logger: Logger.getLogger("sql.Encoders_js")
		};

//
// static methods
//


/**
 * An encoder for nullable boolean type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.BOOLEAN = function() {
	return  new Encoder(org.apache.spark.sql.Encoders.BOOLEAN());
}


/**
 * An encoder for nullable byte type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.BYTE = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.BYTE();
}


/**
 * An encoder for nullable short type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.SHORT = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.SHORT();
}


/**
 * An encoder for nullable int type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.INT = function() {
	return  new Encoder(org.apache.spark.sql.Encoders.INT());
}


/**
 * An encoder for nullable long type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.LONG = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.LONG();
}


/**
 * An encoder for nullable float type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.FLOAT = function() {
	//JavaScript floats are converted to Java Double by nashorn
	return  new Encoder(org.apache.spark.sql.Encoders.DOUBLE());
}


/**
 * An encoder for nullable double type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder}
 * @private 
 */
Encoders.DOUBLE = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.DOUBLE();
}


/**
 * An encoder for nullable string type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.STRING = function() {
	return  new Encoder(org.apache.spark.sql.Encoders.STRING());
}


/**
 * An encoder for nullable decimal type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.DECIMAL = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.DECIMAL();
}


/**
 * An encoder for nullable date type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.DATE = function() {
	return  new Encoder(org.apache.spark.sql.Encoders.DATE());
}


/**
 * An encoder for nullable timestamp type.
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 */
Encoders.TIMESTAMP = function() {
	return  new Encoder(org.apache.spark.sql.Encoders.TIMESTAMP());
}


/**
 * Creates an encoder for Java Bean of type T.
 *
 * T must be publicly accessible.
 *
 * supported types for java bean field:
 *  - primitive types: boolean, int, double, etc.
 *  - boxed types: Boolean, Integer, Double, etc.
 *  - String
 *  - java.math.BigDecimal
 *  - time related: java.sql.Date, java.sql.Timestamp
 *  - collection types: only array and java.util.List currently, map support is in progress
 *  - nested java bean.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Class}
 * @returns {Encoder} 
 * @private
 */
Encoders.bean = function(beanClass) {
throw "not implemented by ElairJS";
//   var beanClass_uw = Utils.unwrapObject(beanClass);
//   return  org.apache.spark.sql.Encoders.bean(beanClass_uw);
}


/**
 * (Scala-specific) Creates an encoder that serializes objects of type T using Kryo.
 * This encoder maps T into a single byte array (binary) field.
 *
 * T must be publicly accessible.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.kryo = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.kryo();
}

/**
 * (Scala-specific) Creates an encoder that serializes objects of type T using generic Java
 * serialization. This encoder maps T into a single byte array (binary) field.
 *
 * Note that this is extremely inefficient and should only be used as the last resort.
 *
 * T must be publicly accessible.
 *
 * @since EclairJS 0.1 Spark  1.6.0
 * @returns {Encoder} 
 * @private
 */
Encoders.javaSerialization = function() {
throw "not implemented by ElairJS";
//   return  org.apache.spark.sql.Encoders.javaSerialization();
}


/**
 * An encoder for 2-ary tuples.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Encoder}
 * @param {Encoder}
 * @returns {Encoder} 
 */
Encoders.tuple0 = function(e1,e2) {
throw "not implemented by ElairJS";
//   var e1_uw = Utils.unwrapObject(e1);
//   var e2_uw = Utils.unwrapObject(e2);
//   return  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw);
}


/**
 * An encoder for 3-ary tuples.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @returns {Encoder} 
 */
Encoders.tuple1 = function(e1,e2,e3) {
throw "not implemented by ElairJS";
//   var e1_uw = Utils.unwrapObject(e1);
//   var e2_uw = Utils.unwrapObject(e2);
//   var e3_uw = Utils.unwrapObject(e3);
//   return  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw);
}


/**
 * An encoder for 4-ary tuples.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @returns {Encoder} 
 */
Encoders.tuple2 = function(e1,e2,e3,e4) {
throw "not implemented by ElairJS";
//   var e1_uw = Utils.unwrapObject(e1);
//   var e2_uw = Utils.unwrapObject(e2);
//   var e3_uw = Utils.unwrapObject(e3);
//   var e4_uw = Utils.unwrapObject(e4);
//   return  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw);
}


/**
 * An encoder for 5-ary tuples.
 * @since EclairJS 0.1 Spark  1.6.0
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @param {Encoder}
 * @returns {Encoder} 
 */
Encoders.tuple3 = function(e1,e2,e3,e4,e5) {
throw "not implemented by ElairJS";
//   var e1_uw = Utils.unwrapObject(e1);
//   var e2_uw = Utils.unwrapObject(e2);
//   var e3_uw = Utils.unwrapObject(e3);
//   var e4_uw = Utils.unwrapObject(e4);
//   var e5_uw = Utils.unwrapObject(e5);
//   return  org.apache.spark.sql.Encoders.tuple(e1_uw,e2_uw,e3_uw,e4_uw,e5_uw);
}
