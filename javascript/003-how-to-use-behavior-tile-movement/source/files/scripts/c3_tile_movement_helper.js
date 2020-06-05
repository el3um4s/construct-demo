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


function SimulateControl_WithInputCode(uid, inputCode, {codeUP = 38, codeRIGHT = 39, codeDOWN = 40, codeLEFT = 37} = {}) {
	const direction = GetInputDirection(inputCode, {codeUP,codeRIGHT, codeDOWN, codeLEFT});
	const result = SimulateControl_WithDirection(uid, direction);
	return result
}

function SimulateControl_WithDirection(uid, direction) {
	const objectUID = g_runtime.getInstanceByUid(uid).behaviors.TileMovement;
	const canMove = CanMoveTo(uid, direction)
	if (canMove.canMove) objectUID.simulateControl(direction);
	return canMove.canMove;
}


function SetGridPosition_WithInputCode(uid, inputCode, {codeUP = 38, codeRIGHT = 39, codeDOWN = 40, codeLEFT = 37} = {}, immediate = true) {
	const direction = GetInputDirection(inputCode, {codeUP,codeRIGHT, codeDOWN, codeLEFT});
	const result = SetGridPosition_WithDirection(uid, direction, immediate);
	return result
}

function SetGridPosition_WithDirection(uid, direction, immediate = true) {
	const objectUID = g_runtime.getInstanceByUid(uid).behaviors.TileMovement;
	const canMove = CanMoveTo(uid, direction)
	if (canMove.canMove) objectUID.setGridPosition(canMove.x, canMove.y, immediate);
	return canMove.canMove;
}

function SimulateControl_PointToTarget (uid, targetUID, priority, lastDirection, immediate) {
	const objectUID = g_runtime.getInstanceByUid(uid);
	
	let newDirection = "NONE";
	
	let directions = GetDirectionsPossible(uid);

	if (directions.possibilities > 1) {
		directions = DeleteOppositeLastDirectionFromDirectionPossible(directions, lastDirection);
		} 	
	newDirection = GetRandomDirectionPossible(directions);

	const target = g_runtime.getInstanceByUid(targetUID);

	switch (priority.toLowerCase()) {
		case "vertical":
			if (objectUID.x > target.x && directions.left == 1) newDirection = "left";
			if (objectUID.x < target.x && directions.right == 1) newDirection = "right";
			if (objectUID.y > target.y && directions.top == 1) newDirection = "top";
			if (objectUID.y < target.y && directions.down == 1) newDirection = "down";
		break;
		case "horizontal":
			if (objectUID.y > target.y && directions.top == 1) newDirection = "top";
			if (objectUID.y < target.y && directions.down == 1) newDirection = "down";
			if (objectUID.x > target.x && directions.left == 1) newDirection = "left";
			if (objectUID.x < target.x && directions.right == 1) newDirection = "right";
		break;
	}
	
	SetGridPosition_WithDirection(uid, newDirection, immediate);
	return newDirection;
}

function CanMoveTo(uid, direction) {
	const objectUID = g_runtime.getInstanceByUid(uid).behaviors.TileMovement;
	const position = objectUID.getGridPosition();
	let x = position[0];
	let y = position[1];
	
	let canMove = false;

	switch (direction.toLowerCase()) {
		case "up":
			//x = x;
			y = y-1;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "right":
			x = x+1;
			//y = y;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "down":
			//x = x;
			y = y+1;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "left":
			x = x-1;
			//y = y;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		default:
			canMove = false;
		break;
	}
	
	return {canMove, x, y};
}

function GetInputDirection(inputCode, {codeUP = 38, codeRIGHT = 39, codeDOWN = 40, codeLEFT = 37} = {}) {
	let result = "NONE";
	switch (inputCode) {
		case codeUP:
			result = "up"
		break;
		case codeRIGHT:
			result = "right"
		break;
		case codeDOWN:
			result = "down"
		break;
		case codeLEFT:
			result = "left"
		break;
	}
	
	return result;
}


function GetDirectionsPossible(uid) {
	const directions = {
		"up": CanMoveTo(uid, "up").canMove ? 1 : 0,
		"right": CanMoveTo(uid, "right").canMove ? 1 : 0,
		"down": CanMoveTo(uid, "down").canMove ? 1 : 0,
		"left": CanMoveTo(uid, "left").canMove ? 1 : 0,
		"possibilities": 0
	};
	directions.possibilities = directions.up + directions.right + directions.down + directions.left;
	return directions;
}

function DeleteOppositeLastDirectionFromDirectionPossible(directions, lastDirection) {
	switch (lastDirection.toLowerCase()) {
		case "up":
			directions.down = 0;
			break;
		case "right":
			directions.left = 0;
			break;
		case "down":
			directions.up = 0;
			break;
		case "left":
			directions.right = 0;
			break;
	}
	directions.possibilities = directions.up + directions.right + directions.down + directions.left;
	return directions;
}

function ArrayDirectionsPossile(directions) {
	const directionsArray =[];
	if (directions.up > 0) directionsArray.push("up");
	if (directions.right > 0) directionsArray.push("right");
	if (directions.down > 0) directionsArray.push("down");
	if (directions.left > 0) directionsArray.push("left");
	return directionsArray;
}

function GetRandomDirectionPossible(directions) {
	const randomArray = ArrayDirectionsPossile(directions);
	let result = "NONE";
	if (randomArray.length == 1) {
		result = randomArray[0];
	} else {
		result = randomArray[Math.random() * randomArray.length | 0];
	}
	return result;	
}

