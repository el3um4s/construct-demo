import * as YouTube from "./youTube.js";
import Globals from "./globals.js";


export function initializeVideo(iframeId){
	Globals.ytPlayer[iframeId] = {};
	Globals.ytPlayer[iframeId]["player"] = null;
}

export async function createVideo(iframeId) {
	Globals.ytPlayer[iframeId]["player"] = await YouTube.CreatePlayer(iframeId, {
		"onStateChange": e => { Globals.ytPlayer[iframeId]["state"] = e.data; },
		"onReady": e => {}
	});
	return true;
};

export function cueVideoById(iframeId, videoId) { Globals.ytPlayer[iframeId]["player"].cueVideoById(videoId); }
export function loadVideoById(iframeId, videoId) { Globals.ytPlayer[iframeId]["player"].loadVideoById(videoId); }
export function loadVideoByUrl(iframeId, videoId) {	Globals.ytPlayer[iframeId]["player"].loadVideoByUrl(videoId); }

export function loadPlaylist(iframeId, videoId) { Globals.ytPlayer[iframeId]["player"].loadPlaylist(Globals.playlist[videoId]); }

export function setLoopTrue(iframeId) {	Globals.ytPlayer[iframeId]["player"].setLoop(true); }
export function setLoopFalse(iframeId) { Globals.ytPlayer[iframeId]["player"].setLoop(false); }

export function setShuffleTrue(iframeId) {	Globals.ytPlayer[iframeId]["player"].setShuffle(true); }
export function setShuffleFalse(iframeId) { Globals.ytPlayer[iframeId]["player"].setShuffle(false); }

export function playVideo(iframeId) { Globals.ytPlayer[iframeId]["player"].playVideo(); }
export function pauseVideo(iframeId) { Globals.ytPlayer[iframeId]["player"].pauseVideo(); }
export function stopVideo(iframeId) { Globals.ytPlayer[iframeId]["player"].stopVideo(); }

export function setVolume(iframeId, volume) { Globals.ytPlayer[iframeId]["player"].setVolume(volume); }

export function mute(iframeId) { Globals.ytPlayer[iframeId]["player"].mute(); }
export function unMute(iframeId) { Globals.ytPlayer[iframeId]["player"].unMute(); }

export function lengthPlaylist(iframeId) { return Globals.ytPlayer[iframeId]["player"].getPlaylist().length; }
