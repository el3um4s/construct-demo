async function Move_Enemies(targetUID, immediate = true, returnImmediate = false, waitForNextMovement = 500) {
	const enemies = g_runtime.objects.Enemy.getAllInstances();

	for (let index = 0; index < enemies.length; index++) { 
    	const enemy = enemies[index];
		await MoveEnemy(enemy, targetUID, immediate, returnImmediate, waitForNextMovement);
 	}
}

async function MoveEnemy(enemy, targetUID, immediate = true, returnImmediate = false, waitForNextMovement = 500) { 
	const uid = enemy.uid;
	const priority = enemy.instVars.Priority;
	const lastDirection = enemy.instVars.LastDirection;
	const originalPosition = enemy.behaviors.TileMovement.getGridPosition();
	const tempLastDirection = SimulateControl_PointToTarget(uid, targetUID, priority, lastDirection, immediate);
	
	// se il nemico si è mosso e il nemico è nella stessa posizione del giocatore
	if (tempLastDirection != "NONE" && AreTwoObjectsInTheSamePlace(enemy.uid, targetUID)) {
		ShakeScreen();
		await MoveToPositionWithWait(enemy.uid, originalPosition[0], originalPosition[1], returnImmediate, waitForNextMovement);
	} else {
		enemy.instVars.LastDirection = tempLastDirection;
	}
}