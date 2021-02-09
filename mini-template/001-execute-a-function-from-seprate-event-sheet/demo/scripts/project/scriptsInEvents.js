"use strict";

import * as Printer from "./printer.js";

function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}

{
	const scriptsInEvents = {

		async Eprinter_Event2_Act1(runtime, localVars)
		{
			const instance = runtime.objects.othersOutput.getFirstPickedInstance();
			
			Printer.printText(instance.uid, "Random: " + Math.ceil(Math.random(0,1)*100))
		},

		async Eprinter_Event3_Act1(runtime, localVars)
		{
			const instance = runtime.objects.othersOutput.getFirstPickedInstance();
			Printer.printText_Instance(instance,"Char: " + choose("A","B","C","D","E","F","G","H","I","L","M","N"))
		},

		async Printer_Event2_Act1(runtime, localVars)
		{
			Printer.printText(localVars.uid, localVars.text);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
