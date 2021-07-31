<script lang="ts">
	import Item from './Item.svelte';
	import Head from './Head.svelte';
	import { base } from '$app/paths';
</script>

<div
	class="fixed z-30 inset-y-0 left-0 w-0 overflow-y-auto translate-x-0 lg:static inset-0 lg:w-64"
>
	<Head />

	<nav class="mt-10">
		<Item icon="fi fi-rr-home" label="Home" href="{base}/" />
		<Item icon="fi fi-rr-info" label="About" href="{base}/about" />
		<Item icon="fi fi-rr-ticket" label="Support Me" href="{base}/support-me" />
		<Item icon="fi fi-rr-trophy" label="Thanks" href="{base}/thanks" />
	</nav>
</div>
