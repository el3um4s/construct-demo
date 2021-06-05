"use strict";

import { sendMessage } from "./postMessage.js";


{
	const scriptsInEvents = {

		async Postmessage_Event2_Act1(runtime, localVars)
		{
			const content = localVars.Content;
			const type = localVars.Type;
			
			const message = { type, content }
			
			sendMessage(message);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
