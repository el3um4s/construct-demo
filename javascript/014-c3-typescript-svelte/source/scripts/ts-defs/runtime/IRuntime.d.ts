
/** The global runOnStartup() function is called by Construct on startup, while the
 * loading screen is still showing, as the first point of entry in to the engine.
 * Typically a runtime event listener will be added for the next event of interest,
 * such as "beforeprojectstart". */
declare function runOnStartup(callback: (runtime: IRuntime) => void | Promise<void>): void;

// General runtime type definitions
type LayoutParameter = string | number;
type LayerParameter = string | number;
type ImagePointParameter = string | number;
type BlendModeParameter = "normal" | "additive" | "copy" | "destination-over" | "source-in" | "destination-in" | "source-out" | "destination-out" | "source-atop" | "destination-atop";

type TextAlignHorizontalMode = "left" | "center" | "right";
type TextAlignVerticalMode = "top" | "center" | "bottom";
type TextWordWrapMode = "word" | "character";
interface TextFragmentPositionAndSize {
	x: number,
	y: number,
	width: number,
	height: number
}

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array |Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
type JSONValue = string | number | boolean | null
    | { [x: string]: JSONValue }
    | Array<JSONValue>;

type CallFunctionParameter = string | number;
type CallFunctionReturnValue = string | number | null;

interface ConstructEvent {
}

declare class ConstructEventTarget<EventMapType> {
	addEventListener<K extends keyof EventMapType>(type: K, listener: (ev: EventMapType[K]) => any): void;
	removeEventListener<K extends keyof EventMapType>(type: K, listener: (ev: EventMapType[K]) => any): void;
}

declare class ConstructEventTargetDispatcher<EventMapType> extends ConstructEventTarget<EventMapType> {
	dispatchEvent(evt: ConstructEvent): void;
}

interface ConstructResizeEvent extends ConstructEvent {
	cssWidth: number;
	cssHeight: number;
	deviceWidth: number;
	deviceHeight: number;
}

interface ConstructPointerEvent extends PointerEvent {
	lastButtons: number;
}

interface ConstructSaveEvent extends ConstructEvent {
	saveData: any;
}

interface ConstructInstanceCreateEvent extends ConstructEvent {
	instance: IInstance;
}

interface ConstructInstanceDestroyEvent extends ConstructEvent {
	instance: IInstance;
	isEndingLayout: boolean;
}

interface RuntimeEventMap {
	"resize": ConstructResizeEvent;
	"tick": ConstructEvent;
    "beforeprojectstart": ConstructEvent;
	"afterprojectstart": ConstructEvent;
	"keydown": KeyboardEvent;
	"keyup": KeyboardEvent;
	"mousedown": MouseEvent;
	"mousemove": MouseEvent;
	"mouseup": MouseEvent;
	"dblclick": MouseEvent;
	"wheel": WheelEvent;
	"pointerdown": ConstructPointerEvent;
	"pointermove": ConstructPointerEvent;
	"pointerup": ConstructPointerEvent;
	"pointercancel": ConstructPointerEvent;
	"deviceorientation": DeviceOrientationEvent;
	"devicemotion": DeviceMotionEvent;
	"save": ConstructSaveEvent;
	"load": ConstructSaveEvent;
	"instancecreate": ConstructInstanceCreateEvent;
	"instancedestroy": ConstructInstanceDestroyEvent;
}

/** Represents the Construct engine itself, and is the main entry point in to various Construct APIs.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/iruntime | IRuntime documentation } */
declare class IRuntime extends ConstructEventTarget<RuntimeEventMap>
{
	readonly objects: IConstructProjectObjects;
	readonly globalVars: IConstructProjectGlobalVariables;

	readonly assets: IAssetManager;
	readonly storage: IStorage;
	readonly keyboard?: IKeyboardObjectType<IInstance>;
	readonly mouse?: IMouseObjectType<IInstance>;
	readonly touch?: ITouchObjectType<IInstance>;

	readonly layout: IAnyProjectLayout;
	getLayout(nameOrIndex: LayoutParameter): IAnyProjectLayout;
	getAllLayouts(): IAnyProjectLayout[];
	goToLayout(nameOrIndex: LayoutParameter): void;

	readonly projectName: string;
	readonly projectVersion: string;
	readonly isInWorker: boolean;
	readonly viewportWidth: number;
	readonly viewportHeight: number;
	getViewportSize(): number[];

	get dt(): number;
	get dtRaw(): number;
	get gameTime(): number;
	get wallTime(): number;
	timeScale: number;
	get fps(): number;
	get cpuUtilisation(): number;
	get gpuUtilisation(): number;

	getInstanceByUid(uid: number): IInstance | null;
	sortZOrder(iterable: Iterable<IWorldInstance>, callback: (a: IWorldInstance, b: IWorldInstance) => number): void;

	setCollisionCellSize(width: number, height: number): void;

	/** Call a function in an event sheet, by a case-insensitive string of its name.
	 * Each parameter provided for 'params' is passed to the function.
	 * There must be at least as many parameters provided as the function uses,
	 * although any additional parameters will be ignored. If the function has a
	 * return value, it will be returned from this method, else it returns null. */
	callFunction(name: string, ...params: CallFunctionParameter[]): CallFunctionReturnValue;
	
	/** When called from an event sheet, sets the current function return value,
	 * much like the 'Set return value' action.	 */
	setReturnValue(value: number | string): void;

	/** Return a random number in the range [0, 1). This is similar to Math.random(),
	 * but can produce a deterministic sequence of values if the Advanced Random object
	 * overrides the system random. */
	random(): number;

	/** Runtime wrapper for creating a Web Worker, avoiding some issues with browser bugs and
	 * nested workers.
	 * @see {@link https://www.construct.net/en/make-games/manuals/construct-3/scripting/guides/creating-workers | Creating workers} */
	createWorker(url: string, opts?: WorkerOptions): Promise<MessagePort>;

	/** Invoke a browser download of the content at the given URL, using the provided filename. */
	invokeDownload(url: string, filename: string): void;

	/** Runtime wrapper for alert() method which can be used in worker mode. */
	alert(message: string): Promise<void>;
}
