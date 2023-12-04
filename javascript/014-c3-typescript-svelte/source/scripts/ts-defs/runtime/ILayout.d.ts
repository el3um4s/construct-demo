
interface LayoutEventMap {
	"beforelayoutstart": ConstructEvent;
	"afterlayoutstart": ConstructEvent;
    "beforelayoutend": ConstructEvent;
    "afterlayoutend": ConstructEvent;
}

type LayerPositionWhere = "above" | "below" | "top-sublayer" | "bottom-sublayer";
type LayoutProjection = "perspective" | "orthographic";

/** Represents a layout in the project.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/layout-interfaces/ilayout | ILayout documentation } */
declare class ILayout extends ConstructEventTarget<LayoutEventMap>
{
    readonly name: string;
    readonly index: number;

    width: number;
    height: number;
    setSize(w: number, h: number): void;
    getSize(): number[];

    scale: number;
    angle: number;
    scrollX: number;
    scrollY: number;
    scrollTo(x: number, y: number): void;
    getScrollPosition(): number[];
    getLayer(nameOrIndex: LayerParameter): IAnyProjectLayer | null;
    getAllLayers(): IAnyProjectLayer[];
    allLayers(): Iterable<IAnyProjectLayer>;

    addLayer(layerName: string, insertBy: ILayer | null, where: LayerPositionWhere): void;
    moveLayer(layer: ILayer, insertBy: ILayer | null, where: LayerPositionWhere): void;
    removeLayer(layer: ILayer): void;
    removeAllDynamicLayers(): void;

    setVanishingPoint(vpX: number, vpY: number): void;
    getVanishingPoint(): number[];

    projection: LayoutProjection;
}
