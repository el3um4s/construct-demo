let json = null;
let jsonObj = null;

function json_initialize(json_name) {
	json = g_runtime.objects[json_name].getFirstInstance();
	jsonObj = json.getJsonDataCopy();
}

function json_getKey(json_key){
	const result = jsonObj[json_key];
	return JSON.stringify(result);
}

function json_changeKey(key, value) {
	jsonObj[key] = value
	json.setJsonDataCopy(jsonObj);
}