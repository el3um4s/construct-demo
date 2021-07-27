export function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}


const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

export const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})