const MeshPremadeShapes = {
	pentagon: {
		meshSize: {
			columns: 3,
			rows: 2
		},
		points: [
			{col: 0, row: 0, x: 0.00, y: 0.39},
			{col: 1, row: 0, x: 0.50, y: 0.00},
			{col: 2, row: 0, x: 1.00, y: 0.39},
			{col: 0, row: 1, x: 0.20, y: 1.00},
			{col: 1, row: 1, x: 0.50, y: 1.00},
			{col: 2, row: 1, x: 0.80, y: 1.00},
		]
	},
	hexagon: {
		meshSize: {
			columns: 2,
			rows: 3
		},
		points: [
			{col: 0, row: 0, x: 0.25, y: 0.07},
			{col: 1, row: 0, x: 0.75, y: 0.07},
			{col: 0, row: 1, x: 0.00, y: 0.50},
			{col: 1, row: 1, x: 1.00, y: 0.50},
			{col: 0, row: 2, x: 0.25, y: 0.93},
			{col: 1, row: 2, x: 0.75, y: 0.93},
		]
	},
	octagon: {
		meshSize: {
			columns: 4,
			rows: 2
		},
		points: [
			{col: 0, row: 0, x: 0.00, y: 0.30},
			{col: 1, row: 0, x: 0.30, y: 0.00},
			{col: 2, row: 0, x: 0.70, y: 0.00},
			{col: 3, row: 0, x: 1.00, y: 0.30},
			{col: 0, row: 1, x: 0.00, y: 0.70},
			{col: 1, row: 1, x: 0.30, y: 1.00},
			{col: 2, row: 1, x: 0.70, y: 1.00},
			{col: 3, row: 1, x: 1.00, y: 0.70},
		]
	},
	star: {
		meshSize: {
			columns: 5,
			rows: 3
		},
		points: [
			{col: 0, row: 0, x: 0.00, y: 0.38},
			{col: 1, row: 0, x: 0.32, y: 0.30},
			{col: 2, row: 0, x: 0.50, y: 0.00},
			{col: 3, row: 0, x: 0.68, y: 0.30},
			{col: 4, row: 0, x: 1.00, y: 0.38},
			{col: 0, row: 1, x: 0.21, y: 0.65},
			{col: 4, row: 1, x: 0.79, y: 0.65},
			{col: 0, row: 2, x: 0.20, y: 1.00},
			{col: 1, row: 2, x: 0.50, y: 0.88},
			{col: 2, row: 2, x: 0.50, y: 0.88},
			{col: 3, row: 2, x: 0.50, y: 0.88},
			{col: 4, row: 2, x: 0.80, y: 1.00},
		]
	}
};

export default MeshPremadeShapes;