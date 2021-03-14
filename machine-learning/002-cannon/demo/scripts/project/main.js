// import Globals from "./globals.js";
import RocketInstance from "./rocket.js";

runOnStartup(async  runtime =>  { 
	globalThis.g_runtime  =  runtime;
	runtime.objects.Rocket.setInstanceClass(RocketInstance);
})
