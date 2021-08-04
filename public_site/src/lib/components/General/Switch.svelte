<!-- https://codechips.me/accessible-switch-toggle-button-with-svelte-js-and-tailwind-css/ -->
<script lang="ts">
	import { settings } from '$lib/store/settings';
	export let id = '';
	export let text = '';
	export let checked = false;
	export let disabled = false;
</script>

<label for={id} class="flex flex-col items-center">
	<span class="mb-1 cursor-pointer lowercase text-sm">{text}</span>
	<div class="switch">
		<input {id} name={id} type="checkbox" class="sr-only" {disabled} bind:checked />
		<div class="track" />
		<div class="thumb" />
	</div>
</label>

<style>
	.switch {
		@apply relative;
		@apply inline-block;
		@apply align-middle;
		@apply cursor-pointer;
		@apply select-none;
		@apply bg-transparent;
	}

	.track {
		@apply w-12;
		@apply h-6;
		@apply bg-gray-600;
		@apply rounded-full;
		@apply shadow-inner;
	}

	.thumb {
		@apply transition-all;
		@apply duration-300;
		@apply ease-in-out;
		@apply absolute;
		@apply top-0;
		@apply left-0;
		@apply w-6;
		@apply h-6;
		@apply bg-white;
		@apply border-2;
		@apply border-gray-600;
		@apply rounded-full;
	}

	input[type='checkbox']:checked ~ .thumb {
		@apply transform;
		@apply translate-x-full;
		@apply border-green-500;
	}

	input[type='checkbox']:checked ~ .track {
		@apply transform;
		@apply transition-colors;
		@apply bg-green-500;
	}

	input[type='checkbox']:disabled ~ .track {
		@apply bg-gray-500;
	}

	input[type='checkbox']:disabled ~ .thumb {
		@apply bg-gray-100;
		@apply border-gray-500;
	}

	/* input[type='checkbox']:focus + .track,
	input[type='checkbox']:active + .track {
		@apply shadow-outline;
	} */
</style>
