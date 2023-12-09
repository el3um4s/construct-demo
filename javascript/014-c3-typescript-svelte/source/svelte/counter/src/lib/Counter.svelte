<script lang="ts">
  let count: number = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button on:click={increment}>
  count is {count}
</button>

<style lang="postcss">
  button {
    /* @apply flex w-36 h-36; */
    @apply relative items-center justify-center overflow-hidden p-2;
    @apply w-full h-full;
    @apply text-lg font-medium text-indigo-900 shadow;
    @apply border rounded-full border-indigo-600 bg-slate-100;
  }

  button:hover {
    @apply border-amber-600  bg-amber-200 text-amber-800;
    @apply delay-150 duration-500 ease-in-out;
  }

  button:active {
    @apply shadow animate-ping;
  }
</style>
