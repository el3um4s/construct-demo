/*
TO DO:
	- singleGenerator
	- totalGenerator
*/


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

function isCurrencyInStats(idle_stats_JSON, currency) {
	return Object.keys(idle_stats_JSON.currencies).includes(currency);
}


function calculateIncome(quantity = 0, { currency = "primary", base_income = "1"} = {}) {
	const obj = {};
	return obj[currency] = quantity * parseFloat(base_income);
}

function typeOfGeneratorEffect({action = "add"} = {}) { return action; }

function calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator) {
	const baseIncome_Array = json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
	const generatorsQuantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
	
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);
	const temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
	
	baseIncome_Array.forEach( i => temporaryBankCurrencies[i.currency] += calculateIncome(generatorsQuantity, i) );
	return temporaryBankCurrencies;
}

function calculateTotalGeneratorIncome(idle_rules_JSON, idle_stats_JSON) {
	const arrayNameGenerators = getArrayNameGenerators(idle_rules_JSON);
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);

	const temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
	const temporaryStoreGenerators = createTemporaryObject(arrayNameGenerators);
	
	// TO DO
	arrayNameGenerators.forEach( nameGenerator => console.log(calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator)))
}