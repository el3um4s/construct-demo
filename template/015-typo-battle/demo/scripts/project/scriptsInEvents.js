"use strict";

import * as Utils from "./utilities.js";
import GameCoordinates from "./gameCoordinates.js"

{
	const scriptsInEvents = {

		async Chars_Event7_Act1(runtime, localVars)
		{
			Utils.deleteInstance(localVars.UID);
		},

		async Chars_Event8_Act1(runtime, localVars)
		{
			const direction = localVars.Direction;
			const distance = localVars.Pixels;
			
			Utils.moveInstance(localVars.UID, {direction, distance});
		},

		async Keyboard_Event2_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			const label = instance.instVars["Key"];
			const children = instance.children();
			
			for (const c of children) {
			    if (c.objectType.name == "Key_Label") {
					c.text = label;
				}
			};
			
		},

		async Keyboard_Event3_Act1(runtime, localVars)
		{
			const key = Utils.createInstance("Key");
			const keyBorder = Utils.createInstance("Key_Border");
			const keyLabel = Utils.createInstance("Key_Label");
			
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

		async Keyboard_Event4_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			instance.x = localVars.X;
			instance.y = localVars.Y;
			
		},

		async Keyboard_Event5_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			const layer = instance.layout.getLayer(localVars.Layer);
			instance.moveToLayer(layer);
			
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
