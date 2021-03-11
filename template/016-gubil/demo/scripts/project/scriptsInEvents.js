"use strict";



{
	const scriptsInEvents = {

		async Statistics_Event2_Act3(runtime, localVars)
		{
			const variable = localVars.ConnectToVars;
			const uid = localVars.UID;
			
			const statsValue = runtime.getInstanceByUid(uid)
			statsValue.text = variable;
			const value = runtime.globalVars[variable];
			statsValue.text = `${value}`;
		},

		async Save_Event3_Act1(runtime, localVars)
		{
			const key = localVars.KeyName;
			
			const Tier_Games = runtime.globalVars.Tier_Games;
			const Tier_Games_Give_Up = runtime.globalVars.Tier_Games_Give_Up;
			const Tier_Games_Level_Defeats = runtime.globalVars.Tier_Games_Level_Defeats;
			const Tier_Games_Level_Completed = runtime.globalVars.Tier_Games_Level_Completed;
			const Tier_Points = runtime.globalVars.Tier_Points;
			const Tier_Points_Gained = runtime.globalVars.Tier_Points_Gained;
			const Tier_Points_Lost = runtime.globalVars.Tier_Points_Lost;
			const Tier_Shoots = runtime.globalVars.Tier_Shoots;
			const Tier_Shoots_Hit = runtime.globalVars.Tier_Shoots_Hit;
			const Tier_Shoots_Lost = runtime.globalVars.Tier_Shoots_Lost;
			
			const Total_Games = runtime.globalVars.Total_Games;
			const Total_Games_Give_Up = runtime.globalVars.Total_Games_Give_Up;
			const Total_Games_Defeats = runtime.globalVars.Total_Games_Defeats;
			const Total_Games_Level_Completed = runtime.globalVars.Total_Games_Level_Completed;
			const Total_Points = runtime.globalVars.Total_Points;
			const Total_Points_Gained = runtime.globalVars.Total_Points_Gained;
			const Total_Points_Lost = runtime.globalVars.Total_Points_Lost;
			const Total_Shoots = runtime.globalVars.Total_Shoots;
			const Total_Shoots_Hit = runtime.globalVars.Total_Shoots_Hit;
			
			const value = {
				Tier_Games, 
				Tier_Games_Give_Up, 
				Tier_Games_Level_Defeats, 
				Tier_Games_Level_Completed, 
				Tier_Points, 
				Tier_Points_Gained,
				Tier_Points_Lost,
				Tier_Shoots,
				Tier_Shoots_Hit,
				Tier_Shoots_Lost,
				Total_Games,
				Total_Games_Give_Up,
				Total_Games_Defeats,
				Total_Games_Level_Completed,
				Total_Points,
				Total_Points_Gained,
				Total_Points_Lost,
				Total_Shoots,
				Total_Shoots_Hit
				};
			
			const storage = runtime.storage;
			await storage.setItem(key, value);
		},

		async Save_Event4_Act1(runtime, localVars)
		{
			const key = localVars.KeyName;
			const IsSoundOn = runtime.globalVars.IsSoundOn;
			
			const value = { IsSoundOn };
			
			const storage = runtime.storage;
			await storage.setItem(key, value);
		},

		async Save_Event5_Act1(runtime, localVars)
		{
			const key = localVars.KeyName;
			const storage = runtime.storage;
			const value = await storage.getItem(key);
			const listVariables = Object.keys(value);
			
			listVariables.forEach(k => runtime.globalVars[k] = value[k]);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
