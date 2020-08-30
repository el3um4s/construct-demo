runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })

// GENERAL - UTILITY
function waitForMillisecond(ms = 1) { return new Promise(res => setTimeout(res, ms)); }
function roundTenth(x = 0) { return Math.round((parseFloat(x)*10))/10; }
