<script lang="ts">
	import Item from './Item.svelte';
	import Head from './Head.svelte';
	import { base } from '$app/paths';

	export let sidebarOpen: boolean = true;
</script>

<div
	class="{sidebarOpen
		? 'translate-x-0 ease-out'
		: '-translate-x-full ease-in'} fixed z-30 inset-y-0 left-0 w-64 transition duration-300 bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
>
	<Head />

	<nav class="mt-10">
		<Item icon="fi fi-rr-home" label="Home" href="{base}/" />
		<Item icon="fi fi-rr-info" label="About" href="{base}/about" />
		<Item icon="fi fi-rr-ticket" label="Support Me" href="{base}/support-me" />
		<Item icon="fi fi-rr-trophy" label="Thanks" href="{base}/thanks" />
	</nav>
</div>
