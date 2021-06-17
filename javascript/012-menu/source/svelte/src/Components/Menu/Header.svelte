<script lang="ts">
    export let title:string = "Menu"
</script>

<div>{title}</div>

<style>
    div {
        width: 100%;
        text-align: center;
        font-variant: small-caps;
        border-bottom: solid var(--color-primary) 1px;
        padding-bottom: 4px;
        font-weight: bold;
        font-size: 1.5em;
        font-family: var(--font-title);
    }
</style>