
declare class ObjectClassInstanceCreateEvent<InstanceType> implements ConstructEvent {
	instance: InstanceType;
}

declare class ObjectClassInstanceDestroyEvent<InstanceType> implements ConstructEvent {
	instance: InstanceType;
}

interface ObjectClassEventMap<InstanceType> {
	"instancecreate": ObjectClassInstanceCreateEvent<InstanceType>;
	"instancedestroy": ObjectClassInstanceDestroyEvent<InstanceType>;
}

/** A base class for object types or families in the project.
 * @see {@link https://www.construct.net/en/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/iobjectclass | IObjectClass documentation } */
declare class IObjectClass<InstanceType extends IInstance, EventMapType = ObjectClassEventMap<InstanceType>> extends ConstructEventTarget<EventMapType>
{
	readonly name: string;

	/** Get all instances belonging to this object type or family. */
	getAllInstances<InstT extends InstanceType = InstanceType>(): InstT[];

	/** Iterare all instances belonging to this object type or family. */
	instances<InstT extends InstanceType = InstanceType>(): Iterable<InstT>;

	/** Get the first instance of this object type or family (or null if none exist). */
	getFirstInstance<InstT extends InstanceType = InstanceType>(): InstT | null;

	/** Get all the currently picked instances, when called from an event sheet. */
	getPickedInstances<InstT extends InstanceType = InstanceType>(): InstT[];

	/** Iterate all currently picked instances, when called from an event sheet. */
	pickedInstances<InstT extends InstanceType = InstanceType>(): Iterable<InstT>;

	/** Get the first picked instance of this object type or family when called
	 * from an event sheet, or null if none is picked. */
	getFirstPickedInstance<InstT extends InstanceType = InstanceType>(): InstT | null;
}

/** Represents a family in the project.
 * @see {@link https://www.construct.net/en/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/iobjectclass | IObjectClass documentation } */
declare class IFamily<InstanceType extends IInstance, EventMapType = ObjectClassEventMap<InstanceType>> extends IObjectClass<InstanceType, EventMapType>
{
}

/** Represents an object type in the project. This is a TypeScript-specific definition,
 * as the JavaScript API only refers to IObjectClass.
 * @see {@link https://www.construct.net/en/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/iobjectclass | IObjectClass documentation } */
declare class IObjectType<InstanceType extends IInstance, EventMapType = ObjectClassEventMap<InstanceType>> extends IObjectClass<InstanceType, EventMapType>
{
	/** Set the instance class for this object type. Used for subclassing.
	 * @see {@link https://www.construct.net/en/make-games/manuals/construct-3/scripting/guides/subclassing-instances | Subclassing instances} */
	setInstanceClass(Class: Function): void;

	/** Create a new instance of this object type. */
	createInstance<InstT extends InstanceType = InstanceType>(layerNameOrIndex: LayerParameter, x: number, y: number, createHierarchy?: boolean, template?: string): InstT;
}