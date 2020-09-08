function getVarForButtonGenerators(nameGenerator, idle_rules_JSON, idle_stats_JSON) {
	const generatorsRules = json_getKey(idle_rules_JSON, `generators.${nameGenerator}`);
	const name = generatorsRules.name;
	const icon = generatorsRules.icon;
	const description = generatorsRules.description;
	const labelEffect = generatorsRules.effects[0].action == "add" ?  "+" : "x";
	const valueEffect = generatorsRules.effects[0].base_income + " point";
	const effect = labelEffect + valueEffect;
	const quantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	const startingCost = generatorsRules.cost[0].starting_cost;
	const multiplier_price = generatorsRules.cost[0].cost_multi_factor;
	const cost = calculateSellCost(startingCost, multiplier_price, quantity);
	const every_x_seconds = generatorsRules.effects[0].timer_seconds;
	return {name, icon, description, quantity, effect, cost, every_x_seconds};
}

function buttonGeneratorsIsPurchasable(money, nameGenerator, idle_rules_JSON, idle_stats_JSON) {
	const generatorsRules = json_getKey(idle_rules_JSON, `generators.${nameGenerator}`);
	const quantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	const startingCost = generatorsRules.cost[0].starting_cost;
	const multiplier_price = generatorsRules.cost[0].cost_multi_factor;
	const cost = calculateSellCost(startingCost, multiplier_price, quantity);
	return parseFloat(money) >= cost;
}

function buttonGeneratorsIsVisible(nameGenerator, idle_rules_JSON, idle_stats_JSON) {
	const requires = json_getKey(idle_rules_JSON, `generators.${nameGenerator}.requires`);
	const generatorsQuantity = json_getKey(idle_stats_JSON, `generators`);
	const currencyQuantity = json_getKey(idle_stats_JSON, `currencies`);
	
	const purchased = parseFloat(json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`)) > 0;
	const yetVisible = parseFloat(json_getKey(idle_stats_JSON, `generators.${nameGenerator}.visible`)) > 0;
	
	const requiresCurrencies = requires.currencies;
	const requiresGenerators = requires.generators;
	
	let isVisible = true;
	
	requiresCurrencies.forEach( req => {
		const nameCurrency = req.currency;
		const quantityCurrency =  parseFloat(req.quantity);
		const money = currencyQuantity[nameCurrency].quantity;
		const isPurchasable = parseFloat(money) >= quantityCurrency;
		isVisible = isVisible && isPurchasable;	
	});
	
	requiresGenerators.forEach( req => {
		const nameGenerator = req.generator;
		const quantityGenerator =  parseFloat(req.quantity);
		const money = generatorsQuantity[nameGenerator].quantity;
		const isPurchasable = parseFloat(money) >= quantityGenerator;
		isVisible = isVisible && isPurchasable;
	});
	
	const result = isVisible || purchased || yetVisible;
	
	return result;
}