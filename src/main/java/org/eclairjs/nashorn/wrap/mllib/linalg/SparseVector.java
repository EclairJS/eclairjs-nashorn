package org.eclairjs.nashorn.wrap.mllib.linalg;
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

import org.eclairjs.nashorn.Utils;
import org.eclairjs.nashorn.wrap.WrappedFunction;
import org.eclairjs.nashorn.wrap.mllib.linalg.Vector;


public class SparseVector extends Vector {

    static WrappedFunction F_values = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.SparseVector _vector = (org.apache.spark.mllib.linalg.SparseVector) ((SparseVector) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_vector.values());
            return returnValue;
        }
    };

    static WrappedFunction F_indices = new WrappedFunction() {
        @Override
        public Object call(Object thiz, Object... args) {
            Object returnValue;
            org.apache.spark.mllib.linalg.SparseVector _vector = (org.apache.spark.mllib.linalg.SparseVector) ((SparseVector) thiz).getJavaObject();
            returnValue = Utils.javaToJs(_vector.indices());
            return returnValue;
        }
    };

    private org.apache.spark.mllib.linalg.SparseVector _sparseVector;

    public SparseVector(org.apache.spark.mllib.linalg.SparseVector _sparseVector)
    { this._sparseVector = _sparseVector; }

    static public String getModuleName() {
        return "mllib.linalg.SparseVector";
    }

    public boolean checkInstance(Object other) {
        return other instanceof SparseVector;
    }

    public Object getJavaObject() {
        return _sparseVector;
    }

    @Override
    public String toString() {

        return _sparseVector.toString();
    }

    public String getClassName() {
        return "SparseVector";
    }

    // get the value of that named property
    @Override
    public Object getMember(String name) {
        switch (name) {
            case "values":
                return F_values;
            case "indices":
                return F_indices;

        }
        return super.getMember(name);
    }

    @Override
    public boolean hasMember(String name) {
        switch (name) {
            case "values":
            case "indices":

                return true;
        }
        return super.hasMember(name);
    }

//
// static methods
//

}
