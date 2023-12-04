<script lang="ts">
  import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div class="card">
    <Counter />
  </div>
</main>

<style>
  .card {
    position: absolute;
    top: 0;
    left: 0;
    padding: 2em;
  }
</style>
