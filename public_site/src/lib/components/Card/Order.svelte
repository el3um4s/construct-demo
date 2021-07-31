<script lang="ts">
	import { settings } from '$lib/store/settings';
	import AscOrDesc from './AscOrDesc.svelte';

	const orderBy = [
		{ id: 'date-creation', text: `Date (creation)` },
		{ id: 'date-update', text: `Date (update)` },
		{ id: 'title', text: `Title` }
	];

	let selectedOrderBy = $settings.orderBy;
	$: settings.setOrderBy(selectedOrderBy);
</script>

<div class="sticky top-0 z-30 flex justify-between item-center py-4 px-6">
	<div class="flex items-center" />
	<div class="flex items-center space-x-2">
		<select bind:value={selectedOrderBy} on:change>
			{#each orderBy as o}
				<option value={o.id}>
					{o.text}
				</option>
			{/each}
		</select>
		<AscOrDesc />
	</div>
</div>
