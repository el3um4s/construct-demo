/*
TO DO:
	- setPowerButtons
		- setPowerButtons_SetTexts
		- setPowerButtons_Show
		- setPowerButtons_SClickable
*/

function getVarForButtonGenerators(nameGenerator, idle_rules_JSON, idle_stats_JSON) {
	const generatorsRules = json_getKey(idle_rules_JSON, `generators.${nameGenerator}`);
	const name = generatorsRules.name;
	const icon = generatorsRules.icon;
	const labelEffect = generatorsRules.effects[0].action == "add" ?  "+ " : "x ";
	const valueEffect = generatorsRules.effects[0].base_income & " PPS";
	const effect = labelEffect & valueEffect;
	const quantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	const startingCost = generatorsRules.cost[0].starting_cost;
	const multiplier_price = generatorsRules.cost[0].cost_multi_factor;
	const cost = calculateSellCost(startingCost, multiplier_price, quantity);
	return {name, icon, quantity, effect, cost};
}