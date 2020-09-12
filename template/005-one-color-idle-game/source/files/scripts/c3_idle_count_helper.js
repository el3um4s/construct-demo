function getArrayNameCurrencies(idle_rules_JSON) {
	const generators = json_getKey(idle_rules_JSON, `currencies`);
	const result = Array.from(Object.keys(generators));
	return result;
}

function getArrayNameGenerators(idle_rules_JSON) {
	const generators = json_getKey(idle_rules_JSON, `generators`);
	const result = Array.from(Object.keys(generators));
	return result;
}

function createTemporaryObject(arrayKeys) {
	const result = {};
	arrayKeys.forEach( (p) => result[p]=0);
	return result;
}

function createTemporaryObject_WithObjects(arrayKeys) {
	const result = {};
	arrayKeys.forEach( (p) => result[p]={});
	return result;
}

function addObjPropertyToProperty(objOriginal, objWithData) {
	const clone = { ...objOriginal };
	Object.keys(objWithData).forEach( k => clone[k] += parseFloat(objWithData[k]));
	return clone
}

function multipleObjPropertyToProperty(objOriginal, x) {
	const clone = { ...objOriginal };
	Object.keys(objOriginal).forEach( k => clone[k] *= parseFloat(x));
	return clone
}

function isCurrencyInStats(idle_stats_JSON, currency) {
	return Object.keys(idle_stats_JSON.currencies).includes(currency);
}

function calculateIncome(quantity = 0, { currency = "primary", base_income = "1"} = {}) {
	const obj = {};
	const result = quantity * parseFloat(base_income);
	return obj[currency] = result;
}

function typeOfGeneratorEffect({action = "add"} = {}) { return action; }

function calculateSellCost(startingCost, multiplier_price, quantity) {
	const result = parseFloat(startingCost) * (parseFloat(multiplier_price) ** parseFloat(quantity))
	return result;
}

function calculateSingleGeneratorIncome_WithMultipierApplied(idle_rules_JSON, idle_stats_JSON, nameGenerator) {
	const singleIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator);
	const multipiers = calculateGeneratorsMultiplier (idle_rules_JSON, idle_stats_JSON);
	const singleMultiplier = multipiers[nameGenerator];
	const nameCurrency = Object.keys(singleIncome)[0];
	const income = singleIncome[nameCurrency];
	const multiplier = singleMultiplier[nameCurrency].multiplier_income;
	const result = parseFloat(income) * parseFloat(multiplier);
	return result;
}

function calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action = "add") {
	const baseIncome_Array = json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`).filter( el => el.action == action);
	const generatorsQuantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);
	const temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
	if (baseIncome_Array.length > 0 ) {
		baseIncome_Array.forEach( i => temporaryBankCurrencies[i.currency] += calculateIncome(generatorsQuantity, i) );
	}
	return temporaryBankCurrencies;
}


function calculateGeneratorsMultiplier (idle_rules_JSON, idle_stats_JSON) {
	const arrayNameGenerators = getArrayNameGenerators(idle_rules_JSON);
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);
	const temporaryBankGenerators = createTemporaryObject_WithObjects(arrayNameGenerators);

	arrayNameGenerators.forEach( nameGenerator => {
		const effects =json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
		const action = effects[0].action;
		
		arrayNameCurrencies.forEach( nameCurrency => {
			temporaryBankGenerators[nameGenerator] = {};
			temporaryBankGenerators[nameGenerator][nameCurrency] = {};
			temporaryBankGenerators[nameGenerator][nameCurrency].multiplier_income = 1;
		});
	
		const effectGenerators = effects[0].generators[0];

		if (action == "multiple") {
			const singleGeneratorIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action);
			const nameCurrency = Object.keys(singleGeneratorIncome)[0];
			if (effectGenerators == "ALL") {
				arrayNameGenerators.forEach ((nameGenerator) => {
					temporaryBankGenerators[nameGenerator][nameCurrency].multiplier_income +=  singleGeneratorIncome[nameCurrency];
				});
			}
			
			if (effectGenerators != "ALL"){
				temporaryBankGenerators[effectGenerators][nameCurrency].multiplier_income +=  singleGeneratorIncome[nameCurrency];
			}
		}
	});
	
	arrayNameGenerators.forEach(nameGenerator => {
		arrayNameCurrencies.forEach( nameCurrency => {
			const income = temporaryBankGenerators[nameGenerator][nameCurrency].multiplier_income;
			temporaryBankGenerators[nameGenerator][nameCurrency].multiplier_income -= income > 1 ? 1 : 0;
		});
	});
	
	return temporaryBankGenerators;
}


























