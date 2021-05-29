import Globals from "./globals.js";
import * as Standardize from "./standardize.js";

export async function getCurrentYear(year) {
	const data = await g_runtime.assets.fetchJson(`${year}.json`);
	Globals.currentYear.sql = data.result.sql;
	Globals.currentYear.year = `${year}`;
	
	const arrayData = data.result.records;

	for (const element of arrayData) {
		const nil = element.NIL;
		const findID = Standardize.orderNIL[nil];
		element.id = findID;
		element.families = parseInt(element.sum);
		element.name = nil.replace(/ *\([^)]*\) */g, "");
	}

	Globals.currentYear.data = arrayData;
}

export async function getAllYears(years, nil) {	
	const selection = {}
	for (const year of years) {
		const selected = await getOnlyOneYear(year, nil);
		let families = 0;
		selected.forEach(s => families+=s.families);
		selection[year] = families;
	}
	return selection;
}

export async function getTotalFamiliesMilan(years) {
	let nil = Object.entries(Standardize.orderNIL).map(([k, v]) => k);
	let setNil = new Set(nil)
	console.log("setNil");
	console.log(setNil);
	const selection = await getAllYears(years, setNil)
	console.log("selection");
	console.log(selection);
	return selection;
}

async function getOnlyOneYear(year, nil) {
	const data = await g_runtime.assets.fetchJson(`${year}.json`);
	const arrayData = data.result.records;

	for (const element of arrayData) {
		const nil = element.NIL;
		const findID = Standardize.orderNIL[nil];
		element.id = findID;
		element.families = parseInt(element.sum);
		element.name = nil.replace(/ *\([^)]*\) */g, "");
	}
	const result = arrayData.filter(item => nil.has(item.NIL));
	return result;
}

export function orderDataByFamilies(array, order = "asc") {
	const value = order === "desc" ? -1 : 1
	
	function compare( a, b ) {
	  if ( a.families < b.families ){
		return -value;
	  }
	  if ( a.families > b.families ){
		return value;
	  }
	  return 0;
	}
	
	array.sort(compare);
}

export function orderDataByID(array, order = "asc") {
	const value = order === "desc" ? -1 : 1
	
	function compare( a, b ) {
	  if ( a.id < b.id ){
		return -value;
	  }
	  if ( a.id > b.id ){
		return value;
	  }
	  return 0;
	}
	
	array.sort(compare);
}


export function orderDataByName(array, order = "asc") {
	const value = order === "desc" ? -1 : 1
	
	function compare( a, b ) {
	  if ( a.name < b.name ){
		return -value;
	  }
	  if ( a.name > b.name ){
		return value;
	  }
	  return 0;
	}
	
	array.sort(compare);
}
