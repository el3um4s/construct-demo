import { writable, Writable} from "svelte/store";

const visibility:Writable<boolean> = writable(false);

const visibilityStore = {
    subscribe: visibility.subscribe,
    true: () => visibility.set(true),
    false: () => visibility.set(false)
}

export default visibilityStore;