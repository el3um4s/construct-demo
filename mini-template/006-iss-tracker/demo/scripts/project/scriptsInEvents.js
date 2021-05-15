"use strict";

import Globals from "./globals.js";
import findISS from "./findISS.js";
import createMap from "./createMap.js";


{
	const scriptsInEvents = {

		async Main_Event1_Act1(runtime, localVars)
		{
			await createMap("mapid");
			await updateISSposition();
			
			async function updateISSposition() {
				const issPosition = await findISS();
				const { lat, long, timestamp, speed, altitude } = issPosition;
				Globals.iss.setCoordinates(ol.proj.fromLonLat([long, lat]));
				const view = Globals.map.getView();
				view.setCenter(ol.proj.fromLonLat([long, lat]));
				
				const info = runtime.objects.ISS_Information.getFirstInstance();
				const newline = "\n";
				info.text = `[b]TIME:[/b]${newline}${timestamp}${newline}${newline}`;
				info.text += `[b]LATITUDE:[/b]${newline}${lat}${newline}${newline}`;
				info.text += `[b]LONGITUDE:[/b]${newline}${long}${newline}${newline}`;
				info.text += `[b]SPEED:[/b]${newline}${speed} km/hr${newline}${newline}`;
				info.text += `[b]ALTITUDE:[/b]${newline}${altitude} km`;
			}
			
			setInterval(await updateISSposition, 2000);
			
		},

		async Loader_Event1_Act4(runtime, localVars)
		{
			await runtime.assets.loadScripts("ol.js");
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
