import Globals from "./globals.js";
import RocketInstance from "./rocket.js";
import Experience from "./experience.js";

export default class Population {
	constructor() {
		this.members = [];
		this.generationNumber = 0;
	}
	
	reset() {
		this.members = [];
		this.generationNumber = 0;
	}
	
	createRandomGeneration(size) {
		while (size--) {
			const rocket = createRocket();
			rocket.randomize();
		}
	}
		
	add(experience) { this.members.push(experience);	}
	clear() { this.members = []; }
	sort() { this.members.sort( (a,b) => a.fitness - b.fitness );}
	
	
	generation() {
		this.sort();
		
		const first = this.members[0];
		const second = this.members[1];
		const childrenFromBest = first.crossover(second);
		const third = childrenFromBest[0];
		const fourth = childrenFromBest[1];
				
 		const generationEvolving = [...this.members];
		
 		generationEvolving.pop();
 		generationEvolving.pop();
		generationEvolving.pop();
 		generationEvolving.pop();
		
//  	generationEvolving.forEach(el => el.mutate(Globals.Population.rateMutation));
		generationEvolving.forEach(el => el.mutateConservative(Globals.Population.rateMutation, Globals.Population.preserveFitness));
		
		const sizePopolationTarget = Globals.Population.size - 4;
		
		while (generationEvolving.length < sizePopolationTarget) {
			const randomParentA = generationEvolving[Math.floor(Math.random() * generationEvolving.length)];
			const randomParentB = generationEvolving[Math.floor(Math.random() * generationEvolving.length)];
			const childrens = randomParentA.crossover(randomParentB);
			generationEvolving.push(...childrens);
		}
		
		while (generationEvolving.length > sizePopolationTarget) {
			generationEvolving.splice(Math.floor(Math.random()*generationEvolving.length), 1);
		}
		
 		generationEvolving.push(fourth, third, second, first);
		this.generationNumber++;
 		this.createGenerationFromDNA(generationEvolving);
		
		
		this.clear();
	}
	
	
	createGenerationFromDNA(list) {
		this.trackingUID = [];
		list.forEach(el => {
			const rocket = createRocket();
			rocket.fromDNA(el);
		})
	}
	
	report(){
		this.sort();
		const population = this.members.length;
		const best = this.members[0];
		const totalFitness = this.members.reduce((a,p) => { return a+p.fitness; },0);
		const average = totalFitness/population;
		const generationNumber = this.generationNumber;

		const result = {
			generationNumber,
			population,
			best,
			totalFitness,
			average
		}
		
		return result;
	}
}


function createRocket() {
	const cannon = g_runtime.objects.Cannon.getFirstInstance();
	const imagePoint = cannon.getImagePoint("Fire");
	const x = imagePoint[0];
	const y = imagePoint[1];
	const rocket = g_runtime.objects.Rocket.createInstance("PlayingField", x, y);
	return rocket;
}

