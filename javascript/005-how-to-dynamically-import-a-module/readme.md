---
title: How to dynamically import a module in Construct 3
c3p: how-to-dynamically-import-a-module-20.07.12.c3p
hasDemo: true
deprecated: true
tags:
  - javascript
---

# How to dynamically import a module in Construct 3

* **c3p** [how-to-dynamically-import-a-module-20.07.12.c3p](source/c3p/how-to-dynamically-import-a-module-20.07.12.c3p)
* **demo** [link](demo)
* **Patreon** [link](https://patreon.com/el3um4s)

```javascript
let wiki;
let c3_colorjs;

runOnStartup(async runtime =>
{
	wiki = await loadModule(runtime, 'wiki.js');
	c3_colorjs = await loadModuleURL(runtime, 'https://c3demo.stranianelli.com/javascript/000-snippets/c3_colors_helper.js');
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
```