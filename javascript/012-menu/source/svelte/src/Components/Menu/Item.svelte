<script lang="ts">
    import type { ItemType } from "./ItemType";

    export let item:ItemType;
    export let columns:string[] = ["icon", "textual", "label", "description", "rightIcon", "rightImage"]

    const {icon, label, description, rightImage, onClick, rightIcon} = item;

    $: styleColumn = `
    grid-template-columns:  ${columns.includes("icon") ? "var(--item-icon-size)" : ""} ${columns.includes("textual") || columns.includes("label") || columns.includes("description")? "auto " : ""} ${columns.includes("rightIcon") ? "var(--item-icon-size) " : ""} ${columns.includes("rightImage") ? "var(--item-image-size) " : ""};`;

</script>

<div class="row" onclick="{onClick}" on:click|preventDefault|stopPropagation style="{styleColumn}">

    {#if columns.includes("icon")}
        <div class="icon">
            {#if icon && icon !== ""}
                <div 
                    class="icon image"
                    style="mask: url({icon}) no-repeat center / contain;
                    -webkit-mask: url({icon}) no-repeat center / contain;"
                />
            {/if}
        </div>
    {/if}

    {#if columns.includes("textual") || columns.includes("label") || columns.includes("description")}
        <div class="textual">
            {#if columns.includes("label") && label && label !== ""}
                <div class="label">{label}</div>
            {/if}
            {#if columns.includes("description") && description && description !== ""}
                <div class="description">{description}</div>
            {/if}
        </div>
    {/if}

    {#if columns.includes("rightIcon")}
        <div class="icon">
            {#if rightIcon && rightIcon !== ""}
                <div 
                    class="icon image"
                    style="mask: url({rightIcon}) no-repeat center / contain;
                    -webkit-mask: url({rightIcon}) no-repeat center / contain;"
                />
            {/if}
        </div>
    {/if}

    {#if columns.includes("rightImage")}
        <div class="rightImage">
            {#if rightImage && rightImage !== ""}
                <img class="image" src="{rightImage}" alt="{label}">
            {/if}
        </div>    
    {/if}
</div>

<style>
    .row {
        width: auto;
        display: grid;
        column-gap: 8px;
        align-items: center;
        padding-left: 4px;
        padding-right: 4px;
        padding-top: 4px;
        padding-bottom: 4px;
        cursor: pointer;
        height: var(--item-height);
        font-family: var(--font-items);
    }

    .row:hover {
        background-color: var(--color-primary);
        color: var(--color-background);
        cursor: pointer;
    }

    .icon {
        width: 100%;
        height: 100%;
    }

    .icon.image {
        background-color: var(--color-primary);
    }

    .row:hover .icon.image {
        background-color: var(--color-background);
    }

    .label { font-weight: bold;  }
    .description { font-style: oblique;}

    .image {
        width: 100%;
        height: 100%;
        max-width: var(--item-image-size);
        max-height: var(--item-image-size);
    }
</style>