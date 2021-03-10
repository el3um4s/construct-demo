export default class Chromosome {
	constructor(code) {
		this.code = code ?? '';
		this.cost = 9999;
	}
	
	random(length) {
		while (length--) {
			this.code += String.fromCharCode(Math.floor(Math.random()*255));
		}
	}
	
	calcCost(compareTO) {
		let total = 0;
		for (let i = 0; i < this.code.length; i++) {
			total += Math.pow(this.code.charCodeAt(i) - compareTO.charCodeAt(i), 2);
		}
		this.cost = total;
	}
	
	crossover(chromosome) {
		const pivot = Math.round(this.code.length / 2) - 1;
		
		const child1 = this.code.substr(0, pivot) + chromosome.code.substr(pivot);
		const child2 = chromosome.code.substr(0, pivot) + this.code.substr(pivot);
		
		return [new Chromosome(child1), new Chromosome(child2)];
	}
	
	mutate(chance) {
		if (Math.random() < chance) { return; }
		
		const index = Math.floor(Math.random()*this.code.length);
		const upOrDown = Math.random() <= 0.5 ? -1 : 1;
		const newChar = String.fromCharCode(this.code.charCodeAt(index) + upOrDown);
		let newString = '';
		
		for (let i = 0; i < this.code.length; i++) {
			if ( i == index ) {
				newString += newChar;
			} else {
				newString += this.code[i];
			}
		}
		this.code = newString;
	}
	
	mutateMulti(chance, n) {
		const number = this.code.length < n ? this.code.length : n;
		for (let i = 0; i < number ; i++) {
			this.mutate(chance);
		}
	}
}

