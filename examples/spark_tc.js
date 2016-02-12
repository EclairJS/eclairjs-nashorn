/*
 * Copyright 2016 IBM Corp.
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
////
///   Modified for testing purposes to not have random numbers
///   so the timings are consistent
///

  var numEdges = 100;
  var numVertices = 100;


function random(max) {
	return Math.floor(Math.random() * max);
}


function generateGraph(){
      var edges = [] ;
    while (edges.length < numEdges) {
      var n=edges.length
      var from = n*10;//random(numVertices);
      var to = from+3;//random(numVertices);
      var tuple  = [from, to];
      if (from != to) {
        var found=false;
        for (var t in edges)
        {
          if (t[0]==from && t[1]==to)
            {found=true;break;}
        }
        if (!found)
          edges.push(tuple);
      }
    }
    return  edges ;
}

var conf = new SparkConf().setAppName("JavaScript Transitive closure ").setMaster("local[*]");
var sc = new SparkContext(conf);

var startTime=java.lang.System.currentTimeMillis()/1000;
print("starttime="+startTime);
    var slices = (arguments.length > 0) ? 0+arguments[0]: 2;
    var tc = sc.parallelizePairs(generateGraph(), slices).cache();


// Linear transitive closure: each round grows paths by one edge,
// by joining the graph's edges with the already-discovered paths.
// e.g. join the path (y, z) from the TC with the edge (x, y) from
// the graph to obtain the path (x, z).

// Because join() joins on keys, the edges are stored in reversed order.
var edges = tc.mapToPair(function(tuple) {
	return [tuple[1], tuple[0]];
});


    var oldCount;
    var nextCount = tc.count();
    for (var i=0;i<10;i++) {
      oldCount = nextCount;
      // Perform the join, obtaining an RDD of (y, (z, x)) pairs,
      // then project the result to obtain the new (x, z) paths.
      tc = tc.union(tc.join(edges).mapToPair(function(triple){
        return [triple[1][1],triple[1][0]];
      })).distinct().cache();
      nextCount = tc.count();

    } //while (nextCount != oldCount);

 print("TC has " + tc.count() + " edges.");
var endTime=java.lang.System.currentTimeMillis()/1000;

print("time="+(endTime-startTime));

sc.stop();


