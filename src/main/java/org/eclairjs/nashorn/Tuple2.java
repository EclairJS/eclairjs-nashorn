package org.eclairjs.nashorn;/*
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

public class Tuple2 {
    private scala.Tuple2 scalaTuple2 = null;
    public Tuple2(scala.Tuple2 t2) {
        this.scalaTuple2 = t2;
    }
    public scala.Tuple2 getJavaObject() {
        return this.scalaTuple2;
    }
    public Object _1 () {
        return this.scalaTuple2._1();
    }
    public Object _2 () {
        return this.scalaTuple2._2();
    }
}
