
/** Represents an animation frame in an animation.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/object-interfaces/ianimationframe | IAnimationFrame documentation } */
declare class IAnimationFrame extends IImageInfo
{
	readonly duration: number;

    readonly originX: number;
    readonly originY: number;
    getOrigin(): number[];

    getImagePointCount(): number;
    getImagePointX(nameOrIndex: ImagePointParameter): number;
    getImagePointY(nameOrIndex: ImagePointParameter): number;
    getImagePoint(nameOrIndex: ImagePointParameter): number[];

    getPolyPointCount(): number;
    getPolyPointX(index: number): number;
    getPolyPointY(index: number): number;
    getPolyPoint(index: number): number[];
}
