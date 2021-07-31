<script lang="ts">
	import { settings } from '$lib/store/settings';

	function toggleOrder() {
		if ($settings.order === 'ascending') {
			settings.setOrderDESC();
		} else {
			settings.setOrderASC();
		}
	}
</script>

<!-- Icons from https://heroicons.com/ -->

<div class="text-gray-300 flex bg-gray-900 hover:bg-gray-800 p-2" on:click={toggleOrder}>
	{#if $settings.order === 'descending'}
		<div title="Order descending">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
				/>
			</svg>
		</div>
	{:else}
		<div title="Order ascending">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
				/>
			</svg>
		</div>
	{/if}
</div>
