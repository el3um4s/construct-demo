<script lang="ts">
    import { fade } from "svelte/transition";
</script>

<div class="modal" transition:fade></div>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: var(--modal-background);
    }
</style>