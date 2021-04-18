import Globals from "./globals.js";
import * as Utils from "./utilities.js";

export default class PointsIntance extends globalThis.ISpriteInstance {
	constructor() {
		super();
		this.pointOrder = 0;
		this.pointStarter = {x: 0, y: 0};
		this.pointDestination = {x: 0, y: 0};
		this.pointDestinationVertex = null;
		this.previousVertex = [];
		this.rules = new Set();
		
		this.rules.add("normal"); // "normal", "not equal previous", "not equal pre-previous", "not adiacent previous"
	}
	
	static Create(nameObject, nameLayer, x, y) {
		return g_runtime.objects[nameObject].createInstance(nameLayer,x, y);
	}
	
	setOrder(order){
		this.pointOrder = order;
		return order;
	}
	
	getOrder() {
		return this.pointOrder;
	}
	
	setStarterPoint({x, y}) {
		this.pointStarter = {x, y};
		return {x, y};
	}
	
	addRule(rule) {
		this.rules.add(rule.toLowerCase());
		return this.rules;
	}
	
	deleteRule(rule) {
		this.rules.delete(rule.toLowerCase());
	}
	
	getRules() {
		return this.rules;
	}
	
	setPreviousVertex(vertex) {
		this.previousVertex = vertex;
		return this.previousVertex;
	}
	
	getPreviousVertex(vertex) {
		return this.previousVertex;
	}
	
	setRandomDestination(vertex) {
		const randomVertex = this._randomVertex(vertex);

		this.previousVertex.push(randomVertex);

		this.pointDestinationVertex = randomVertex;
		
		const startX = this.pointStarter.x;
		const startY = this.pointStarter.y;
		
		const distanceX = (startX - randomVertex.x)/2;
		const distanceY = (startY - randomVertex.y)/2;
	
		const x = startX - distanceX;
		const y = startY - distanceY;
	
		this.pointDestination = {x, y};
		return {x, y};
	}
	
	_randomVertex(vertex) {

		const uniqueSet = new Set(vertex);
		const previousVertex = this.previousVertex.length;

		if (uniqueSet.size > 3 && this.rules.has("not equal previous") && previousVertex >= 1) {

			const toDelete = this.previousVertex[previousVertex-1];
			uniqueSet.delete(toDelete);
		}
				
		if (uniqueSet.size > 3 && this.rules.has("not equal pre-previous") && previousVertex >= 2) {
			const toDelete = this.previousVertex[previousVertex-2];
			uniqueSet.delete(toDelete);
		}
		
		const vertexCleaned = [...uniqueSet];
		const index = Math.floor(Math.random() * vertexCleaned.length);
		const randomVertex = vertexCleaned[index];
		return randomVertex;
	}
	
	setDestinationToVertex() {
		const randomVertex = this.pointDestinationVertex;
		const startX = this.pointStarter.x;
		const startY = this.pointStarter.y;
		
		const distanceX = (startX - randomVertex.x)/2;
		const distanceY = (startY - randomVertex.y)/2;
	
		const x = startX - distanceX;
		const y = startY - distanceY;
	
		this.pointDestination = {x, y};
		return {x, y};
	}
	
	moveToStarterPoint() {
		const {x, y} = this.pointStarter;
		this.x = x;
		this.y = y;
		return {x, y};
	}
	
	moveToDestination() {
		const {x, y} = this.pointDestination;
		this.x = x;
		this.y = y;
		return {x, y};
	}
	
	colorPoint() {
		const color = this.pointDestinationVertex.colorRgb;
		this.colorRgb = color;
	}
}


const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

export const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})