"use strict";

import Globals from "./globals.js";
import * as Standardize from "./standardize.js";
import * as SourceData from "./sourceData.js";
import * as ManageItems from "./manageItems.js";


{
	const scriptsInEvents = {

		async Main_Event11_Act1(runtime, localVars)
		{
			const data = Globals.currentYear.data;
			const families = data.reduce( (acc, cur) => acc + cur.families, 0);
			const total = runtime.objects.SumFamiliesTotals.getFirstInstance();
			total.text = `${families}`;
		},

		async Main_Event26_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.add(NIL);
		},

		async Main_Event27_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.delete(NIL);
		},

		async Main_Event34_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.add(NIL);
		},

		async Main_Event35_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.delete(NIL);
		},

		async Main_Event40_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.add(NIL);
		},

		async Main_Event41_Act2(runtime, localVars)
		{
			const NIL = localVars.NIL;
			Globals.selected.delete(NIL);
		},

		async Main_Event45_Act1(runtime, localVars)
		{
			const quantity = Globals.currentYear.data.length;
			ManageItems.createItems(quantity);
		},

		async Main_Event46_Act1(runtime, localVars)
		{
			await SourceData.getCurrentYear(localVars.Year);
			
		},

		async Main_Event47_Act1(runtime, localVars)
		{
			const orderBy = localVars.orderBy;
			const order = localVars.order;
			
			if (orderBy === "families") { SourceData.orderDataByFamilies(Globals.currentYear.data, order); }
			if (orderBy === "id") {	SourceData.orderDataByID(Globals.currentYear.data, order); }
			if (orderBy === "name") { SourceData.orderDataByName(Globals.currentYear.data, order); }
			
			const items = runtime.objects.Item.getAllInstances();
			items.forEach( (item, i) => {
				const {id, families, name, NIL} = Globals.currentYear.data[i];
				item.instVars.Order = i;
				item.instVars.ID = `${id}`;
				item.instVars.Families = families;
				item.instVars.NILname = `${name}`;
				item.instVars.NIL = `${NIL}`;
			})
		},

		async Main_Event48_Act1(runtime, localVars)
		{
			const years = Globals.years;
			Globals.histogram = await SourceData.getAllYears(years, Globals.selected);
			Globals.totalFamiliesMilan = await SourceData.getTotalFamiliesMilan(years);
			
			let maxFamilies = 0;
			
			const selector = runtime.globalVars.Selector;
			
			if (selector === "District"){
				for (const year of years) {
					maxFamilies = Globals.histogram[year] > maxFamilies ? Globals.histogram[year] : maxFamilies
				};
			} else {
				for (const year of years) {
					maxFamilies = Globals.totalFamiliesMilan[year] > maxFamilies ? Globals.totalFamiliesMilan[year] : maxFamilies
				};
			}
			
			const histogramBars = runtime.objects.HistogramBar.getAllInstances();
			histogramBars.forEach( (bar) => {
				const year = bar.instVars.Year;
				bar.instVars.MaxFamilies = maxFamilies;
				const families = Globals.histogram[year];
				bar.instVars.Families = families;
			})
		},

		async Main_Event49_Act1(runtime, localVars)
		{
			Globals.selected.clear();
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
