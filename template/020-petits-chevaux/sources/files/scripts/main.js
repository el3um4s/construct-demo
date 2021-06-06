import { attachListeners } from "./postMessage.js";

runOnStartup(async runtime => {
	globalThis.g_runtime  =  runtime;
	runtime.addEventListener("beforeprojectstart", () => attachListeners());
});

