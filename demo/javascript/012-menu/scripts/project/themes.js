export function showMenu() {
	menuSvelte.items.clearMenu();

	menuSvelte.columns.setColumns(["label", "rightImage"]);
	menuSvelte.title.setTitle("Themes");

	add("Dark", "Dark");
	add("Light", "Light");
	add("Gold Miner", "Gold Miner");
	add("Bouron", "Bouron");
	add("Oscar", "Oscar");
	add("Herrera Yellow", "Herrera Yellow");
	add("Herrera Green", "Herrera Green");
	add("Herrera Blue", "Herrera Blue");
	add("Herrera Magenta", "Herrera Magenta");
	
	menuSvelte.items.push({
		label: "Main",
		onClick: "g_runtime.callFunction('showMenu')"
	});
	
	menuSvelte.visible.true();
}

export async function showMenuCustomTheme() {
	menuSvelte.items.clearMenu();

	menuSvelte.columns.setColumns(["label", "rightImage"]);
	menuSvelte.title.setTitle("Themes (custom)");
	

	await addFromJSON("Reds", "Theme-RED.json");
	await addFromJSON("Green", "Theme-GREEN.json");
	await addFromJSON("Blue", "Theme-BLUE.json");
	
	menuSvelte.items.push({
		label: "Main",
		onClick: "g_runtime.callFunction('showMenu')"
	});
	
	
	menuSvelte.visible.true();
}

function add(label, theme) {
	menuSvelte.items.push({ label, onClick: `menuSvelte.css.themeStandard("${theme}")`});
}


function addFromJSON(label, jsonFile) {
	menuSvelte.items.push({ 
			label, 
			onClick: `g_runtime.callFunction("CustomTheme","${jsonFile}")`
	});
}
