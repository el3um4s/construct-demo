"use strict";

import Chromosome from "./Chromosome.js";
import Population from "./Population.js";


{
	const scriptsInEvents = {

		async EventSheet1_Event2_Act2(runtime, localVars)
		{
			const target = localVars.Target;
			const population  = new Population(target, 20);
			await population.generation();
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
