export function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}
