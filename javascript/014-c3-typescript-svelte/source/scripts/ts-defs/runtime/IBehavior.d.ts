
/** Represents a behavior in a project (the behavior equivalent of a plugin).
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/ibehavior | IBehavior documentation } */
declare class IBehavior
{
	readonly runtime: IRuntime;

    /** Get all instances that use this behavior. The instances could be a mix of
     * different object types and plugin types. */
    getAllInstances(): IInstance[];
}
