import GameCoordinates from "./gameCoordinates.js"
//import * as Utils from "./utilities.js";
import { distanceBeetweenObjects, angleRadiansBeetweenObjects } from "./utils.js"

export const DIRECTION = {
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	BOTTOM: "BOTTOM"
};


function getInstanceByUid(uid) {
	return g_runtime.getInstanceByUid(uid);
}

export function createInstance(name = "Sprite") {
	return g_runtime.objects[name].createInstance(0, 0, 0);
}

export function deleteInstance(uid) {
	getInstanceByUid(uid).destroy();
	return uid;
}

export function moveInstanceToDirection(instance_UID, { direction = DIRECTION.DOWN, distance = 1 } = {}) {
	const instance = getInstanceByUid(instance_UID);
	const newCoords = new GameCoordinates(instance).getCoordinatesToDirection(direction, distance);
	instance.x = newCoords.x;
	instance.y = newCoords.y;
	return instance;
}

export function setInstanceToPosition(instance_UID, { x = 0, y = 0}) {
	const instance = getInstanceByUid(instance_UID);
	instance.x = x;
	instance.x = y;
	return instance;
}

export function setInstanceHeight(instance_UID, height = 0) {
	const instance = getInstanceByUid(instance_UID);
	instance.height = height;
	return instance;
}

export function setInstanceWidth(instance_UID, width = 0) {
	const instance = getInstanceByUid(instance_UID);
	instance.width = width;
	return instance;
}

export function setInstanceAngleRadians(instance_UID, angle = 0) {
	const instance = getInstanceByUid(instance_UID);
	instance.angle = angle
	return instance;
}
