"use strict";

import Globals from "./globals.js";
import * as Utils from "./utilities.js";
import PointsIntance from "./point.js";
import * as Game from "./game.js";

{
	const scriptsInEvents = {

		async Main_Event8_Act1(runtime, localVars)
		{
			const quantity = localVars.Quantity;
			const vertex = runtime.objects.Vertex.getAllInstances();
			const nameObject = "Points";
			const nameLayer = "Points";
			const show = true;
			
			const rules = ["normal"];
			
			if (runtime.globalVars.Rule_NotEqualPrevious != "-") {
				rules.push("not equal previous");
			}
			if (runtime.globalVars.Rule_NotEqualPrePrevious != "-") {
				rules.push("not equal pre-previous");
			}
			
			Game.generateAllPoints({quantity, vertex, nameObject, nameLayer, show, rules});
		},

		async Main_Event25_Act1(runtime, localVars)
		{
			const p = runtime.globalVars.PointsCount;
			
			const quantity = p - Utils.match(p)
			     				.on(p => p <= 1, () => 0)
			     				.on(p => p > 1 & p <=10 , () => 1)
								.on(p => p > 10 & p <=100 , () => 10)
								.on(p => p > 100 & p <=1000 , () => 100)
								.on(p => p > 1000 & p <=10000 , () => 1000)
								.on(p => p > 10000 & p <=1000000 , () => 10000)
			     				.otherwise(p => () => p*0);
				 
			runtime.globalVars.PointsCount = quantity;
			
			const points = runtime.objects.Points.getAllInstances();
			const vertex = runtime.objects.Vertex.getAllInstances();
			const show = true;
			
			Game.changeQuantityPoints({quantity, points, vertex, show})
		},

		async Main_Event26_Act1(runtime, localVars)
		{
			const p = runtime.globalVars.PointsCount;
			
			const quantity = p + Utils.match(p)
			     				.on(p => p >= 1 & p <10 , () => 1)
								.on(p => p >= 10 & p <100 , () => 10)
								.on(p => p >= 100 & p <1000 , () => 100)
								.on(p => p >= 1000 & p <10000 , () => 1000)
								.on(p => p >= 10000 & p <1000000 , () => 10000)
			     				.otherwise(p => () => p*0);
				 
			runtime.globalVars.PointsCount = quantity;
			
			const points = runtime.objects.Points.getAllInstances();
			const vertex = runtime.objects.Vertex.getAllInstances();
			const show = true;
			
			Game.changeQuantityPoints({quantity, points, vertex, show})
		},

		async Main_Event40_Act4(runtime, localVars)
		{
			const points = runtime.objects.Points.getAllInstances();
			const vertex = runtime.objects.Vertex.getAllInstances();
			const show = true;
			Game.regenerateAllPoints({points, vertex, show})
		},

		async Main_Event41_Act4(runtime, localVars)
		{
			const points = runtime.objects.Points.getAllInstances();
			Game.recolorAllPoints(points);
		},

		async Main_Event50_Act1(runtime, localVars)
		{
			const points = runtime.objects.Points.getAllInstances();
			const vertex = runtime.objects.Vertex.getAllInstances();
			const show = true;
			Game.moveAllPoints({points, vertex, show})
		},

		async Main_Event54_Act1(runtime, localVars)
		{
			const vert = runtime.objects.Vertex.getPickedInstances()[0];
			const {x, y} = vert;
			
			const newX = findSnap(x, 64);
			const newY = findSnap(y, 64);
			
			vert.x = newX;
			vert.y = newY;
			
			function findSnap(a,b) {
				const quotient = Math.floor(a/b);
				const remainder = a % b;
				
				if (remainder == 0) return a;
				
				const resultA = quotient * b;
				const resultB = (quotient+1) * b;
				
				const deltaA = a - resultA;
				const deltaB = a - resultB;
					
				return deltaA > deltaB ? resultB : resultA;
			}
			
			const points = runtime.objects.Points.getAllInstances();
			const vertex = runtime.objects.Vertex.getAllInstances();
			const show = true;
			Game.moveAllPoints({points, vertex, show})
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
