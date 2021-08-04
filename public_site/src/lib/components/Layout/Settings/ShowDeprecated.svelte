<script lang="ts">
	import Switch from '$lib/components/General/Switch.svelte';
	import { settings } from '$lib/store/settings';
	export let disabled = false;

	let show = $settings.showDeprecated;

	let id = 'show-deprecated';
	let text = 'depreated';

	$: settings.showDeprecated(show);
</script>

<Switch {disabled} {id} {text} bind:checked={show} />
