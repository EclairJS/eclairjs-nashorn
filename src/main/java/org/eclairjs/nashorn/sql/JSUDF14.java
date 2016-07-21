package org.eclairjs.nashorn.sql;/*
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

import org.apache.commons.lang.ArrayUtils;
import org.apache.spark.sql.api.java.UDF14;
import org.eclairjs.nashorn.NashornEngineSingleton;

import javax.script.Invocable;
import javax.script.ScriptEngine;

public class JSUDF14 extends JSUDF implements UDF14 {
    private String func = null;
    private Object args[] = null;
    private Object fn = null;

    public JSUDF14(String func, Object[] o) {
        this.func = func;
        this.args = o;
    }

    @SuppressWarnings({ "null", "unchecked" })
    @Override
    public Object call(Object o, Object o2, Object o3, Object o4,Object o5, Object o6, Object o7, Object o8, Object o9,
                       Object o10, Object o11, Object o12, Object o13, Object o14
                    ) throws Exception {
        ScriptEngine e =  NashornEngineSingleton.getEngine();
        if (this.fn == null) {
            this.fn = e.eval(func);
        }
        Invocable invocable = (Invocable) e;

        Object params[] = {this.fn, o, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14};

        if (this.args != null && this.args.length > 0 ) {
            params = ArrayUtils.addAll(params, this.args);
        }

        Object ret = invocable.invokeFunction("Utils_invoke", params);
        ret = this.castValueToReturnType(ret);
        return ret;
    }


}
