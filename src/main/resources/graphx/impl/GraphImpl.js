


var GraphImpl = function(jvmObject) {
    this.logger = Logger.getLogger("GraphImpl_js");
    Graph.call(this, jvmObject);

};

GraphImpl.prototype = Object.create(Graph.prototype);

GraphImpl.prototype.constructor = GraphImpl;


