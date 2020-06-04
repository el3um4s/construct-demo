/*
 * c3_json_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.05.31
 *
*/

let json = {};
let jsonObj = {};

function json_initialize(json_name) {
	json[json_name] = g_runtime.objects[json_name].getFirstInstance();
	jsonObj[json_name] = json[json_name].getJsonDataCopy();
}

function json_getKey(json_name, json_key){
	const result = jsonObj[json_name][json_key];
	return JSON.stringify(result);
}

function json_changeKey(json_name, key, value) {
	jsonObj[json_name][key] = value
	json[json_name].setJsonDataCopy(jsonObj[json_name]);
}
