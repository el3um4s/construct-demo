function stopSpecialKeyBrowser(e) {
	e.stopImmediatePropagation();
	e.preventDefault();
	writeCodeInText(e);
};

function showCode(e) {
	writeCodeInText(e);
};

function writeCodeInText(e) {
	const textEventKeyCodeBIG = g_runtime.objects.TextEventKeyCodeBIG.getFirstInstance();
	textEventKeyCodeBIG.text = `${e.keyCode}`;
	g_runtime.objects.TextEventKey.getFirstInstance().text = `${e.key}`;
	g_runtime.objects.TextEventKeyCode.getFirstInstance().text = `${e.keyCode}`;
	g_runtime.objects.TextEventLocation.getFirstInstance().text = `${e.location}`;
	g_runtime.objects.TextEventCode.getFirstInstance().text = `${e.code}`;
}

function stopFunctionKeys(e) {
	const specialKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
	match(e.code)
		.on(k => specialKeys.includes(k), () => stopSpecialKeyBrowser(e))
		.on(k => !specialKeys.includes(k), () => showCode(e))		
	.otherwise(k => () => showCode);
};

runOnStartup(async runtime => {
 	globalThis.g_runtime = runtime;
	document.addEventListener('keydown', stopFunctionKeys);
});


const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})
