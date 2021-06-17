<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition"; 
    import { flip } from "svelte/animate";
    import type { ItemType } from "./Menu/ItemType";

    import Modal from "./Modal.svelte";

    export let items:ItemType[];
    export let columns:string[];

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("closeModal");
    }
</script>

<Modal on:closeModal/>

<div class="flex-container" on:click|preventDefault|stopPropagation={closeModal}>
    <div class="menu" on:click|preventDefault|stopPropagation transition:fly={{ y: 600, duration: 750 }}>
        <slot class="header" name="header">No header was provided</slot>
        <div class="scrollbar">
            {#each items as item (item.id)}
                <span animate:flip>
                    <slot name="item" prop={item} columns={columns}></slot>
                </span>
            {/each}
        </div>
    </div>
</div>

<style>
    .flex-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu {
        margin: 4px;
        padding: 8px;
        width: var(--menu-width);
        min-width: var(--menu-min-width);
        max-width: var(--menu-max-width);
        max-height: var(--menu-max-height);
        background-color: var(--color-background);
        color: var(--color-primary);
        border: var(--color-primary);
        border-radius: var(--menu-border-radius);
        border-style: var(--menu-border-style);
        border-width:var(--menu-border-width);
        display: flex;
        flex-direction: column;
    }

    .scrollbar {
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--color-primary) var(--color-background);
    }

    .scrollbar::-webkit-scrollbar {
      width: 12px;
    }
    .scrollbar::-webkit-scrollbar-thumb {
        background: var(--color-background);
        border-radius: 8px;
        border: 2px solid var(--color-primary);
    }
    .scrollbar::-webkit-scrollbar-track {
        background: var(--color-primary);
    }
</style>