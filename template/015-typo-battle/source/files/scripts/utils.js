export function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}

export function angleRadiansBeetweenObjects(firstObject = {}, secondObject = {}) { 
	const first = normalizePosition(firstObject);
	const second = normalizePosition(secondObject);
	
	return Math.atan2(second.y - first.y, second.x - first.x);
}

export function angleDegreesBeetweenObjects(firstObject = {}, secondObject = {}) { 
	const first = normalizePosition(firstObject);
	const second = normalizePosition(secondObject);
	
	return Math.atan2(second.y - first.y, second.x - first.x) * 180 / Math.PI;;
}

// Calculate the distance between two points.
export function distanceBeetweenObjects(firstObject = {}, secondObject = {}) {
	const first = normalizePosition(firstObject);
	const second = normalizePosition(secondObject);
		
	return Math.hypot(second.x - first.x, second.y - first.y); 
}

function normalizePosition (obj = {}) {
	let ob = {}; 
	ob.x = obj?.x ? obj.x : 0;
	ob.y = obj?.y ? obj.y : 0;
	return ob;
}