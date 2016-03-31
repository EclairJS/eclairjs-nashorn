/**
 * Created by billreed on 3/30/16.
 */

var VertexRDDImpl = function(jvmObject) {
    this.logger = Logger.getLogger("VertexRDDImpl_js");
    VertexRDD.call(this, jvmObject);

};

VertexRDDImpl.prototype = Object.create(VertexRDD.prototype);

VertexRDDImpl.prototype.constructor = VertexRDDImpl;

