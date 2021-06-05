import { attachListeners } from "./postMessage.js";

runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })
runOnStartup(async runtime =>
{
	globalThis.g_runtime  =  runtime;
	
	runtime.addEventListener("beforeprojectstart", () => attachListeners());
});

// async function OnBeforeProjectStart(runtime)
// {
// 	attachListeners();
// }
