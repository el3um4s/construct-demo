/*
 * c3_grid_system.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.08.21
 *
*/

function gridSystem_InitializeGrid(uid) {
	const element = g_runtime.getInstanceByUid(uid);

	element._grid_system = {
		_x_top_left: element.x,
		_y_top_left: element.y,
		_x_bottom_right: element.x + element.width,
		_y_bottom_right: element.y + element.height
	};
};

function gridSystem_PinToUID (uid, familyGrid = "GRID", pinToPoint = "center") {
	const element = g_runtime.getInstanceByUid(uid);
	element.isVisible = false;

	for (const gridInstance of g_runtime.objects[familyGrid].instances()) {
		const gridIsPinnedWithElement = gridInstance.instVars.Pin == element.instVars.grid;
		const layerIsVisible = gridInstance.layer.isVisible;
		if (gridIsPinnedWithElement && layerIsVisible) {
			element.isVisible = true;
			element.x = gridInstance.getImagePointX(pinToPoint);
			element.y = gridInstance.getImagePointY(pinToPoint);
			element.width = gridInstance.width;
			element.height = gridInstance.height;
		};
	};
};

function gridSystem_ResizeCell(uid, originalViewportWidth, originalViewportHeight) {
	const element = g_runtime.getInstanceByUid(uid);
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	let xTopLeft = element._grid_system._x_top_left;
	let yTopLeft = element._grid_system._y_top_left;
	let xBottomRight = element._grid_system._x_bottom_right;
	let yBottomRight = element._grid_system._y_bottom_right;

	if ( !!!element.instVars.X_Top_Left_Absolute ) {
		xTopLeft = (xTopLeft / originalViewportWidth) * windowWidth;
	}

	if ( !!!element.instVars.Y_Top_Left_Absolute ) {
		yTopLeft = (yTopLeft / originalViewportHeight) * windowHeight
	}

	if ( !!!element.instVars.X_Bottom_Right_Absolute ) {
		xBottomRight = (xBottomRight / originalViewportWidth) * windowWidth
	}

	if ( !!!element.instVars.Y_Bottom_Right_Absolute ) {
		yBottomRight = (yBottomRight/ originalViewportHeight) * windowHeight
	}

	element.x = xTopLeft;
	element.y = yTopLeft;
	element.width = xBottomRight - xTopLeft;
	element.height = yBottomRight - yTopLeft;
}