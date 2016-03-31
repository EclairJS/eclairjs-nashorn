/**
 * Created by billreed on 3/30/16.
 */

var EdgeRDDImpl = function(jvmObject) {
    this.logger = Logger.getLogger("EdgeRDDImpl_js");
    EdgeRDD.call(this, jvmObject);

};

EdgeRDDImpl.prototype = Object.create(EdgeRDD.prototype);

EdgeRDDImpl.prototype.constructor = EdgeRDDImpl;

EdgeRDDImpl.prototype.collect = function(){
    var edges = Utils.javaToJs(this.getJavaObject().collect());
    return edges;

};