const trustedOrigin = [
		"http://localhost:5000", 
		"https://c3demo.stranianelli.com", 
		"https://el3um4s.github.io", 
		"https://el3um4s.itch.io"
	];

export function sendMessage(message) {
	const targetWindow = globalThis.parent;
	targetWindow.postMessage(message, "*");
}

export function attachListeners() {
	if (globalThis.addEventListener) {
		globalThis.addEventListener("message", getMessage, false);
	} else {
		globalThis.attachEvent("onmessage", getMessage);
	}
}

function getMessage(e) {
	if( !trustedOrigin.includes(e.origin)) {
		console.log("Error, wrong origin");
	} else {
		const message = e.data;
// 		console.log(e.data);
		const messageType = message.type;
		const messageContent = message.content;

		match(messageType)
          .on(t => t.toLowerCase() === "set", () => getMessageSet(messageContent))
		  .on(t => t.toLowerCase() === "status", () => getMessagePlay(messageContent))
          .otherwise(t => () => 0);
		
	}
}



function getMessageSet(content) {
		match(content)
          .on(c => c.toLowerCase() === "AutoPlay=YES".toLowerCase(), () => g_runtime.callFunction("AutoPlay::SetTrue"))
		  .on(c => c.toLowerCase() === "AutoPlay=NO".toLowerCase(), () => g_runtime.callFunction("AutoPlay::SetFalse"))
          .otherwise(t => () => 0);
}

function getMessagePlay(content) {
		match(content)
          .on(c => c.toLowerCase() === "SPIN".toLowerCase(), () => g_runtime.callFunction("EndRace"))
          .otherwise(t => () => 0);
}

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})

