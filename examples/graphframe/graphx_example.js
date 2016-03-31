/**
 * Created by billreed on 3/30/16.
 */


var sparkConf = new SparkConf().setAppName("GraphFrames Example");
var ctx = new SparkContext(sparkConf);
var sqlContext = new SQLContext(ctx);


var schema = DataTypes.createStructType([
    DataTypes.createStructField("id", DataTypes.IntegerType, true),
    DataTypes.createStructField("name", DataTypes.StringType, true)
]);

var schema2 = DataTypes.createStructType([
    DataTypes.createStructField("src", DataTypes.IntegerType, true),
    DataTypes.createStructField("dst", DataTypes.IntegerType, true),
    DataTypes.createStructField("action", DataTypes.StringType, true)
]);

var v = sqlContext.createDataFrame([
    RowFactory.create([1,"A"]),
    RowFactory.create([2,"B"]),
    RowFactory.create([3, "C"])
], schema);
print(v)
var vRows = v.collect();
for (var r = 0; r < vRows.length; r++) {
    print("vertices row " + vRows[r]);
}
var e = sqlContext.createDataFrame([
    RowFactory.create([1,2,"love"]),
    RowFactory.create([2,1,"hate"]),
    RowFactory.create([2,3,"follow"])
], schema2);
print(e)

//var gf = new org.graphframes.GraphFrame(Utils.unwrapObject(v), Utils.unwrapObject(e));
var gf = new GraphFrame(v, e);
print(gf);

var dfV = gf.vertices(); // Java DataFrame
print(dfV)
var vRows = dfV.collect(); // Java Rows
for (var r = 0; r < vRows.length; r++) {
    print("vertices row " + vRows[r]);
}

var dfE = gf.edges();
var eRows = dfE.collect();
for (var r = 0; r < eRows.length; r++) {
    print("edge row " + eRows[r]);
}

// Get Graph from GraphFrame
//Graph<Row, Row> g = gf.toGraphX();
var g = gf.toGraphX();
print("GraphX " + g);
//VertexRDD<Row> vertexRow = g.vertices();
var vertexRow = g.vertices();
//List o = vertexRow.toJavaRDD().collect();
//var vertRowRDD = Utils.javaToJs(vertexRow.toJavaRDD());
var o = vertexRow.collect();
for (var i = 0; i < o.length; i++) {
    print("GraphX vertices " + o[i]);
}

// construction from edge DataFrame

var gfEdges = GraphFrame.fromEdges(e);
var edgeV = gfEdges.vertices().collect();
for (var i = 0; i < edgeV.length; i++) {
    print("edgeV vertices " + edgeV[i]);
}