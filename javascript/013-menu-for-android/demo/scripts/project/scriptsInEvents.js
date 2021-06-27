


const scriptsInEvents = {

		async EventSheet1_Event1_Act3(runtime, localVars)
		{
			menuSvelte.items.clearMenu();
			menuSvelte.css.changeStyle("menu-width", "360px");
			menuSvelte.css.changeStyle("min-menu-width", "360px");
			menuSvelte.css.changeFontTitleAndItems("Kenney Future", "Kenney Future");
			menuSvelte.css.themeStandard("Light");
			menuSvelte.title.setTitle("Poemia");
			menuSvelte.columns.setColumns(["rightImage", "label"]);
			menuSvelte.css.changeStyle("color-primary", "steelblue");
			
			let rightImage = await runtime.assets.getProjectFileUrl("demon.svg");
			menuSvelte.items.push({
				rightImage,
				label: "La Divina Commedia",
				onClick: "g_runtime.callFunction('DivinaCommedia')"
			});
			
			rightImage = await runtime.assets.getProjectFileUrl("heaven.svg");
			menuSvelte.items.push({
				rightImage,
				label: "Paradise Lost",
				onClick: "g_runtime.callFunction('ParadiseLost')"
			});
			
			rightImage = await runtime.assets.getProjectFileUrl("shield.png");
			menuSvelte.items.push({
				rightImage,
				label: "Cantar de mio Cid",
				onClick: "g_runtime.callFunction('Cantar de mio Cid')"
			});
			
			rightImage = await runtime.assets.getProjectFileUrl("helmet.png");
			menuSvelte.items.push({
				rightImage,
				label: "Ὀδύσσεια",
				onClick: "g_runtime.callFunction('Ὀδύσσεια')"
			});
			
			rightImage = await runtime.assets.getProjectFileUrl("information.svg");
			menuSvelte.items.push({
				rightImage,
				label: "Info",
				onClick: "g_runtime.callFunction('Info')"
			});
		},

		async EventSheet1_Event2_Act4(runtime, localVars)
		{
			menuSvelte.visible.true();
		},

		async EventSheet1_Event3_Act7(runtime, localVars)
		{
			menuSvelte.visible.false();
			
		},

		async EventSheet1_Event4_Act6(runtime, localVars)
		{
			menuSvelte.visible.false();
			
		},

		async EventSheet1_Event5_Act6(runtime, localVars)
		{
			menuSvelte.visible.false();
			
		},

		async EventSheet1_Event6_Act6(runtime, localVars)
		{
			menuSvelte.visible.false();
			
		},

		async EventSheet1_Event7_Act6(runtime, localVars)
		{
			menuSvelte.visible.false();
			
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

