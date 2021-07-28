<script context="module">
	export const load = async ({ page }) => {
		return {
			props: {
				key: page.path
			}
		};
	};
</script>

<script>
	import '../app.postcss';
	import PageTransition from '$lib/PageTransition.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import Header from '$lib/components/Header/Header.svelte';

	export let key;
</script>

<svelte:head>
	<link href="/assets/flaticon/css/uicons-regular-rounded.css" rel="stylesheet" />
</svelte:head>

<div class="flex h-screen bg-gray-200 font-roboto">
	<div class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden hidden" />

	<Sidebar />

	<div class="flex-1 flex flex-col overflow-hidden">
		<Header />
		<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
			<div class="container mx-auto px-6 py8">
				<PageTransition refresh={key}>
					<slot />
				</PageTransition>
			</div>
		</main>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		width: 7px;
		height: 7px;
	}

	::-webkit-scrollbar-track {
		background: #2d3748;
	}

	::-webkit-scrollbar-thumb {
		background: #cbd5e0;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #718096;
	}
</style>
