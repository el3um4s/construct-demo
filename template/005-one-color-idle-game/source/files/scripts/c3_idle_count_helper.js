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

function calculateEffectGlobal_Currencies(effect, currency) {
	
}

function calculateTotalGeneratorIncome(idle_rules_JSON, idle_stats_JSON) {
	const arrayNameGenerators = getArrayNameGenerators(idle_rules_JSON);
	const arrayNameCurrencies = getArrayNameCurrencies(idle_rules_JSON);

	let temporaryBankCurrencies = createTemporaryObject(arrayNameCurrencies);
	const temporaryBankGenerators = createTemporaryObject_WithObjects(arrayNameGenerators);
	
	const temporaryGlobalEffectCurrencies = createTemporaryObject_WithObjects(arrayNameCurrencies);
	
	arrayNameCurrencies.forEach( nameCurrency => {
		temporaryGlobalEffectCurrencies[nameCurrency].multiplier_income = 1;
	});
	
	arrayNameGenerators.forEach( nameGenerator => {
		const effects =json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
		const action = effects[0].action;
		
		temporaryBankGenerators[nameGenerator].multiplier_income = 1;
		const effectGenerators = effects[0].generators[0];
		
		if (action == "multiple") {
			const singleGeneratorIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action);
			const nameCurrency = Object.keys(singleGeneratorIncome)[0];
			temporaryBankGenerators[nameGenerator].currency = nameCurrency;
			temporaryBankGenerators[nameGenerator].multiplier_income = singleGeneratorIncome[nameCurrency];
			//temporaryBankGenerators[effectGenerators][nameCurrency].multiplier_income += singleGeneratorIncome[nameCurrency];
			temporaryGlobalEffectCurrencies[nameCurrency].multiplier_income += effectGenerators == "ALL" ? singleGeneratorIncome[nameCurrency] : 0;
		}
	});
	
	console.log(temporaryBankGenerators);
		
	arrayNameGenerators.forEach( nameGenerator => {
		const effects =json_getKey(idle_rules_JSON, `generators.${nameGenerator}.effects`);
		const nameCurrency = effects[0].currency;
		const action = effects[0].action;
		if (action == "add"){
			const singleGeneratorIncome = calculateSingleGeneratorIncome(idle_rules_JSON, idle_stats_JSON, nameGenerator, action);
// 			const generatorMultiplicator =  temporaryBankGenerators[nameGenerator].multiplier_income;
			const income = addObjPropertyToProperty(temporaryBankCurrencies, singleGeneratorIncome);
			const incomeMultiplier = temporaryGlobalEffectCurrencies[nameCurrency].multiplier_income;
			temporaryBankCurrencies = multipleObjPropertyToProperty(income, incomeMultiplier);
			
		}
	});
	console.log("end addObjPropertyToProperty");
	console.log(temporaryBankCurrencies);
}





























