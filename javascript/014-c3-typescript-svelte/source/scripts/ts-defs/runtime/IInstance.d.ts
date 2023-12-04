
interface InstanceEvent<InstType = IInstance> extends ConstructEvent {
	instance: InstType;
}

interface InstanceDestroyEvent<InstType> extends InstanceEvent<InstType> {
	isEndingLayout: boolean;
}

interface InstanceEventMap<InstType> {
	"destroy": InstanceDestroyEvent<InstType>;
}

/** Represents a single instance of an object type.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/iinstance | IInstance documentation } */
declare class IInstance
{
	// Note IInstance does not derive from ConstructEventTargetDispatcher - it implements it
	// separately to make use of <this> in its type definition.
	addEventListener<K extends keyof InstanceEventMap<this>>(type: K, listener: (ev: InstanceEventMap<this>[K]) => any): void;
	removeEventListener<K extends keyof InstanceEventMap<this>>(type: K, listener: (ev: InstanceEventMap<this>[K]) => any): void;
	dispatchEvent(evt: ConstructEvent): void;
	
	readonly runtime: IRuntime;
	readonly objectType: IObjectType<this>;

	readonly uid: number;
	readonly templateName: string;

	timeScale: number;
	restoreTimeScale(): void;

	destroy(): void;

	getOtherContainerInstances(): IInstance[];
	otherContainerInstances(): Iterable<IInstance>;
}
