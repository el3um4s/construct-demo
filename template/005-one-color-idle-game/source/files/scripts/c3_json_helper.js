/*
 * c3_json_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.09.08
 *
*/

let json = {};
let jsonObj = {};

function json_initialize(json_name) {
	json[json_name] = g_runtime.objects[json_name].getFirstInstance();
	jsonObj[json_name] = json[json_name].getJsonDataCopy();
}

function json_getKey(json_name, json_key, value_default = 0){
	const obj = jsonObj[json_name];
	
	let result = value_default;
	try {
		result = json_key.split('.').reduce((o,i)=>o[i], obj);
	} catch (e) {
		json_changeKey(json_name, json_key, value_default);
	}
	return result;
}


function json_changeKey(json_name, json_key, value) {
	
	function assegnaValore(objOriginal, key, value) {
  		const clone = { ...objOriginal }
  		clone[key] = value;
  		return clone;
	};
	
	function esisteLaChiave(objOriginal, key) {
   		return key in objOriginal;
	};
	
	function assegnaChiave(objOriginal, key, value) {
		const clone = { ...objOriginal }
		const keyLength = key.length;
		let result = {};

		if (keyLength == 1) {
		  const keyName = key[0];     
		  result = {...clone, ...assegnaValore(clone, keyName, value)};
		} else if (esisteLaChiave(clone, key[0])) {
		  const newKey = key.slice(1);
		  const keyName = key[0];
		  const newClone = {};
		  newClone[keyName] = assegnaChiave(clone[keyName], newKey, value)
		  result = {...clone, ...newClone};
		} else {
		  const newKey = key.slice(1);
		  const keyName = key[0]; 
		  const newClone = {}
		  newClone[keyName] = assegnaChiave({}, newKey, value);
		  result = {...clone, ...newClone};
		}
	  return result
	}
	
	const obj = jsonObj[json_name];
	const key = json_key.split('.')
	const result = assegnaChiave(obj, key, value);
	
// 	console.log('jsonObj[json_name]', jsonObj[json_name]);
// 	console.log('result', result);
	jsonObj[json_name] = { ...result };
// 	console.log('jsonObj[json_name]', jsonObj[json_name]);
	
	json[json_name].setJsonDataCopy(result);
	return result;
}