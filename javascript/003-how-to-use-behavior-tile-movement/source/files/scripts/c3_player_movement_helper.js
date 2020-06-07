async function MovePlayer(uid, inputCode, returnImmediate = false, waitForNextMovement = 500 ) {
	const player = g_runtime.getInstanceByUid(uid);
	const originalPosition = player.behaviors.TileMovement.getGridPosition();

	const playerMoved = SetGridPosition_WithInputCode(uid, inputCode, {codeUP: g_runtime.globalVars.codeUP, codeRIGHT: g_runtime.globalVars.codeRIGHT, codeDOWN: g_runtime.globalVars.codeDOWN, codeLEFT: g_runtime.globalVars.codeLEFT}, g_runtime.globalVars.move_immediate == 1);
	
	const status = playerMoved ? "THE PLAYER HAS JUST MOVED" : "THE PLAYER CAN MOVE";
	SetStatus(status);
	
	if (status == "THE PLAYER CAN MOVE") return;
	
	const enemies = g_runtime.objects.Enemy.getAllInstances();

	for (let index = 0; index < enemies.length; index++) { 
    	const enemy = enemies[index];
		if (AreTwoObjectsInTheSamePlace(uid, enemy.uid)) {
			SetStatus("THE PLAYER ATTACKED AN ENEMY");
			ShakeScreen();
			await MoveToPositionWithWait(uid, originalPosition[0], originalPosition[1], returnImmediate, waitForNextMovement);
		}
 	}
}
