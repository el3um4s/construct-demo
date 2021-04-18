import * as Utils from "./utilities.js";
import PointsIntance from "./point.js";


runOnStartup(async  runtime =>  { 
	globalThis.g_runtime = runtime;
	runtime.objects.Point.setInstanceClass(PointsIntance);
})
