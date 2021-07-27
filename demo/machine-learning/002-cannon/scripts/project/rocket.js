import Globals from "./globals.js";
import Experience from "./experience.js";

export default class RocketInstance extends globalThis.ISpriteInstance {
	constructor() {
		super();
		
		this.behaviors.Bullet.bounceOffSolids = Globals.WorldDefault.bounceOffSolids;
		this.behaviors.Bullet.gravity = Globals.WorldDefault.gravity;
		
		this.ml_Fitness = 9999;
		this.ml_onCreation_speed = 400;
		this.ml_onCreation_acceleration = 400;
		this.ml_onCreation_angleOfMotion = 400;
	}
	
	randomize() {
		this.behaviors.Bullet.speed = getRandomArbitrary(Globals.RocketDefault.speed.min, Globals.RocketDefault.speed.max);
		this.behaviors.Bullet.acceleration = getRandomArbitrary(Globals.RocketDefault.acceleration.min, Globals.RocketDefault.acceleration.max);
		this.behaviors.Bullet.angleOfMotion = degreesToRadians(getRandomArbitrary(Globals.RocketDefault.angle.min, Globals.RocketDefault.angle.max));
		
		this.ml_onCreation_speed = this.behaviors.Bullet.speed;
		this.ml_onCreation_acceleration = this.behaviors.Bullet.acceleration;
		this.ml_onCreation_angleOfMotion = this.behaviors.Bullet.angleOfMotion;
	}
	
	fromDNA({speed=400, acceleration=0, angleOfMotion=1} = {speed:400, acceleration:0, angleOfMotion:1}){
		this.behaviors.Bullet.speed = speed;
		this.behaviors.Bullet.acceleration = acceleration;
		this.behaviors.Bullet.angleOfMotion = angleOfMotion;
		
		this.ml_onCreation_speed = this.behaviors.Bullet.speed;
		this.ml_onCreation_acceleration = this.behaviors.Bullet.acceleration;
		this.ml_onCreation_angleOfMotion = this.behaviors.Bullet.angleOfMotion;
	}
		
	calcFitness({x = 0, y = 0} = {x:0, y:0} ) {
		const rocketX = this.x;
		const rocketY = this.y;
		const distance = getDistance(rocketX, rocketY, x, y);
		this.ml_Fitness = Math.pow(distance,2);
	}
	
	preserveExperience() {
		const memory = new Experience({
							speed: this.ml_onCreation_speed,
							acceleration: this.ml_onCreation_acceleration,
							angleOfMotion: this.ml_onCreation_angleOfMotion,
							fitness: this.ml_Fitness
						});
		return memory;
	}
}



function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function degreesToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function getDistance(x1, y1, x2, y2) {
	const xs = Math.pow(x2 - x1, 2);
	const ys = Math.pow(y2 - y1, 2);	 
	return Math.sqrt( xs + ys );
};