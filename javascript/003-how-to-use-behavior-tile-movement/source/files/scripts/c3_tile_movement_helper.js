/*
 * c3_tile_movement_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.06.05
 *
*/

function SimulateControl(uid, direction) {
	const objectUID = g_runtime.getInstanceByUid(uid).behaviors.TileMovement;
	const canMove = CanMoveTo(uid, direction)
	if (canMove) objectUID.simulateControl(direction);
	return canMove;
}

function CanMoveTo(uid, direction) {
	const objectUID = g_runtime.getInstanceByUid(uid).behaviors.TileMovement;
	const position = objectUID.getGridPosition();
	const x = position[0];
	const y = position[1];
	
	let canMove = false;

	switch (direction.toLowerCase()) {
		case "left":
			canMove =  objectUID.canMoveTo(x-1,y);
		break;
		case "right":
			canMove =  objectUID.canMoveTo(x+1,y);
		break;
		case "up":
			canMove =  objectUID.canMoveTo(x,y-1);
		break;
		case "down":
			canMove =  objectUID.canMoveTo(x,y+1);
		break;
		default:
			canMove = false;
		break;
	}
	
	return canMove;
}