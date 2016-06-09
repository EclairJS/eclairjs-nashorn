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

public class Tuple3 {
    private scala.Tuple3 scalaTuple3 = null;
    public Tuple3(scala.Tuple3 t2) {
        this.scalaTuple3 = t2;
    }
    public scala.Tuple3 getJavaObject() {
        return this.scalaTuple3;
    }
    public Object _1 () {
        return this.scalaTuple3._1();
    }
    public Object _2 () {
        return this.scalaTuple3._2();
    }
    public Object _3 () {
        return this.scalaTuple3._3();
    }
}
