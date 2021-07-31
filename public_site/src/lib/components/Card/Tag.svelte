<script lang="ts">
	import { base } from '$app/paths';
	export let tag: string;
</script>

<a
	href={`${base}/tags/${tag}`}
	sveltekit:prefetch
	class="inline-block bg-purple-300 px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2 hover:bg-purple-100"
	>#{tag}</a
>

<style>
	a {
		clip-path: polygon(10% 0%, 100% 1%, 100% 100%, 10% 100%, 0% 50%);
	}
</style>
