import Globals from "./globals.js";
import * as FileSystemAccess from "./fileSystemAccess.js";

function insertText(text = "") {
	g_runtime.objects.TextInput.getFirstInstance().text = text;
}

function getText() {
	return g_runtime.objects.TextInput.getFirstInstance().text;
}

export function newFile() {
	insertText("");
	Globals.fileHandle = null;
}

export async function openFile() {
	const contents = await FileSystemAccess.openFile();
	if (contents.ok) { 
		const text = contents.contents;
		insertText(text);
	}
}

export async function saveFile() {
	const text = getText();
	await FileSystemAccess.saveFile(text);
}

export async function saveAs(){
	const text = getText();
	await FileSystemAccess.saveAs(text);
}

export async function reloadFile(){
	const contents = await FileSystemAccess.loadFromFile();
	if (contents.ok) { 
		const text = contents.contents;
		insertText(text);
	}
}