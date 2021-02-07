"use strict";

import Globals from "./globals.js";
import * as ManageFiles from "./manageFiles.js"
import * as ForceFontSize from "./forceFontSize.js";
import * as KeyboardShortcuts from "./keyboardShortcuts.js";
import * as ManageTextArea from "./manageTextArea.js"

{
	const scriptsInEvents = {

		async Main_Event1_Act1(runtime, localVars)
		{
			const textEditor = document.getElementById("text-editor");
			ForceFontSize.setObserverFontSize(textEditor, "24px");
			
			const buttons = document.querySelectorAll('input[type="button"]');
			buttons.forEach(button => ForceFontSize.setObserverFontSize(button, "16px"));
			
			KeyboardShortcuts.addListeners_General(textEditor);
			KeyboardShortcuts.addListeners_General(document);
			KeyboardShortcuts.addListener_Keyboard(textEditor);
			
		},

		async Main_Event3_Act1(runtime, localVars)
		{
			ManageFiles.newFile();
		},

		async Main_Event4_Act1(runtime, localVars)
		{
			ManageFiles.openFile();
		},

		async Main_Event5_Act1(runtime, localVars)
		{
			ManageFiles.saveFile();
		},

		async Main_Event6_Act1(runtime, localVars)
		{
			ManageFiles.saveAs();
		},

		async Main_Event7_Act1(runtime, localVars)
		{
			ManageFiles.reloadFile();
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
