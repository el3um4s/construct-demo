let cards = {};

runOnStartup(async runtime =>
{
	globalThis.g_runtime  =  runtime;
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	cards = await runtime.assets.fetchJson("cards.json");
	//console.log(cards);
}


function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }
function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}
