// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

import Globals from "./globals.js";

export function setObserverFontSize(element, value = "16px") {
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	const config = {
		attributes: true,
		childList: false,
		characterData: true,
		subtree: false
	};
	
	const observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === "attributes") {
				const style = element.style.fontSize;
				if (style != value) { element.style.fontSize = value; }
			}
		});
	});
	Globals.observer.push(observer.observe(element, config));
}
