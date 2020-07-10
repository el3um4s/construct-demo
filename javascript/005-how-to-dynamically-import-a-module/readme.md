# How to dynamically import a module in Construct 3

* **c3p** [how-to-dynamically-import-a-module-20.07.11.c3p](source/c3p/how-to-dynamically-import-a-module-20.07.11.c3p)
* **demo** [link](demo)

```javascript
let wiki;
let c3_colorjs;

runOnStartup(async runtime =>
{
	wiki = await loadModule(runtime, 'wiki.js');
	c3_colorjs = await loadModule(runtime, 'https://c3demo.stranianelli.com/javascript/000-snippets/c3_colors_helper.js');
});

async function loadModule(runtime, name) {
	const file = await runtime.assets.getProjectFileUrl(name);
    const mod = await import(file);
	return mod;
}

```