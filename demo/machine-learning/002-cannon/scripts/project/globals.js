const Globals = {
	WorldDefault: {
		gravity: 100,
		bounceOffSolids: true
	},
	RocketDefault: {
		speed: {
			min: 0,
			max: 1000
		},
		acceleration: {
			min: 0,
			max: 100
		},
		angle: {
			min: 0,
			max: 360
		}
	},
	Population: {
		rateMutation: 0.1,
		generation: null,
		size: 20,
		preserveFitness: 1000
	}
};


export default Globals;
