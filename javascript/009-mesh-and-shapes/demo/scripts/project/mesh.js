export function createMesh(instance, {columns = 2, rows = 2} = {}) { instance.createMesh(columns, rows); }
export function removeMesh(instance) { instance.releaseMesh(); }
export function setMeshPointRelative(instance, {col = 0, row = 0, x = 1, y = 1} = {}) { instance.setMeshPoint(col, row, {mode: "relative", x, y}); }
export function setMeshPointAbsolute(instance, {col = 0, row = 0, x = 0.5, y = 0.5} = {}) {	instance.setMeshPoint(col, row, {mode: "absolute", x, y}); }

export function getMeshSize(instance) { 
	const meshSize = instance.getMeshSize();
	const rows = meshSize[0];
	const columns = meshSize[1];
	return {rows, columns, lastRow: rows - 1, lastColumn: columns - 1};
}

export function setSizeShape(instance, shape){
	const columns = shape.meshSize.columns;
	const rows = shape.meshSize.rows;
	createMesh(instance, { columns, rows });
}

export function drawShape(instance, shape) {
	const points = shape.points;
	points.forEach(point => setMeshPointAbsolute(instance, point));
	return instance;
}

export function randomize(instance, { min = -0.5, max = 0.5 } = {}) {
	const { lastRow } = getMeshSize(instance);
	for (let row = 0; row < lastRow; row++){
		randomizeRow(instance, {row, min, max});
	}
	return instance;
}

export function randomizeMargins(instance, { min = -0.5, max = 0.5 } = {}){
	const { lastRow, lastColumn } = getMeshSize(instance);
	randomizeRow(instance, {row: 0, min, max});
	randomizeRow(instance, {row: lastRow, min, max});
	randomizeColumn(instance, {col: 0, min, max});
	randomizeColumn(instance, {col: lastColumn, min, max});
	return instance;
}

export function randomizeRow(instance, {row = 0, min = -0.5, max = 0.5 } = {}) {
	const { columns } = getMeshSize(instance);
	for (let col = 0; col < columns; col++) {
  		const value = getRandomArbitraryXY(min, max);
		setMeshPointRelative(instance, {col, row, ...value});
	}
	return instance;
}

export function randomizeColumn(instance, {col = 0, min = -0.5, max = 0.5 } = {}) {
 	const { rows } = getMeshSize(instance);
	for (let row = 0; row < rows; row++) {
  		const value = getRandomArbitraryXY(min, max);
		setMeshPointRelative(instance, {col, row, ...value});
	}
	return instance;
}

function getRandomArbitraryXY(min, max) {
	return {
		x: getRandomArbitrary(min, max),
		y: getRandomArbitrary(min, max)
	};
}

function getRandomArbitrary(min = 0, max = 1) { return Math.random() * (max - min) + min; }
