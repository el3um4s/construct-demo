import PointsIntance from "./point.js";

export function generateAllPoints({ quantity, vertex, nameObject, nameLayer, show, rules }) {
	let x = choose(vertex).x;
	let y = choose(vertex).y;
	
	let previousVertex = [];
	
	for (let i = 0; i < quantity; i++){
		const point = PointsIntance.Create(nameObject,nameLayer, x, y);
		point.isVisible = show;
		point.setOrder(i);
		rules.forEach(r => point.addRule(r));
		point.setStarterPoint({x, y});
 		point.moveToStarterPoint();
		point.setPreviousVertex(previousVertex);
		const randomDestination = point.setRandomDestination(vertex);
		previousVertex = point.getPreviousVertex();
 		point.moveToDestination();
		x = randomDestination.x;
		y = randomDestination.y;
		point.colorPoint();
	}	
}

export function moveAllPoints({points, vertex, show}) {
	let x = choose(vertex).x;
	let y = choose(vertex).y;
	const quantity = points.length;
	
	points.sort( (a,b) => (a.getOrder() > b.getOrder()) ? 1 : 0 )

	for (let i = 0; i < quantity; i++){
		const point = points[i];
		point.isVisible = show;
		point.setStarterPoint({x, y});
 		point.moveToStarterPoint();
		const randomDestination = point.setDestinationToVertex();
 		point.moveToDestination();
		x = randomDestination.x;
		y = randomDestination.y;
	}	
}


export function regenerateAllPoints({points, vertex, show}) {
	let x = choose(vertex).x;
	let y = choose(vertex).y;
	const quantity = points.length;
	let previousVertex = [];
	
	for (let i = 0; i < quantity; i++){
		const point = points[i];
		point.isVisible = show;
		point.setOrder = i;
		point.setStarterPoint({x, y});
 		point.moveToStarterPoint();
		point.setPreviousVertex(previousVertex);
		const randomDestination = point.setRandomDestination(vertex);
		previousVertex = point.getPreviousVertex();
 		point.moveToDestination();
		x = randomDestination.x;
		y = randomDestination.y;
		point.colorPoint();
	}	
}

export function changeQuantityPoints({quantity, points, vertex, show}) {
	const actualQuantity = points.length;
	points.sort( (a,b) => (a.getOrder() > b.getOrder()) ? 1 : 0 );
	
	if (quantity < actualQuantity) {
		const quantityToRemove = actualQuantity - quantity;
		removePoints({points, quantityToRemove});
	} else if (quantity > actualQuantity & actualQuantity > 0) {
		addPoints({ quantity, points, vertex, show })
	}
}

function removePoints({points, quantityToRemove}) {
	points.sort( (a,b) => (a.getOrder() > b.getOrder()) ? 1 : 0 );
	const actualQuantity = points.length-1;
	for (let i = 0; i < quantityToRemove; i++){
		const point = points[actualQuantity-i];
		point.destroy();
	}
}

function addPoints({ quantity, points, vertex, show }){
	points.sort( (a,b) => (a.getOrder() > b.getOrder()) ? 1 : 0 );
	const actualQuantity = points.length;
	let x = points[actualQuantity-1].x;
	let y = points[actualQuantity-1].y;
	let previousVertex = points[actualQuantity-1].previousVertex;
	
	const nameObject = points[actualQuantity-1].objectType.name;
	const layer = points[actualQuantity-1].layer.name;
	const nameLayer = points[actualQuantity-1].layer.name;
	
	for (let i = actualQuantity; i < quantity; i++){
		const point = PointsIntance.Create(nameObject,nameLayer, x, y);
		point.isVisible = show;
		point.setOrder(i);
		point.setStarterPoint({x, y});
 		point.moveToStarterPoint();
		point.setPreviousVertex(previousVertex);
		const randomDestination = point.setRandomDestination(vertex);
		previousVertex = point.getPreviousVertex();
 		point.moveToDestination();
		x = randomDestination.x;
		y = randomDestination.y;
		point.colorPoint();
	}
}

export function recolorAllPoints(points) {
	points.forEach( point => point.colorPoint());
}

function choose(args) {
    const index = Math.floor(Math.random() * args.length);
    return args[index]
}

