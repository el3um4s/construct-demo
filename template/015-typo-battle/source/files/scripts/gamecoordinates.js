export default class GameCoordinates {
	constructor( { x = 0, y = 0 } = {} ){
		this.x = x;
		this.y = y;
		
		this.UP = "UP";
		this.DOWN = "DOWN";
		this.LEFT = "LEFT";
		this.RIGHT = "RIGHT";
	}
	
	getCoordinates() { return {x: this.x, y: this.y}; }
	getX() { return this.x; }
	getY() { return this.y; }
	
	getCoordinatesToDirection(direction, distance) {
		const newCoords = {x: this.x, y: this.y};

		match(direction.toUpperCase())
			.on(dir => dir == this.UP || dir == "U", () => newCoords.y -= distance )
			.on(dir => dir == this.DOWN || dir == "D", () => newCoords.y += distance )
			.on(dir => dir == this.LEFT || dir == "L", () => newCoords.x -= distance )
			.on(dir => dir == this.RIGHT || dir == "R", () => newCoords.x += distance);
		
		return newCoords;
	}	
	
	setCoordinates({ x = 0, y = 0 } = 0) { 
		this.x = x;
		this.y = y;
		return {x, y};
	}
	
	setX({ x = 0} = {}) { this.x = x; return this.getCoordinates(); }
	setY({ y = 0} = {}) { this.y = y; return this.getCoordinates(); }
	
	setCoordinatesToDirection(direction, distance) {
		const newCoords = this.getCoordinatesToDirection(direction, distance)
		return this.setCoordinates(newCoords);
	}
}

const matched = x => ({
  on: () => matched(x),
  otherwise: () => x,
})

const match = x => ({  
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x),
})
