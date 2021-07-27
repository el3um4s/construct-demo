"use strict";

import hexToRGBA from "./colorsHelper.js";

{
	const scriptsInEvents = {

		async Canvas_Event14_Act1(runtime, localVars)
		{
			const uid = localVars.UID;
			const canvas = runtime.getInstanceByUid(uid);
			
			// colors
			const hex = localVars.Color;
			const {r, g, b } = hexToRGBA(hex, {formatNumber: "PERCENTAGE", formatReturn: "OBJECT" });
			
			// draw
			const width = canvas.surfaceDeviceWidth;
			const height = canvas.surfaceDeviceHeight;
			
			const rules = localVars.Rules;
			
			for (let x = 0; x < width; x++) {
			  for (let y = 0; y < height; y++) {
				const condition = eval(rules);
			
			    if (condition) {
			      runtime.callFunction("Canvas_DrawPoint", uid, x, y, x+1, y+1, r, g, b, 100);
			    }
			  }
			}
			
		},

		async Canvas_Event17_Act1(runtime, localVars)
		{
			const hex = localVars.Color;
			const {r, g, b } = hexToRGBA(hex, {formatNumber: "PERCENTAGE", formatReturn: "OBJECT" });
			localVars.r = r;
			localVars.g = g;
			localVars.b = b;
		},

		async Tilemap_Event12_Act1(runtime, localVars)
		{
			const uid = localVars.UID;
			const rules = localVars.Rules;
			const hex = localVars.Color;
			const tilemap = runtime.getInstanceByUid(uid);
			const clearBackground = !!localVars.ClearBackground;
			
			const color = hexToRGBA(hex, {formatNumber: "0-1 Range", formatReturn: "ARRAY" });
			tilemap.colorRgb = color;
			
			const width = tilemap.mapWidth;
			const height = tilemap.mapHeight;
			
			for (let x = 0; x < width; x++) {
			  for (let y = 0; y < height; y++) {
				const condition = eval(rules);
			
			    if (condition) {
					tilemap.setTileAt(x, y, 1);
			    } else if (clearBackground) {
					tilemap.setTileAt(x, y, -1);
				}
			  }
			}
			
		},

		async Tilemap_Event14_Act1(runtime, localVars)
		{
			const uid = localVars.UID;
			const tilemap = runtime.getInstanceByUid(uid);
			const hex = localVars.Color;
			const color = hexToRGBA(hex, {formatNumber: "0-1 Range", formatReturn: "ARRAY" });
			tilemap.colorRgb = color;
		},

		async General_Event2_Act4(runtime, localVars)
		{
			const colorBackground = document.getElementById("color-background");
			colorBackground.type = "color";
		},

		async General_Event3_Act4(runtime, localVars)
		{
			const colorPrimary = document.getElementById("color-primary");
			colorPrimary.type = "color";
			
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
