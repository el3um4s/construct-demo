import Globals from "./globals.js";
import LogInfo from "./logInfo.js";

export async function openFile({description = "Text Files", accept = {'text/plain': ['.txt', '.md']}} = {}) {
	const options = {types:[{description, accept}]};
	 try {
	 	[Globals.fileHandle] = await window.showOpenFilePicker(options);
		const filePicked = await Globals.fileHandle.getFile();
		const contents = await filePicked.text();
		LogInfo('Open: ' + filePicked.name);
		return {ok: true, filePicked: filePicked, contents: contents};
	 } catch (err) {
	 	LogInfo('An error occured trying to open the file.');
		return {ok: false, filePicked: null, contents: null};
	 }
}

export async function loadFromFile() {
	try {
		const filePicked = await Globals.fileHandle.getFile();
		const contents = await filePicked.text();
		LogInfo('Reload: ' + filePicked.name);
		return {ok: true, filePicked: filePicked, contents: contents};
	} catch (err) {
		LogInfo('An error occured trying to open the file.');
		return {ok: false, filePicked: null, contents: null};
	}
}

export async function saveFile(contents, {description = "Text Files", accept = {'text/plain': ['.txt', '.md']}} = {} ) {
	if (Globals.fileHandle  == null ) {
		await saveAs(contents, {description, accept});
	} else {
		await write(contents);
	}
}

export async function write(contents) {
	try {
		const filePicked = await Globals.fileHandle.getFile();
		const writable = await Globals.fileHandle.createWritable();
		await writable.write(contents);
		await writable.close();
		LogInfo('File saved: ' + filePicked.name);
		return {ok: true}
	} catch (err) {
		LogInfo('Unable to write file');
		return {ok: false}
	}	
}

export async function saveAs(contents, {description = "Text Files", accept = {'text/plain': ['.txt', '.md']}} = {} ) {
	const handle = await getNewFileHandle({description, accept});
	if (handle.ok){
		Globals.fileHandle = handle.handle;
		try {
			const writable = write(contents);
			return {ok: writable.ok };
		} catch (err) {
			LogInfo('An error occured trying to save the file.');
			return {ok: false};
		}
	} else {
		LogInfo('An error occured trying to save the file.');
		return {ok: false};
	}
}

async function getNewFileHandle( {description = "Text Files", accept = {'text/plain': ['.txt', '.md']}} = {} ) {
 	try {
		const options = {types:[{description, accept}]};
		const handle = await window.showSaveFilePicker(options);
		return {ok: true, handle: handle};
	} catch (err) {
		LogInfo('An error occured trying to save the file.');
		return {ok: false, handle: null};
	}
}
