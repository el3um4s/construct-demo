/*
 * c3_tile_movement_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.06.07
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

	const objX = objectUID.x;
	const objY = objectUID.y;
	const targetX = target.x;
	const targetY = target.y;
	const directionHorizontalToTarget = objX <= targetX ? "left" : "right";
	const directionVerticalToTarget = objY >= targetY ? "top" : "down";
	switch (priority.toLowerCase()) {
		case "vertical":
			if (objX > targetX && directions.left == 1) newDirection = "left";
			if (objX < targetX && directions.right == 1) newDirection = "right";
			if (directions.left == 1 && directions.right == 1) newDirection = directionHorizontalToTarget;
			if (objY > targetY && directions.top == 1) newDirection = "top";
			if (objY < targetY && directions.down == 1) newDirection = "down";
			if (directions.top == 1 && directions.down == 1) newDirection = directionVerticalToTarget;
		break;
		case "horizontal":
			if (objY > targetY && directions.top == 1) newDirection = "top";
			if (objY < targetY && directions.down == 1) newDirection = "down";
			if (directions.top == 1 && directions.down == 1) newDirection = directionVerticalToTarget;
			if (objX > targetX && directions.left == 1) newDirection = "left";
			if (objX < targetX && directions.right == 1) newDirection = "right";
			if (directions.left == 1 && directions.right == 1) newDirection = directionHorizontalToTarget;
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
			y = y-1;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "right":
			x = x+1;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "down":
			y = y+1;
			canMove =  objectUID.canMoveTo(x,y);
		break;
		case "left":
			x = x-1;
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
	} else if (randomArray.length > 1)  {
		result = randomArray[Math.random() * randomArray.length | 0];
	}
	return result;	
}

function AreTwoObjectsInTheSamePlace(uidFirst, uidSecond) {
	const first = g_runtime.getInstanceByUid(uidFirst).behaviors.TileMovement.getGridPosition();
	const second = g_runtime.getInstanceByUid(uidSecond).behaviors.TileMovement.getGridPosition();
	return (first[0] == second[0] && first[1]==second[1]);
}

async function MoveToPositionWithWait(uid, x, y, returnImmediate = true, waitForNextMovement = 500) { // 3
  g_runtime.getInstanceByUid(uid).behaviors.TileMovement.setGridPosition(x, y, returnImmediate)
  await waitForMillisecond(waitForNextMovement);
}