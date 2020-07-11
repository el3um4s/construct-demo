/*
 * c3_import_module.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.07.12
*/

// let wiki;
// let c3_colorjs;

runOnStartup(async runtime =>
{
//	wiki = await loadModule(runtime, 'wiki.js');
//	c3_colorjs = await loadModuleURL(runtime, 'https://c3demo.stranianelli.com/javascript/000-snippets/c3_colors_helper.js');
});


async function loadModule(runtime, name) {
	const isPreview = window.location.href === `https://preview.construct.net/local/index.html`;
	const file = isPreview ? await runtime.assets.getProjectFileUrl(name) : `../${name}`;
    const mod = await import(file);
	return mod;
}

async function loadModuleURL(runtime, name) {
    const mod = await import(name);
	return mod;
}
