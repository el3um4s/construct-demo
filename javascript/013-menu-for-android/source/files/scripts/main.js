runOnStartup(async runtime => {
	globalThis.g_runtime = runtime;
	await runtime.assets.loadScripts("menu.js");
});

