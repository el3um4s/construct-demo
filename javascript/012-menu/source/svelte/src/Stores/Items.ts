import { writable, Writable} from "svelte/store";
import type { ItemType } from "../Components/Menu/ItemType";

const items: Writable<ItemType[]> = writable([])

const itemsStore = {
    subscribe: items.subscribe,
    clearMenu: () => items.set([]),

    push: ( item: ItemType ) => {
        const newItem = { 
            ...item,
            id: Math.random().toString()
        }
        items.update(i => {
            return [...i, newItem];
        });
    },

    unshift: ( item: ItemType ) => {
        const newItem = { 
            ...item,
            id: Math.random().toString()
        }
        items.update(i => {
            return [newItem, ...i];
        });
    },

    shift: () => {
        items.update(i => {
            const elements = [ ...i];
            elements.shift();
            return [...elements];
        });
    },

    pop: () => {
        items.update(i => {
            const elements = [ ...i];
            elements.pop();
            return [...elements];
        });
    },

    addItemAtIndex: (index: number, item:ItemType) =>{
        const newItem = { 
            ...item,
            id: Math.random().toString()
        }
        items.update(i => {
            const elements = [...i];
            elements.splice(index, 0, newItem);
            return elements;
        });
    },

    updateItemById: (id:string, item:ItemType) => {
        items.update( i => {
            const index:number = i.findIndex(el => el.id === id);
            const updateItem = {
                ...i[index],
                ...item
            };
            const updateItems = [...i];
            updateItems[index] = updateItem;
            return updateItems;
        })
    },

    updateItemByLabel: (label:string, item:ItemType) => {
        items.update( i => {
            const index:number = i.findIndex(el => el.label === label);
            const updateItem = {
                ...i[index],
                ...item
            };
            const updateItems = [...i];
            updateItems[index] = updateItem;
            return updateItems;
        })
    },

    updateItemByIndex: (index: number, item:ItemType) => {
        items.update( i => {
            const updateItem = {
                ...i[index],
                ...item
            };
            const updateItems = [...i];
            updateItems[index] = updateItem;
            return updateItems;
        })
    },

    removeItemById: (id: string) => {
        items.update(i => i.filter( el => el.id !== id));
    },

    removeItemByLabel: (label: string) => {
        items.update(i => i.filter( el => el.label !== label));
    },

    removeItemByIndex: (index: number) => {
        items.update(i => {
            const array = [...i];
            array.splice(index, 1);
            const updateItems = [...array];
            return updateItems;
        })
    },

    loadItemsFromArray: (arrayItems:ItemType[]) => {
        const newItems = arrayItems.map( el => {
            return {
                id: Math.random().toString(),
                ...el
            }
        });
        items.set(newItems);
    },

    //TO DO: DISABLE ITEM
};

export default itemsStore;