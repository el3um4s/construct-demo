<script lang="ts">
	import { settings } from '$lib/store/settings';

	const orderBy = [
		{ id: 'date-creation', text: `Date (creation)` },
		{ id: 'date-update', text: `Date (update)` },
		{ id: 'title', text: `Title` }
	];

	let selectedOrderBy = $settings.orderBy;
	$: settings.setOrderBy(selectedOrderBy);
</script>

<select
	bind:value={selectedOrderBy}
	class="p-2 bg-gray-600 text-gray-300 rounded border-2 border-gray-600"
>
	{#each orderBy as o}
		<option value={o.id}>
			{o.text}
		</option>
	{/each}
</select>
