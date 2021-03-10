import Chromosome from "./Chromosome.js";

export default class Population {
	constructor (goal, size){
		this.members = [];
		this.goal = goal;
		this.generationNumber = 0;
		while (size--) {
			const chromo = new Chromosome();
			const lenght = this.goal.length;
			chromo.random(lenght);
			this.members.push(chromo);
		}
	}
	
	sort() {
		this.members.sort( (a,b) => a.cost - b.cost );
	}
	
	async generation() {		
		for (let i = 0; i < this.members.length; i++) {
			const goal = this.goal;
			this.members[i].calcCost(goal);
		}
		
		this.sort();
		this.display();
		const children = this.members[0].crossover(this.members[1]);
		this.members.splice(this.members.length-2, 2, children[0], children[1]);
		
		for (let i = 0; i < this.members.length; i++) {
 			this.members[i].mutate(0.5);
			this.members[i].calcCost(this.goal);
			if(this.members[i].code == this.goal) {
				this.sort();
				this.display();
				this.signalEndEvolution();
				return true;
			}
		}
		
// 		if (this.generationNumber >= 10000) return true;
		this.generationNumber++;
		await new Promise(resolve => setTimeout(resolve, 10));
 		this.generation();
 		}
	
	display() {
		const textGeneration = g_runtime.objects.Generation.getFirstInstance();
		textGeneration.text = `Generation: ${this.generationNumber}`;
		
		const textPopulation = g_runtime.objects.Population.getFirstInstance();
		textPopulation.text = '';
 		for (let i = 0; i < this.members.length; i++){
			textPopulation.text += `${i+1}) ${this.members[i].code} (${this.members[i].cost})\n`
		}
	}
	
	signalEndEvolution() {
		g_runtime.callFunction("EnableButton");
	}
	
}
