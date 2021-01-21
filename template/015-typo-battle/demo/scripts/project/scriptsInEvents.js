"use strict";

import * as Utils from "./utils.js";
import GameCoordinates from "./gameCoordinates.js"
import * as ManipulateInstance from "./manipulateInstance.js"

{
	const scriptsInEvents = {

		async C3_colors_helper_Event2_Act1(runtime, localVars)
		{
			const uid = localVars.UID;
			const color = localVars.Color;
			const element = g_runtime.getInstanceByUid(uid);
			
			element.colorRgb = hexToRGBA(color, {formatNumber: "0-1 Range", formatReturn: "Array"});
		},

		async C3_colors_helper_Event4_Act1(runtime, localVars)
		{
			const color = localVars.Color;
			const rgb = hexToRGBA(color, {formatNumber: "0-255 Range", formatReturn: "Array"});
			localVars.r = rgb[0];
			localVars.g = rgb[1];
			localVars.b = rgb[2];
		},

		async C3_colors_helper_Event5_Act1(runtime, localVars)
		{
			document.body.style.backgroundColor = localVars.Color;
		},

		async C3_json_helper_Event2_Act1(runtime, localVars)
		{
			const key = localVars.key;
			const json_name = localVars.jsonName;
			const value_default = localVars.value_default;
			const result = json_getKey(json_name, key, value_default);
			runtime.setReturnValue(result);
		},

		async C3_json_helper_Event3_Act1(runtime, localVars)
		{
			const key = localVars.key;
			const value = localVars.value;
			const json_name = localVars.jsonName;
			json_changeKey(json_name, key, value)
		},

		async C3_json_helper_Event4_Act1(runtime, localVars)
		{
			const key = localVars.key;
			const json_name = localVars.jsonName;
			const origin = json_getKey(json_name,key);
			const value = localVars.value;
			const result = parseFloat(origin) + parseFloat(value);
			json_changeKey(json_name, key, result);
		},

		async C3_json_helper_Event5_Act1(runtime, localVars)
		{
			const name = localVars.name;
			json_initialize(name);
		},

		async C3_json_helper_Event6_Act1(runtime, localVars)
		{
			const name = localVars.name;
			const json_base64 = localVars.json_base64;
			json_initialize_fromBase64(name, json_base64);
		},

		async C3_json_helper_Event7_Act1(runtime, localVars)
		{
			const name = localVars.name;
			const result = json_getJSON_asBase64(name);
			runtime.setReturnValue(result);
		},

		async Chars_Event3_Act1(runtime, localVars)
		{
			ManipulateInstance.deleteInstance(localVars.UID);
		},

		async Chars_Event4_Act1(runtime, localVars)
		{
			ManipulateInstance.moveInstanceToDirection(localVars.UID, {direction: localVars.Direction, distance: localVars.Pixels});
		},

		async Keyboard_Event2_Act1(runtime, localVars)
		{
			const key = ManipulateInstance.createInstance("Key");
			const keyBorder = ManipulateInstance.createInstance("Key_Border");
			const keyLabel = ManipulateInstance.createInstance("Key_Label");
			
			key.moveToBottom();
			key.instVars.Key = localVars.Key;
			keyLabel.text = localVars.Key;
			
			
			key.addChild(keyBorder, {transformX: true, transformY: true, transformWidth: true, transformHeight: true, transformAngle: true, transformZElevation: true, destroyWithParent: true});
			key.addChild(keyLabel, {transformX: true, transformY: true, transformWidth: true, transformHeight: true, transformAngle: true, transformZElevation: true, destroyWithParent: true});
			
			
			const layer = key.layout.getLayer(localVars.Layer);
			key.moveToLayer(layer);
			keyBorder.moveToLayer(layer);
			keyLabel.moveToLayer(layer);
			
			const UID = key.uid;
			g_runtime.setReturnValue(UID);
			
		},

		async Keyboard_Event3_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			instance.x = localVars.X;
			instance.y = localVars.Y;
			
		},

		async Laser_Event2_Act1(runtime, localVars)
		{
			const instance = ManipulateInstance.createInstance(localVars.LaserName);
			instance.width = localVars.Width;
			
			const layer = instance.layout.getLayer(localVars.Layer);
			instance.moveToLayer(layer);
			
			const origin = g_runtime.getInstanceByUid(localVars.Origin_UID);
			const target = g_runtime.getInstanceByUid(localVars.Target_UID);
			const distance = Utils.distanceBeetweenObjects(origin, target);
			instance.height = distance;
			
			const angleDegrees = Utils.angleDegreesBeetweenObjects(origin, target);
			instance.angleDegrees = angleDegrees + 90;
			
			instance.x = origin.x;
			instance.y = origin.y;
			
			await Utils.waitForMillisecond(localVars.VisibleForSeconds*1000);
			instance.destroy();
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
