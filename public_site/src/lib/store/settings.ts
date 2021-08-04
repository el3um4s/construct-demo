import { Writable, writable } from "svelte/store"

export interface Settings {
    order: "ascending" | "descending";
    orderBy: string;
    showDeprecated: boolean;
}

const customSettings:Writable<Settings> = writable({
    order: "descending",
    orderBy: "date-update",
    showDeprecated: false
})

export const settings = {
    subscribe: customSettings.subscribe,

    setOrderASC: ():void => {
        customSettings.update( s => {
            return {
                ...s,
                order: "ascending"
            }
        });
    },

    setOrderDESC: ():void => {
        customSettings.update( s => {
            return {
                ...s,
                order: "descending"
            }
        });
    },

    setOrderBy: (orderBy:string):void => {
        customSettings.update( s => {
            return {
                ...s,
                orderBy
            }
        });
    },

    showDeprecated: (val:boolean):void => {
        customSettings.update( s => {
            return {
                ...s,
                showDeprecated: val
            }
        });
    }
}
