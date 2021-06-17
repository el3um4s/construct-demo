import columns from "../Stores/Columns";
import items from "../Stores/Items";
import CSSVarStyle from "../Stores/CSSVarStyle";
import title from "../Stores/Titles";
import visible from "../Stores/VisibilityMenu";

export default function initializeMenuSvelte() {
    if (!!!globalThis.menuSvelte)  { 
        globalThis.menuSvelte = { };
    };

    globalThis.menuSvelte.columns = columns;
    globalThis.menuSvelte.items = items;
    globalThis.menuSvelte.css = CSSVarStyle;
    globalThis.menuSvelte.title = title;
    globalThis.menuSvelte.visible = visible;
}