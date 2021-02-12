export function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}


// export function getRandom() { return Math.random(); }
// export function getRandomArbitrary(min = 0, max = 1) { return Math.random() * (max - min) + min; }

// export function getRandomInt(min = 0, max = 11) {
// 	min = Math.ceil(min);
// 	max = Math.floor(max);
//   	return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
// }

// export function getRandomIntInclusive(min = 1, max = 10) {
// 	min = Math.ceil(min);
// 	max = Math.floor(max);
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }


/*
let lerp = (a, b, x) =>  (1 - x) * a + b * x;
let unlerp = (a, b, x) =>  (x - a) / (b - a);
*/