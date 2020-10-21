runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })

function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}
