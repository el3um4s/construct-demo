"use strict";

import Globals from "./globals.js";
import hexToRGBA from "./colorsHelper.js";
import Demo from "./demo.js";


{
	const scriptsInEvents = {

		async Main_Event1_Act2(runtime, localVars)
		{
			mermaid.initialize({startOnLoad:true});
		},

		async Loader_Event2_Act1(runtime, localVars)
		{
			await runtime.assets.loadScripts("winbox.bundle.js");
			await runtime.assets.loadScripts("mermaid.min.js");
			runtime.goToLayout("Main");
		},

		async Menu_Event3_Act1(runtime, localVars)
		{
			const info = document.getElementById("winbox-info");
			
			if (!info) {
				const theme = Globals.theme.selected;
			
				const projectName = runtime.projectName;
				const projectVersion = runtime.projectVersion;
			
				const html = `
				<div style="text-align:center;" id="winbox-info">
				<h3 style="color=${Globals.theme[theme].textPrimary}">${projectName}</h3>
				<p style="color=${Globals.theme[theme].secondaryText}">v: ${projectVersion}</p>
				</div>
				`;
			
				new WinBox({
					title: "Info",
					class: theme,
					modal: true,
					background: Globals.theme[theme].statusBar,
					top: 32,
					x: "center",
					y: "center",
					width: 200,
					height: 150,
					html
				});
			}
		},

		async Menu_Event4_Act1(runtime, localVars)
		{
			Globals.theme.selected = Globals.theme.selected === "dark" ? "light" : "dark";
			runtime.callFunction("Theme_Update");
		},

		async Menu_Event5_Act1(runtime, localVars)
		{
			const checkInput = document.getElementById("input-1");
			const checkOutput = document.getElementById("output-1");
			if(!checkInput || !checkOutput) {
				const theme = Globals.theme.selected;
			
				const htmlInput = `
				<div class="editor" id="input-1" contenteditable="true"></div>
				`;
			
				const htmlOutput = `
				<div id="output-1"></div>
				`;
			
				new WinBox({
					title: "INPUT",
					class: theme,
					background: Globals.theme[theme].statusBar,
					top: 32,
					html: htmlInput
				});
			
				new WinBox({
					title: "PREVIEW",
					class: theme,
					background: Globals.theme[theme].statusBar,
					top: 32,
					x: 32,
					y: 32,
					html: htmlOutput
				});
			
			
				document.getElementById("input-1").addEventListener("input", (e) => {
					const output = document.getElementById("output-1");
					if (output.firstChild !== null) {
						output.innerHTML = "";
					};
			
					const code = e.target.innerText;
					const insert = function (code) {
						output.innerHTML = code;
					};
					mermaid.render("preparedScheme", code, insert);
				});
			}
			
		},

		async Menu_Event6_Act1(runtime, localVars)
		{
			const input = document.getElementById("input-1");
			if (input) {
				const number = localVars.number;
			// 	const darkMode = `%%{init: {'theme': 'base', 'themeVariables': { 'darkMode': "true"}}}%%`;
			// 	const lightMode = `%%{init: {'theme': 'base', 'themeVariables': { 'darkMode': "false"}}}%%`;
			// 	const theme = Globals.theme.selected;
			// 	const code = theme === "dark" ? darkMode + Demo[`demo_${number}`] : lightMode + Demo[`demo_${number}`];
				const code = Demo[`demo_${number}`];
				input.innerHTML = code
				
				
				const output = document.getElementById("output-1");
				if (output) {
					if (output.firstChild !== null) {
						output.innerHTML = "";
					};
					const insert = function (code) {
						output.innerHTML = code.trim();
					};
					mermaid.render("preparedScheme", code, insert);
				}
			}
		},

		async Menu_Event7_Act1(runtime, localVars)
		{
			const button = runtime.objects.Menu_Text.getFirstPickedInstance();
			const command = button.instVars.onClick;
			const parameter = button.instVars.Parameter;
			runtime.callFunction(command, parameter);
		},

		async Menu_Event9_Act4(runtime, localVars)
		{
			const winbox = document.getElementsByClassName("winbox");
			const theme = Globals.theme.selected;
			
			for (let win of winbox) {
				win.classList.remove("light");
				win.classList.remove("dark");
				win.classList.add(theme);
			}
		},

		async Menu_Event10_Act1(runtime, localVars)
		{
			const theme = Globals.theme.selected;
			const name = localVars.ObjectsName; 
			
			const instances = runtime.objects[name].getAllInstances();
			
			for (const inst of instances){
				const color = inst.instVars.Color;
				const colorHEX = Globals.theme[theme][color];
				inst.colorRgb = hexToRGBA(colorHEX);
			}
			
		},

		async Menu_Event11_Act1(runtime, localVars)
		{
			const menu = runtime.objects.Menu_Text.getFirstPickedInstance();
			menu.text = Globals.theme.selected.toUpperCase();
			
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
