
// Options for addChild()
interface SceneGraphAddChildOpts {
	transformX?: boolean;
	transformY?: boolean;
	transformWidth?: boolean;
	transformHeight?: boolean;
	transformAngle?: boolean;
	transformZElevation?: boolean;
	transformOpacity?: boolean;
	transformVisibility?: boolean;
	destroyWithParent?: boolean;
}

// Options for setMeshPoint()
interface MeshPointOpts {
	mode?: "absolute" | "relative";
	x: number;
	y: number;
	zElevation?: number;
	u?: number;
	v?: number;
}

/** Represents an instance of an object that appears in a layout.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/iworldinstance | IWorldInstance documentation } */
declare class IWorldInstance extends IInstance
{
	readonly layout: IAnyProjectLayout;
	readonly layer: IAnyProjectLayer;

	x: number;
	y: number;
	setPosition(x: number, y: number): void;
	getPosition(): number[];
	offsetPosition(dx: number, dy: number): void;

	zElevation: number;
	readonly totalZElevation: number;

	width: number;
	height: number;
	setSize(w: number, h: number): void;
	getSize(): number[];

	angle: number;
	angleDegrees: number;

	getBoundingBox(): DOMRect;
	getBoundingQuad(): DOMQuad;

	isVisible: boolean;
	opacity: number;
	colorRgb: number[];
	blendMode: BlendModeParameter;

	moveToTop(): void;
	moveToBottom(): void;
	moveToLayer(layer: ILayer): void;
	moveAdjacentToInstance(otherInst: IWorldInstance, isAfter: boolean): void;
	readonly zIndex: number;

	isCollisionEnabled: boolean;
	containsPoint(x: number, y: number): boolean;
	testOverlap(inst: IWorldInstance): boolean;
	testOverlapSolid(): boolean;

	getParent(): IWorldInstance | null;
	getTopParent(): IWorldInstance | null;
	parents(): Iterable<IWorldInstance>;
	getChildCount(): number;
	getChildAt(index: number): IWorldInstance | null;
	children(): Iterable<IWorldInstance>;
	allChildren(): Iterable<IWorldInstance>;
	addChild(child: IWorldInstance, opts?: SceneGraphAddChildOpts): void;
	removeChild(child: IWorldInstance): void;
	removeFromParent(): void;

	createMesh(hsize: number, vsize: number): void;
	releaseMesh(): void;
	setMeshPoint(col: number, row: number, opts: MeshPointOpts): void;
	getMeshSize(): number[];
}
