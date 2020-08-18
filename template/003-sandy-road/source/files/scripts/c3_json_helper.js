/*
 * c3_json_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.07.17
 *
*/

let json = {};
let jsonObj = {};

function json_initialize(json_name) {
	json[json_name] = g_runtime.objects[json_name].getFirstInstance();
	jsonObj[json_name] = json[json_name].getJsonDataCopy();
}

function json_getKey(json_name, json_key){
	const obj = jsonObj[json_name];
	const result = json_key.split('.').reduce((o,i)=>o[i], obj);
	return result;
}

function json_changeKey(json_name, key, value) {
	function index(obj, is, value) {
    	if (typeof is == 'string')
        	return index(obj,is.split('.'), value);
    	else if (is.length==1 && value!==undefined)
        	return obj[is[0]] = value;
    	else if (is.length==0)
        	return obj;
    	else
        	return index(obj[is[0]],is.slice(1), value);
	}
	const obj = jsonObj[json_name];
	const result = index(obj, key, value);
	json[json_name].setJsonDataCopy(obj);
	return result;
}
