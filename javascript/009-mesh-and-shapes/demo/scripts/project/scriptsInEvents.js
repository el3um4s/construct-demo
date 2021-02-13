"use strict";

import MeshPremadeShapes from "./meshPremadeShapes.js";
import * as Utils from "./utils.js";
import * as Mesh from "./mesh.js";


{
	const scriptsInEvents = {

		async Mesh_Event2_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			const shape = MeshPremadeShapes[localVars.Shape.toLowerCase()];
			
			Mesh.setSizeShape(instance, shape);
			Mesh.drawShape(instance, shape);
		},

		async Mesh_Event3_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			const columns = Utils.choose(3,4,5,6,7,8);
			const rows = Utils.choose(3,4,5,6,7,8);
			
			Mesh.createMesh(instance, {columns, rows});
			Mesh.randomizeMargins(instance, {min:-0.2, max:0.2});
		},

		async Mesh_Event4_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			const columns = Utils.choose(3,4,5,6,7,8);
			const rows = Utils.choose(3,4,5,6,7,8);
			
			Mesh.createMesh(instance, {columns, rows});
			Mesh.randomize(instance, {min:-0.5, max:0.5});
		},

		async Mesh_Event5_Act1(runtime, localVars)
		{
			const instance = g_runtime.getInstanceByUid(localVars.UID);
			
			Mesh.removeMesh(instance);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
