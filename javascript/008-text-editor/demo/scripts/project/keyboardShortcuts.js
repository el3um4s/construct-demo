// Ctrl keys: Ctrl-N, Ctrl-T and Ctrl-W no longer available to client side JavaScript in Chrome4 
// https://bugs.chromium.org/p/chromium/issues/detail?id=33056

import Globals from "./globals.js";
import * as ManageFiles from "./manageFiles.js"
import * as ManageTextArea from "./manageTextArea.js"

export function addListeners_General(element) {
	element.addEventListener('keydown', generalShortcuts);
	element.addEventListener('keydown', setSpecials_Down);
	element.addEventListener('keyup', setSpecials_Up);
}

export function addListener_Keyboard(element) {
	element.addEventListener('keydown', manageKeyboard);
}

function manageKeyboard(e) {
	match(e.code)
		.on(k => k === "Tab", () => {
			stopSpecialKeyBrowser(e);
			console.log("tab");
			ManageTextArea.insertInto("\t");
		})
}

function generalShortcuts(e) {
	if (Globals.ctrlPressed && !e.repeat) {	
		match(e.code)
			.on(k => k === "KeyO", () => { 
								stopSpecialKeyBrowser(e);
								setCtrlNotPressed();
								ManageFiles.openFile();
				})
			.on(k => k === "KeyR", () => {
								stopSpecialKeyBrowser(e);
								setCtrlNotPressed();
								ManageFiles.reloadFile();
				})
			.on(k => k === "KeyS", () => { 
								stopSpecialKeyBrowser(e);
								setCtrlNotPressed();
								if (Globals.shiftPressed) {
									setShiftNotPressed();
									ManageFiles.saveAs();
								} else {
									ManageFiles.saveFile();
								}
				})
			.otherwise(k => () => 0);
	};
	if (Globals.altPressed && !e.repeat ) {
		match(e.code)
			.on(k => k === "KeyN", () => { 
								stopSpecialKeyBrowser(e);
								setAltNotPressed();
								ManageFiles.newFile();
				})
			.otherwise(k => () => 0);
	}
}

function stopSpecialKeyBrowser(e) {
	e.stopImmediatePropagation();
	e.preventDefault();
}
	
function setSpecials_Down(e){
	if (!e.repeat) {
		match(e.key)
			.on(k => k === "Control", () => setCtrlPressed())
			.on(k => k === "Shift", () => setShiftPressed())
			.on(k => k === "Alt", () => setAltPressed())
			.otherwise(k => () => 0);
	}
	
}

function setSpecials_Up(e){
	match(e.key)
		.on(k => k === "Control", () => setCtrlNotPressed())
		.on(k => k === "Shift", () => setShiftNotPressed())
		.on(k => k === "Alt", () => setAltNotPressed())
		.otherwise(k => () => 0);
}

	
const setCtrlPressed = () => { Globals.ctrlPressed = true };
const setCtrlNotPressed = () => { Globals.ctrlPressed = false };
const setShiftPressed = () => { Globals.shiftPressed = true };
const setShiftNotPressed = () => { Globals.shiftPressed = false };
const setAltPressed = () => { Globals.altPressed = true };
const setAltNotPressed = () => { Globals.altPressed = false };	

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})