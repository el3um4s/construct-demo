// Note for a full reference on the YouTube API, refer to the official documentation at:
// https://developers.google.com/youtube/iframe_api_reference

// Called on startup to load the YouTube API script.
// This method returns a promise so it can be conveniently awaited.

export function LoadAPI()
{
	const scriptTag = document.createElement("script");
	scriptTag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
	
	return new Promise(resolve =>
	{
		globalThis["onYouTubeIframeAPIReady"] = resolve;
	});
}

export function CreatePlayer(iframeId, eventHandlers)
{
	return new Promise(resolve =>
	{
		if (!eventHandlers)
			eventHandlers = {};		
		eventHandlers["onReady"] = (e => resolve(e.target));
		new globalThis["YT"]["Player"](iframeId, {
			"events": eventHandlers
		});
	});
}