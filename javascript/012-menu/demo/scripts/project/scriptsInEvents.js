"use strict";

import * as svelte from "./menu.js";
import { menuArrayFontsForMenu, menuArrayFonts } from "./customMenu.js"
import * as themes from "./themes.js";

// init menu themes

globalThis.themes = themes;

{
	const scriptsInEvents = {

		async Main_Event1_Act1(runtime, localVars)
		{
			menuSvelte.css.changeStyle("menu-min-width", "360px");
			menuSvelte.css.changeStyle("menu-width", "360px");
		},

		async Main_Event5_Act1(runtime, localVars)
		{
			themes.showMenu();
		},

		async Main_Event6_Act1(runtime, localVars)
		{
			themes.showMenuCustomTheme();
		},

		async Menu_Event2_Act1(runtime, localVars)
		{
			menuSvelte.items.clearMenu();
			
			menuSvelte.columns.setColumns(["icon", "label", "description"]);
			menuSvelte.title.setTitle("Main Menu");
			
			let icon = await g_runtime.assets.getProjectFileUrl("font.svg");
			menuSvelte.items.push({
				icon,
				label: "Fonts",
				description: "Choose Font Family for the Menu",
				onClick: "g_runtime.callFunction('showFonts')"
			});
			
			icon = await g_runtime.assets.getProjectFileUrl("theme.svg");
			menuSvelte.items.push({
				icon,
				label: "Theme",
				description: "Choose the theme",
				onClick: "themes.showMenu()"
			});
			
			menuSvelte.visible.true();
		},

		async Menu_Event3_Act1(runtime, localVars)
		{
			menuSvelte.items.clearMenu();
			menuSvelte.columns.setColumns(["label", "rightIcon"]);
			menuSvelte.title.setTitle("Choose Fonts");
			
			let rightIcon = await g_runtime.assets.getProjectFileUrl("menu.svg");
			menuSvelte.items.push({
				rightIcon,
				label: "Only Menu",
				onClick: "g_runtime.callFunction('chooseForMenu')"
			});
			
			rightIcon = await g_runtime.assets.getProjectFileUrl("c.svg");
			menuSvelte.items.push({
				rightIcon,
				label: "C3 & Menu",
				onClick: "g_runtime.callFunction('chooseForC3')"
			});
			
			menuSvelte.items.push({
				label: "Main",
				onClick: "g_runtime.callFunction('showMenu')"
			});
			
			menuSvelte.visible.true();
		},

		async Menu_Event4_Act1(runtime, localVars)
		{
			menuSvelte.items.clearMenu();
			menuSvelte.columns.setColumns(["label"]);
			menuSvelte.title.setTitle("Choose Fonts (C3 & Menu)");
			
			menuSvelte.items.loadItemsFromArray(menuArrayFonts);
			
			menuSvelte.items.unshift({
				label: "Go Back",
				onClick: "g_runtime.callFunction('showFonts')"
			});
			
			menuSvelte.visible.true();
		},

		async Menu_Event5_Act1(runtime, localVars)
		{
			menuSvelte.items.clearMenu();
			menuSvelte.columns.setColumns(["label"]);
			menuSvelte.title.setTitle("Choose Fonts (only Menu)");
			
			menuSvelte.items.loadItemsFromArray(menuArrayFontsForMenu);
			
			menuSvelte.items.unshift({
				label: "Go Back",
				onClick: "g_runtime.callFunction('showFonts')"
			});
			
			menuSvelte.visible.true();
		},

		async Menu_Event6_Act1(runtime, localVars)
		{
			menuSvelte.visible.true();
		},

		async Menu_Event7_Act2(runtime, localVars)
		{
			const title = localVars.title;
			const items = localVars.items;
			
			menuSvelte.css.changeFontTitle(title);
			menuSvelte.css.changeFontItems(items);
		},

		async Menu_Event8_Act1(runtime, localVars)
		{
			const theme = localVars.jsonName;
			const jsonStyle = await g_runtime.assets.fetchJson(theme);
			menuSvelte.css.loadTheme(jsonStyle);
			
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
