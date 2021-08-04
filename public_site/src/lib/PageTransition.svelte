<script>
	import { blur } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:blur={{ duration: 500, delay: 500 }} out:blur={{ duration: 500 }}>
		<slot />
	</div>
{/key}
