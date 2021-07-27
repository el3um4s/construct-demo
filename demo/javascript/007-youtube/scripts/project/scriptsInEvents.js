"use strict";

import Globals from "./globals.js";
import * as YouTube from "./youTube.js";
import * as VideoYT from "./videoYT.js";


{
	const scriptsInEvents = {

		async Loader_Event1_Act2(runtime, localVars)
		{
			await YouTube.LoadAPI();
			g_runtime.globalVars.check_loading_youtube = true;
		},

		async Videoyt_Event2_Act1(runtime, localVars)
		{
			VideoYT.initializeVideo(localVars.iframeId);
		},

		async Videoyt_Event3_Act1(runtime, localVars)
		{
			await VideoYT.createVideo(localVars.iframeId);
		},

		async Videoyt_Event4_Act1(runtime, localVars)
		{
			VideoYT.cueVideoById(localVars.iframeId, localVars.videoId);
		},

		async Videoyt_Event5_Act1(runtime, localVars)
		{
			VideoYT.loadVideoById(localVars.iframeId, localVars.videoId);
			VideoYT.hideControls(localVars.iframeId);
		},

		async Videoyt_Event6_Act1(runtime, localVars)
		{
			VideoYT.loadVideoByUrl(localVars.iframeId, localVars.videoId);
		},

		async Videoyt_Event7_Act1(runtime, localVars)
		{
			VideoYT.loadPlaylist(localVars.iframeId, localVars.videoId);
		},

		async Videoyt_Event8_Act1(runtime, localVars)
		{
			VideoYT.loadPlaylist(localVars.iframeId, localVars.videoId);
			VideoYT.setShuffleTrue(localVars.iframeId);
			VideoYT.setLoopTrue(localVars.iframeId)
		},

		async Videoyt_Event9_Act1(runtime, localVars)
		{
			VideoYT.playVideo(localVars.iframeId);
		},

		async Videoyt_Event10_Act1(runtime, localVars)
		{
			VideoYT.playVideo(localVars.iframeId);
		},

		async Videoyt_Event11_Act1(runtime, localVars)
		{
			VideoYT.playVideo(localVars.iframeId);
		},

		async Videoyt_Event12_Act1(runtime, localVars)
		{
			VideoYT.playVideo(localVars.iframeId);
		},

		async Videoyt_Event13_Act1(runtime, localVars)
		{
			VideoYT.playVideo(localVars.iframeId);
		},

		async Videoyt_Event14_Act1(runtime, localVars)
		{
			VideoYT.pauseVideo(localVars.iframeId);
		},

		async Videoyt_Event15_Act1(runtime, localVars)
		{
			VideoYT.stopVideo(localVars.iframeId);
		},

		async Videoyt_Event16_Act1(runtime, localVars)
		{
			VideoYT.mute(localVars.iframeId);
		},

		async Videoyt_Event17_Act1(runtime, localVars)
		{
			VideoYT.unMute(localVars.iframeId);
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
