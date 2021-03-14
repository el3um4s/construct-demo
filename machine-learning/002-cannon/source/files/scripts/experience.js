export default class Experience {
	constructor({speed = 400, acceleration = 0, angleOfMotion = 1, fitness = 9999} = {speed:400, acceleration:0, angleOfMotio:1, fitness:9999}) {
		this.speed = speed;
		this.acceleration = acceleration;
		this.angleOfMotion = angleOfMotion;
		this.fitness = fitness;	
	}
	
	crossover(other) {
		const parentA = {speed: this.speed, acceleration: this.acceleration, angleOfMotion: this.angleOfMotion};
		const parentB = {speed: other.speed, acceleration: other.acceleration, angleOfMotion: other.angleOfMotion};

		const geneToExchange = choose("speed", "acceleration", "angleOfMotion");
		const propertyA = parentA[geneToExchange];
		const propertyB = parentB[geneToExchange];
		parentA[geneToExchange] = propertyB;
		parentB[geneToExchange] = propertyA;
		
		return [new Experience({...parentA}), new Experience({...parentB})];
	}
	
	mutate(chance) {
		if (Math.random() < chance) { return; }
		const modificator = Math.floor(Math.random() * Math.floor(20));
		const upOrDown = Math.random() <= 0.5 ? -modificator : modificator;
		const geneToMutate = choose("speed", "acceleration", "angleOfMotion");
		
		if (geneToMutate === "angleOfMotion") {
			this.angleOfMotion += (upOrDown * (Math.PI/180));
		} else {
			this[geneToMutate] += upOrDown;
		}
	}
	
	mutateConservative(chance, preserveFitness) {
		if (Math.random() < chance ) { return; }
		if (this.fitness <= preserveFitness) { return;	}
		
		const modificator = Math.floor(Math.random() * Math.floor(20));
		const upOrDown = Math.random() <= 0.5 ? -modificator : modificator;
		const geneToMutate = choose("speed", "acceleration", "angleOfMotion");
		
		if (geneToMutate === "angleOfMotion") {
			this.angleOfMotion += (upOrDown * (Math.PI/180));
		} else {
			this[geneToMutate] += upOrDown;
		}
	}
}


function choose(...args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}


