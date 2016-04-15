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

var EclairJS_Globals = {
    NAMESPACE: 'eclairjs'
};

function Utils_invoke(func) {
    var fn = eval(func);
    var a = Array.prototype.slice.call(arguments);
    var args = (arguments.length > 1)
        ? a.slice(1).map(function (arg) {
        return Serialize.javaToJs(arg);
    })
        : [];

    var ret = null;
    try {
        ret = Serialize.jsToJava(fn.apply(this, args));
    } catch (err) {
        print("error invoking function");
        print(func);
        print(err);
        throw err;
    }

    return ret;
};