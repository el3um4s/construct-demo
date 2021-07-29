<script lang="ts">
	import { base } from '$app/paths';
	export let sidebarOpen: Function;
</script>

<header class="flex justify-between item-center py-4 px-6 bg-white border-b-4 border-gray-900">
	<div class="flex items-center">
		<button class="text-gray-500 focus:outline-none lg:hidden" on:click={() => sidebarOpen()}>
			<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 6H20M4 12H20M4 18H11"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<div class="relative mx-4 lg:mx-0">
			<span class="absolute inset-y-0 left-0 pl-3 flex items-center">
				<svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
					<path
						d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			<input
				class="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
				type="text"
				placeholder="Search"
			/>
		</div>
	</div>

	<div class="flex items-center text-red-500 font-bold">This page is just a test!</div>

	<div class="flex items-center space-x-2">
		<a sveltekit:prefetch href={`${base}/`}>Home</a>
		<a href="https://github.com/el3um4s/construct-demo"
			><img src="/assets/icons/github.svg" alt="" class="h-8 w-8 gray-500" /></a
		>
	</div>
</header>
