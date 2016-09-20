var StorageLevel = require(EclairJS_Globals.NAMESPACE + '/storage/StorageLevel');
var SparkContext = require(EclairJS_Globals.NAMESPACE + '/SparkContext');
var sparkContext = new SparkContext();
var rdd = sparkContext.parallelize([1, 2, 3]);
load("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.9.0/lodash.min.js");



tests({


    version : function() {
        var ver= sparkContext.version();
        assertEquals("failure - strings are not equal", "EclairJS-nashorn 0.7-SNAPSHOT Spark 1.6.0", ver);

    },

    testCollect : function () {
        var collected=  JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure collect - arrays are not equal", expected, collected);
    },

    testAggregate : function() {
        var rddString = sparkContext.parallelize(["1","2","3","4"]);
        var zeroValue = 0.0;
        var ret = rddString.aggregate(zeroValue, function(a, b) {
            return parseInt(b, 10) + parseInt(a, 10);
        }, function (x, y) {
            return x + y;
        });
        assertEquals("failure aggregate - objects are not equal", "10", ret.toString());
    },

    testCache : function() {
        var rdd2 = rdd.cache();
        var ret= JSON.stringify(rdd2.collect());
        var expected = "[1,2,3]";
        assertEquals("failure cache - arrays are not equal", expected, ret);

    },


    testCartesian : function() {
        var rdd2 = sparkContext.parallelize([2, 4]);
        var rdd3 = rdd.cartesian(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[{\"0\":1,\"1\":2,\"length\":2},{\"0\":1,\"1\":4,\"length\":2},{\"0\":2,\"1\":2,\"length\":2}," +
            "{\"0\":2,\"1\":4,\"length\":2},{\"0\":3,\"1\":2,\"length\":2},{\"0\":3,\"1\":4,\"length\":2}]";
        assertTrue("failure cartesian - arrays are not equal",
        		!_.differenceWith(JSON.parse(ret), JSON.parse(expected), _.isEqual).length);
    },

    testCoalesce : function() {
        var rdd2 = rdd.coalesce(1,true);
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[1,2,3]";
        assertEquals("failure coalesce - arrays are not equal", expected, ret);
    },


    testCollectWithFunc : function() {
        // Test collect(func) - throws TypeError: Can not invoke method with the passed aeguments;
        // they do not match any of its method signatures - looks like we need to implement
        // a JS version of scala.PartialFunction if we want this to work.
//		var ret = JSON.stringify(rdd.collect(function(i){return i===2}));
        //var expected = "[2]";
        //assertEquals("failure collectwithFunc - arrays are not equal", expected, ret);
    },

    testContext : function() {
        var context = {"sc": rdd.context()}
        var ret = JSON.stringify(context);
        print("ret " + ret)
        var expectedClass = "{\"sc\":{\"version\":\"EclairJS-nashorn 0.7-SNAPSHOT Spark 1.6.0\",\"appName\":\"testapp\",\"master\":\"local[*]\"}}";
        assertEquals("failure - not an instance of SparkContext", expectedClass, ret);
    },

    testCount : function() {
        var ret = Number(rdd.count());
        var expected = 3;
        assertIntegerEquals("failure - counts are not equal", expected, ret);
    },

    testCountApprox : function() {
        // Need to implement PartialResult
        //rdd.countApprox(1000,1).onComplete(function(res){
        //  return JSON.stringify(res);
        //});
// Test countApprox(timeout,confidence) - need to implement PartialResult
//		var ret = JSON.stringify(rdd.countApprox(1000,1).getFinalValue());
// 		var expected = "3";
//		assertEquals("failure - counts are not equal", expected, ret);
    },

    testCountApproxDistinct : function() {
        var ret = Number(rdd.countApproxDistinct(0.1));
        var expected = 3;
        assertIntegerEquals("failure - counts are not equal", expected, ret);
    },

    testDistinct : function() {
        var rdd2 = rdd.distinct();
        var ret = rdd2.collect();
        var expected = [1,2,3];
        assertTrue("failure distinct - arrays are not equal",
        		!_.difference(ret, expected).length);
    },

    testFilter : function() {
        var rdd2 = rdd.filter(function(num){return num===2});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2]";
        assertEquals("failure filter - arrays are not equal", expected, ret);
    },

    testFirst : function() {
        var ret = JSON.stringify(rdd.first());
        var expected = "1";
        assertEquals("failure - first elements are not equal", expected, ret);
    },

    testFlatMap : function() {
        var rdd2 = rdd.flatMap(function(num){return [num+1]});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2,3,4]";
        assertEquals("failure flatMap - arrays are not equal", expected, ret);
    },

    testFold : function() {
        var rdd2 = sparkContext.parallelize([1,2]);
        var zeroRdd = 0;
        var ret = JSON.stringify(rdd2.fold(zeroRdd, function(t1,t2){return t1 + t2}));
        var expected = "3";
        assertEquals("failure fold - objects are not equal", expected, ret);
    },

    testForeach : function() {
        rdd.foreach(function(num){print('doing foreach '+num)});
        var ret = JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure foreach - arrays are not equal", expected, ret);
    },

    testForeachPartition : function() {
        rdd.foreachPartition(function(partitionOfRecs) {
            for (var i=0; i<partitionOfRecs.length; i++) {
                print('doing foreachPartition '+partitionOfRecs[i]);
            }
        });
        var ret = JSON.stringify(rdd.collect());
        var expected = "[1,2,3]";
        assertEquals("failure foreachPartition - arrays are not equal", expected, ret);
    },

    testGetStorageLevel : function() {
        var ret = JSON.stringify(rdd.getStorageLevel());
        var expected = "{\"useDisk\":false,\"useMemory\":true,\"useOffHeap\":false,\"replication\":1}";
        assertContains("failure - StorageLevel", ret, expected);
    },

    testGlom : function() {
        var rdd1 = sparkContext.parallelize([1,2,3,4], 2);
        var rdd2 = rdd1.glom();
        var ret = rdd2.collect();
        var expected = "[[1,2],[3,4]]";
        assertEquals("failure glom - arrays are not equal", expected, JSON.stringify(ret));
    },

    testGroupBy : function() {
    	var rdd2 = rdd.groupBy(function(num){ return num; });
        var ret = rdd2.collect();
        var expected = [{"0":1,"1":[1],"length":2},{"0":2,"1":[2],"length":2},{"0":3,"1":[3],"length":2}];
        assertTrue("failure groupBy - arrays are not equal",
        		_.differenceWith(ret, expected, _.isEqual).length);
    },

    testId : function() {
        var ret = rdd.id();
    },

    testIntersection : function() {
    	var rdd2 = sparkContext.parallelize([1,2,4]);
        var rdd3 = rdd.intersection(rdd2);
        var ret = rdd3.collect();
        var expected = [1, 2];
        assertTrue("failure intersection - arrays are not equal",
        		!_.difference(ret, expected).length);
    },

    testIsEmpty : function() {
        var ret = rdd.isEmpty();
        assertFalse("failure - should not be empty", ret);
    },

    testKeyBy : function() {
        var rdd2 = rdd.keyBy(function(num){return num});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[{\"0\":1,\"1\":1,\"length\":2},{\"0\":2,\"1\":2,\"length\":2},{\"0\":3,\"1\":3,\"length\":2}]";
        assertEquals("failure keyBy - arrays are not equal", expected, ret);
    },

    testMap : function() {
        var rdd2 = rdd.map(function(num){return num*2});
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[2,4,6]";
        assertEquals("failure map - arrays are not equal", expected, ret);
    },

    testMapPartitions : function() {
        // Test mapPartitions(func) - not quite sure how to test
//		var rdd2 = rdd.mapPartitions(function(partitionOfRecs) {
//			for (var i=0; i<partitionOfRecs.length; i++) {
//				print('doing mapPartiition '+partitionOfRecs[i]);
//				//partitionOfRecs[i]++;
//			}
//			return partitionOfRecs;
//		});
//		var ret = JSON.stringify(rdd2.collect());
//        var expected = "[2,3,4]";
//        assertEquals("failure mapPartitions - arrays are not equal", expected, ret);
    },

    testMapToPair : function() {
        var Tuple2 = require(EclairJS_Globals.NAMESPACE +'/Tuple2');
        var rdd2 = rdd.mapToPair(function(num, Tuple2) {return new Tuple2(num,num+1)},[Tuple2]);
        var ret = JSON.stringify(rdd2.collect());
        var expected = "[{\"0\":1,\"1\":2,\"length\":2},{\"0\":2,\"1\":3,\"length\":2},{\"0\":3,\"1\":4,\"length\":2}]";
        assertEquals("failure mapToPair - arrays are not equal", expected, ret);
    },

    testMax : function() {
        var ret = rdd.max(function(a,b){return (a < b ? -1 : (a > b ? 1 : 0))});
        var expected = 3;
        assertIntegerEquals("failure should be max value", expected, ret);
    },

    testMin : function() {
        var ret = rdd.min(function(a,b){
            var res = (b < a) ? 1 : (b > a) ? -1 : 0;
            return (b < a ? 1 : (b > a ? -1 : 0))
        });

        var expected = 1; // Should be "1" but pass it for now
        assertIntegerEquals("failure should be min value", expected, ret);
    },

    testName : function() {
        rdd.setName("HelloRDD");
        var ret = rdd.name();
        var expected = "HelloRDD";
        assertEquals("failure name should be set", expected, ret);
    },

    testReduce : function() {
        var rdd2 = sparkContext.parallelize([1,2,3]);
        var ret = JSON.stringify(rdd2.reduce(function(a,b) {return a+b}));
        var expected = "6";
        assertEquals("failure reduce - arrays are not equal", expected, ret);
    },

    testSubtract : function() {
        var rdd2 = sparkContext.parallelize([2]);
        var rdd3 = rdd.subtract(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[1,3]";
        assertEquals("failure subtract - arrays are not equal", expected, ret);
    },

    testTake : function() {
        var ret = JSON.stringify(rdd.take(2));
        var expected = "[1,2]";
        assertEquals("failure take - arrays are not equal", expected, ret);
    },

    testToArray : function() {
        var ret = JSON.stringify(rdd.toArray());
        var expected = "[1,2,3]";
        assertEquals("failure toArray - arrays are not equal", expected, ret);
    },

    testToDebugString : function() {
        var ret = rdd.toDebugString();
        var expected = "HelloRDD ParallelCollectionRDD";
        assertContains("failure toDebugString - does not contain proper info", ret, expected);
    },

    testUnion : function() {
        var rdd2 = sparkContext.parallelize([2,3,4]);
        var rdd3 = rdd.union(rdd2);
        var ret = JSON.stringify(rdd3.collect());
        var expected = "[1,2,3,2,3,4]";
        assertEquals("failure union - arrays are not equal", expected, ret);
    },

    testZip : function() {
        var rdd2 = sparkContext.parallelize([4,5,6]);
        var rdd3 = rdd.zip(rdd2);
        var ret = JSON.stringify(rdd3.collect());
    },

    testZipPartitions : function() {
        var rdd1 = sparkContext.parallelize([1,2,3,4], 2);
        var rdd2 = sparkContext.parallelize([4,5,6,7], 2);
        var rdd3 = rdd1.zipPartitions(rdd2,function(a,b) {
            var ret = [];
            for(var i = 0; i<a.length; i++) {
                ret.push([a[i], b[i]])
            }

            return ret;
        });
        var ret = rdd3.collect();
        var expected = "[[1,4],[2,5],[3,6],[4,7]]"
        assertEquals("failure zipPartitions - arrays are not equal", expected, JSON.stringify(ret));

    },


    testHashPartitioner : function() {
        var HashPartitioner = require(EclairJS_Globals.NAMESPACE + '/HashPartitioner');
        var p2 = new HashPartitioner(2)
        var p4 = new HashPartitioner(4)
        var anotherP4 = new HashPartitioner(4)
        assertTrue(p2.equals(p2))
        assertTrue(p4.equals(p4))
        assertFalse(p2.equals(p4))
        assertFalse(p4.equals(p2))
        assertTrue(p4.equals(anotherP4))
    },


    LAST:true
});

