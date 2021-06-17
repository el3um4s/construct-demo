import { writable, Writable} from "svelte/store";

const titles:Writable<string> = writable("Hello World!");

const titlesStore = {
    subscribe: titles.subscribe,
    setTitle: (title:string) => titles.set(title),
    reset: () => titles.set("Menu"),
    clear: () => titles.set("")
}

export default titlesStore;
