"use strict";

import Globals from "./globals.js";
import RocketInstance from "./rocket.js";
import Population from "./population.js";

{
	const scriptsInEvents = {

		async Main_Event2_Act1(runtime, localVars)
		{
			g_runtime.globalVars.Gravity = Globals.WorldDefault.gravity;
			g_runtime.globalVars.Bounce = Globals.WorldDefault.bounceOffSolids ? 1 : 0;
			g_runtime.globalVars.PreserveFitness = Globals.Population.preserveFitness;
			g_runtime.globalVars.Population = Globals.Population.size;
			g_runtime.globalVars.RateMutation = Globals.Population.rateMutation;
		},

		async Main_Event2_Act10(runtime, localVars)
		{
			Globals.Population.generation = new Population();
			Globals.Population.generation.createRandomGeneration(Globals.Population.size);
		},

		async Main_Event5_Act1(runtime, localVars)
		{
			const report = Globals.Population.generation.report();
			const { generationNumber, population, best, totalFitness, average} = report;
			const { fitness, speed, acceleration, angleOfMotion} = best;
			const result = {generationNumber, population, best, totalFitness, average, fitness, speed, acceleration, angleOfMotion};
			
			for (const text of runtime.objects.TextLastIteration.instances()){
				const nameVar = text.instVars.value;
				const decimals = text.instVars.decimals;
				let value = result[nameVar];
				if (nameVar == "angleOfMotion") {
					value = value * 180 / Math.PI;
				}
				const rounded = round(value, decimals);
				text.text = `${rounded}`;
			}
			
			function round(value, decimals) {
			  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
			}
		},

		async Main_Event8_Act2(runtime, localVars)
		{
			Globals.WorldDefault.gravity = g_runtime.globalVars.Gravity
		},

		async Main_Event11_Act2(runtime, localVars)
		{
			Globals.Population.preserveFitness = g_runtime.globalVars.PreserveFitness;
		},

		async Main_Event16_Act2(runtime, localVars)
		{
			Globals.WorldDefault.bounceOffSolids = !! g_runtime.globalVars.Bounce;
		},

		async Main_Event19_Act2(runtime, localVars)
		{
			Globals.Population.size = g_runtime.globalVars.Population;
		},

		async Main_Event22_Act2(runtime, localVars)
		{
			Globals.Population.rateMutation = g_runtime.globalVars.rateMutation;
		},

		async Main_Event24_Act1(runtime, localVars)
		{
			Globals.Population.generation.reset();
		},

		async Main_Event24_Act4(runtime, localVars)
		{
			Globals.Population.generation.createRandomGeneration(Globals.Population.size);
			for (const text of runtime.objects.TextLastIteration.instances()){
				text.text = "-";
			}
		},

		async Main_Event29_Act1(runtime, localVars)
		{
			const rocket = g_runtime.objects.Rocket.getFirstPickedInstance();
			const target = g_runtime.objects.Target.getFirstInstance();
			const {x, y} = target;
			rocket.calcFitness({x,y});
			
			const experience = rocket.preserveExperience();
			Globals.Population.generation.add(experience);
			
			rocket.destroy();
			
		},

		async Main_Event30_Act5(runtime, localVars)
		{
			Globals.Population.generation.generation();
			g_runtime.globalVars.PopulationStatus = "waiting";
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
