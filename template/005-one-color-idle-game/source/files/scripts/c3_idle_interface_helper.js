function getVarForButtonGenerators(nameGenerator, idle_rules_JSON, idle_stats_JSON) {
	const generatorsRules = json_getKey(idle_rules_JSON, `generators.${nameGenerator}`);
	const name = generatorsRules.name;
	const icon = generatorsRules.icon;
	const description = generatorsRules.description;
	
	const quantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	const startingCost = generatorsRules.cost[0].starting_cost;
	const multiplier_price = generatorsRules.cost[0].cost_multi_factor;
	const cost = calculateSellCost(startingCost, multiplier_price, quantity);
	const next_effect = calculateSingleGeneratorIncome_WithMultipierApplied(idle_rules_JSON, idle_stats_JSON, nameGenerator);
	const every_x_seconds = generatorsRules.effects[0].timer_seconds;

	const action = generatorsRules.effects[0].action;
	const actionCurrency = generatorsRules.effects[0].currency;
	const labelCurrency = json_getKey(idle_rules_JSON, `currencies.${actionCurrency}.label`);
	const base_income = generatorsRules.effects[0].base_income;
	const actual_effect = parseFloat(quantity) > 0 ? parseFloat(next_effect) / parseFloat(quantity) : parseFloat(base_income);
	
	let effect = "";
	
	if (action == "add"){
		effect = `${convertNumberToIdleString(actual_effect)} ${labelCurrency} every ${convertNumberToIdleString(every_x_seconds)}sec`
	} else if (action == "multiple") {
		
		const generators = generatorsRules.effects[0].generators;
		const listGenerators = generators[0] == "ALL" ? "All" : generators.join(", ");
		effect = `x${convertNumberToIdleString(base_income)} ${labelCurrency} for ${listGenerators}`;
	}

	const listRequireCurrencies = generatorsRules.requires.currencies;
	const listRequireGenerators = generatorsRules.requires.generators;
	
	let listRequires = ""
	
	if (listRequireCurrencies.length > 0) {
		listRequireCurrencies.forEach( req => {
			const quantity = req.quantity;
			const currency = req.currency;
			const name = json_getKey(idle_rules_JSON, `currencies.${currency}.label`);
			listRequires = `${listRequires}\n${quantity} ${name}`;
		})
	}
	
	if (listRequireGenerators.length > 0) {
		listRequireGenerators.forEach( req => {
			const quantity = req.quantity;
			const generator = req.generator;
			const name = json_getKey(idle_rules_JSON, `generators.${generator}.label`);
			listRequires = `${listRequires}\n${quantity} ${name}`;
		})
	}

	return {name, icon, description, quantity, effect, cost, every_x_seconds, next_effect, listRequires};
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
		const quantityGenerator = parseFloat(req.quantity);

		const hasMoney =  Object.keys(generatorsQuantity).includes(nameGenerator);

		const money = hasMoney ? generatorsQuantity[nameGenerator].quantity : "0";
		const isPurchasable = parseFloat(money) >= quantityGenerator;
		isVisible = isVisible && isPurchasable;		
	});
	
	const result = isVisible || purchased || yetVisible;
	
	return result;
}