// These are some useful functions, often referred to as "utility
// functions", used in various places in the rest of the code.
// These methods are all exported, allowing other scripts to easily
// import all of them, or specific methods only, etc.

import GameCoordinates from "./gameCoordinates.js"

export const DIRECTION = {
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	BOTTOM: "BOTTOM"
};

export function waitForMillisecond(ms) { return new Promise(res => setTimeout(res, ms)); }

export function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}

export function createInstance(name = "Sprite") {
	return g_runtime.objects[name].createInstance(0, 0, 0);
}

export function deleteInstance(uid) {
	g_runtime.getInstanceByUid(uid).destroy();
	return uid;
}

export function moveInstance(uid, { direction = DIRECTION.DOWN, distance = 1 } = {}){
	const instance = g_runtime.getInstanceByUid(uid);
	const newCoords = new GameCoordinates(instance).getCoordinatesToDirection(direction, distance);
 	instance.x = newCoords.x;
 	instance.y = newCoords.y;
}

