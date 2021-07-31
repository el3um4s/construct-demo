import { Writable, writable } from "svelte/store"

export interface Settings {
    order: "ascending" | "descending";
    orderBy: string;
}

const customSettings:Writable<Settings> = writable({
    order: "descending",
    orderBy: "date-update"
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
    }
}
