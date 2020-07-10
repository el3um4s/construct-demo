
let wiki;
let c3_colorjs;


runOnStartup(async runtime =>
{
	globalThis.g_runtime  =  runtime;
	wiki = await loadModule(runtime, 'wiki.js');
	c3_colorjs = await loadModule(runtime, 'https://c3demo.stranianelli.com/javascript/000-snippets/c3_colors_helper.js');
});


async function loadModule(runtime, name) {
	const file = await runtime.assets.getProjectFileUrl(name);
    const mod = await import(file);
	return mod;
}

