"use strict";



{
	const scriptsInEvents = {

		async EventSheet1_Event1_Act1(runtime, localVars)
		{
			const camera = runtime.objects.Camera.getFirstInstance();
			await globalThis.moveTo(camera.x,camera.y);
		},

		async EventSheet1_Event2_Act1(runtime, localVars)
		{
			const targetSize = runtime.globalVars.TargetSize;
			const realSize = document.getElementsByTagName("html")[0];
			const deltaHeight = targetSize - realSize.clientHeight;
			const deltaWidth = targetSize - realSize.clientWidth;
			await globalThis.resizeBy(deltaWidth,deltaHeight);
		},

		async EventSheet1_Event3_Act1(runtime, localVars)
		{
			function lerp(start, end, amt) {
			  return (1 - amt) * start + amt * end;
			}
			
			const camera = runtime.objects.Camera.getFirstInstance();
			const winX = globalThis.screenX;
			const winY = globalThis.screenY;
			const x = lerp(winX, camera.x, 0.25);
			const y = lerp(winY, camera.y, 0.25);
			
			globalThis.moveTo(x, y);
			
		},

		async EventSheet1_Event12_Act1(runtime, localVars)
		{
			function lerp(start, end, amt) {
			  return (1 - amt) * start + amt * end;
			}
			
			let scale = runtime.globalVars.Scale;
			scale = scale < 0.15 ? 0.15 : scale > 2 ? 2 : scale;
			runtime.globalVars.Scale = lerp(runtime.globalVars.Scale, scale, 0.25);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
