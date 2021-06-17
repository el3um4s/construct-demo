import { writable, Writable} from "svelte/store";

const columns: Writable<string[]> = writable([]);

const allColumn = ["icon", "textual", "label", "description", "rightIcon", "rightImage"];

const columnsStore = {
    subscribe: columns.subscribe,
    allColumns: () => { columns.set([...allColumn]) },
    setColumns: (array:string[]) => { columns.set([...array]) },
};

export default columnsStore;