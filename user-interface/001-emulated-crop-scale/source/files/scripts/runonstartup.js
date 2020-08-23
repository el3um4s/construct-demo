runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })
function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

function onResized() {
	console.log("resized");
	g_runtime.callFunction("onResized");
}

function onFullScreen() {
	console.log("full screen");
	setTimeout(function(){ g_runtime.callFunction("onResized"); }, 10);
}

runOnStartup(async runtime =>
{
	window.addEventListener("resize", () => onResized());
	window.addEventListener("fullscreenchange", () => onFullScreen());
});
