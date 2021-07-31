<script context="module">
	export const load = async ({ page }) => {
		return {
			props: {
				key: page.path
			}
		};
	};
</script>

<script lang="ts">
	import PageTransition from '$lib/PageTransition.svelte';
	import Sidebar from '$lib/components/Layout/Sidebar/Sidebar.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';

	export let key;

	let sidebarOpen: boolean = false;

	const onMenuClick = () => {
		sidebarOpen = !sidebarOpen;
	};
</script>

<svelte:head>
	<link href="/assets/flaticon/css/uicons-regular-rounded.css" rel="stylesheet" />
</svelte:head>

<div class="flex h-screen bg-gray-200 font-roboto">
	<!-- modal -->
	<div
		class="{sidebarOpen
			? 'block'
			: 'hidden'} fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
		on:click={onMenuClick}
	/>

	<Sidebar {sidebarOpen} />

	<div class="flex-1 flex flex-col overflow-hidden">
		<Header sidebarOpen={onMenuClick} />
		<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
			<div class="container mx-auto px-6 py8">
				<PageTransition refresh={key}>
					<slot />
				</PageTransition>
			</div>
		</main>
	</div>
</div>
