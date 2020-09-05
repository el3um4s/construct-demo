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

function calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action = "add") {
// 	console.log("calculateSingleGeneratorIncome")
	const baseIncome_Array = json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`).filter( el => el.action == action);
// 	console.log("baseIncome_Array", baseIncome_Array)
	const generatorsQuantity = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.quantity`);
// 	console.log("generatorsQuantity", generatorsQuantity)
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);
// 	console.log("arrayNameCurrencies", arrayNameCurrencies)
	const temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
// 	console.log("temporaryBankCurrencies", temporaryBankCurrencies)
	if (baseIncome_Array.length > 0 ) {
		baseIncome_Array.forEach( i => temporaryBankCurrencies[i.currency] += calculateIncome(generatorsQuantity, i) );
	}
	return temporaryBankCurrencies;
}

// function calculateSingleGeneratorMultiplier(idle_rules_JSON, idle_stats_JSON, nameGenerator, action = "multiple") {
// 	const baseMultipliers_Array = json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`).filter( el => el.action == action);
// 	const generatorsMultiplier = json_getKey(idle_stats_JSON, `generators.${nameGenerator}.multiplier_income`);
		
// 	const arrayNameGenerators = getArrayNameGenerators(idle_rules_JSON);
// 	const temporaryStoreGenerators = createTemporaryObject(arrayNameGenerators);
	
// 	if (baseMultipliers_Array.length > 0 ) {
// 		baseMultipliers_Array.forEach( i => temporaryStoreGenerators[i.generator] += calculateIncome(generatorsMultiplier, i) );
// 	}
// 	return temporaryStoreGenerators;
// }

function calculateTotalGeneratorIncome(idle_rules_JSON, idle_stats_JSON) {
	const arrayNameGenerators = getArrayNameGenerators(idle_rules_JSON);
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);

	let temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
	console.log("----------------------------------------");
	console.log(temporaryBankCurrencies);
	console.log("----------------------------------------");
// 	const temporaryStoreGenerators = createTemporaryObject(arrayNameGenerators);
	
	arrayNameGenerators.forEach( nameGenerator => {
		
		const effects =json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
		const action = effects[0].action;
		
		if (action == "multiple") {
			const singleGeneratorIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action);
			console.log("MULTIPLE", singleGeneratorIncome);
		}
	});
	
	console.log("----------------------------------------");
	
	arrayNameGenerators.forEach( nameGenerator => {
		const effects =json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
		const action = effects[0].action;
		if (action == "add"){
			const singleGeneratorIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action);
			console.log("ADD", singleGeneratorIncome);
			const generatorMultiplicator =  json_getKey(idle_stats_JSON, `generators.${nameGenerator}.multiplier_income`);
			const income = addObjPropertyToProperty(temporaryBankCurrencies, singleGeneratorIncome);
			temporaryBankCurrencies = multipleObjPropertyToProperty(income, generatorMultiplicator);
		}
	});
	console.log("end addObjPropertyToProperty");
	console.log(temporaryBankCurrencies);
}





























