<script lang="ts">
	import AscOrDesc from './AscOrDesc.svelte';
	import OrderBy from './OrderBy.svelte';
	import ShowDeprecated from './ShowDeprecated.svelte';
</script>

<div class="sticky top-0 z-30 bg-gray-900 flex justify-between item-center py-4 px-6">
	<div class="flex items-center" />
	<div class="flex items-center space-x-2">
		<OrderBy />
		<AscOrDesc />
		<ShowDeprecated />
	</div>
</div>
