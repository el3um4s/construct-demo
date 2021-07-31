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
	import '../app.postcss';
	import Head from '$lib/components/Layout/General/Head.svelte';
	// import Scrollbar from '$lib/components/Layout/General/Scrollbar.svelte';
	import PageTransition from '$lib/PageTransition.svelte';
	import Sidebar from '$lib/components/Layout/Sidebar/Sidebar.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';

	export let key;
</script>

<Head />

<div class="flex h-screen bg-gray-900 font-roboto">
	<Sidebar />
	<div class="flex-1 flex flex-col overflow-hidden">
		<Header />
		<main class="flex-1 overflow-x-hidden overflow-y-auto">
			<div class="container max-w-5xl mx-auto px-6 py8">
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
