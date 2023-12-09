<script lang="ts">
  import "./css/tailwind.pcss";
  import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div class="card">
    <Counter />
  </div>
</main>

<style lang="postcss">
  main {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    @apply w-full h-full flex content-center justify-center flex-col items-stretch;
  }

  .card {
    /* position: absolute; */
    @apply p-8 top-0 left-0 h-full;
  }
</style>
