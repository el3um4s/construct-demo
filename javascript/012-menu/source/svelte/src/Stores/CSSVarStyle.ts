import { writable, Writable, get } from 'svelte/store';

// https://svelte.dev/repl/8123d474edb04f198c3b83363716a709?version=3.38.2
import themes from "../Themes/Themes";

interface Styles {
    'cssVarStyles': string;
    
    'color-primary': string;
    'color-background': string;

    'font-title': string;
    'font-items': string;
    
    'modal-background': string;

    'menu-width': string;
    'menu-min-width': string;
    'menu-max-width': string;
    'menu-max-height': string;
    'menu-border-radius': string;
    'menu-border-style': string;
    'menu-border-width': string;

    'item-height': string;
    'item-icon-size': string;
    'item-image-size': string;
}

let stylesDefault:Styles = {
    'cssVarStyles': "",
    
    'color-primary': '#a3700a',
    'color-background': '#100408',

    'font-title': "Roboto, sans-serif",
    'font-items': "Roboto, sans-serif",
    
    'modal-background': '#000000bf',

    'menu-width': "auto",
    'menu-min-width': "128px",
    'menu-max-width': "80%",
    'menu-max-height': "80vh",
    'menu-border-radius': "4px",
    'menu-border-style': "solid",
    'menu-border-width': "1px",

    'item-height': "48px",
    'item-icon-size': "32px",
    'item-image-size': "48px",
};

const styles: Writable<Styles> = writable(stylesDefault);

const stylesStore = {
    subscribe: styles.subscribe,

    init: () => {
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    changeStyle: (style: string, value: string) => {
        styles.update( s => {
            const newStyle = { ...s };
            newStyle[style] = value;
            return newStyle; 
        });

        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    changeFontTitle: (value: string) => {
        styles.update(s => {
            const newStyle = { ...s };
            newStyle['font-title'] = value;
            return newStyle;
        });
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    changeFontItems: (value: string) => {
        styles.update(s => {
            const newStyle = { ...s };
            newStyle['font-items'] = value;
            return newStyle;
        });
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    changeFontTitleAndItems: (title: string, items: string) => {
        styles.update(s => {
            const newStyle = { ...s };
            newStyle['font-title'] = title;
            newStyle['font-items'] = items;
            return newStyle;
        });
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    themeStandard: (theme:string) => {
        const newTheme = { ...themes[theme] };
        styles.update(s => {
            const newStyle = { ...s, ...newTheme };
            return newStyle;
        });
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    },

    loadTheme: (t: Styles, standard:string = "Light") => {
        console.log("loadTheme");
        console.log(t);
        const standardTheme:Styles = { ...themes[standard] };
        styles.update(s => {
            const newStyle = { ...s, ...standardTheme };
            return newStyle;
        });
        const newTheme:Styles = { ...t };
        
        styles.update(s => {
            const newStyle = { ...s, ...newTheme };
            return newStyle;
        });
        const cssVarStyles = getCssVarStyles();
        styles.update( s => {
            const newStyle = { ...s };
            newStyle.cssVarStyles = cssVarStyles;
            return newStyle; 
        });
    }
}

function getCssVarStyles():string {
    const s = get(styles);
    const cssVarStyles = Object.entries(s)
        .map(([key, value]) => {
            return key !== "cssVarStyles" ? `--${key}:${value};` : "";
        }).join('');
    return cssVarStyles;
}

export default stylesStore;