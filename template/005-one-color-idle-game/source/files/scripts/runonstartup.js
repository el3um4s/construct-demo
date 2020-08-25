runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })
function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }