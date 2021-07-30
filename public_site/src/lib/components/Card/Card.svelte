<script lang="ts">
	import { base } from '$app/paths';

	export let title;
	export let href;
	export let preview = '';
	export let tags = [];
	export let description = '';
	export let dataCreated;
	export let dataUpdated;
	export let id;

	export let locales: string = 'en-US';

	const randomColor = [
		'bg-blue-300',
		'bg-blue-400',
		'bg-blue-500',
		'bg-blue-600',
		'bg-indigo-300',
		'bg-indigo-400',
		'bg-indigo-500',
		'bg-indigo-600',
		'bg-green-300',
		'bg-green-400',
		'bg-green-500',
		'bg-green-600',
		'bg-purple-300',
		'bg-purple-400',
		'bg-purple-500',
		'bg-purple-600'
	];

	function writeDate(d: string, locales: string): string {
		const s = new Date(d).toLocaleDateString(locales, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		return s;
	}
</script>

<div
	class="w-full lg:max-w-full
		lg:flex
		mt-6
		border border-gray-400
		bg-white
		rounded
		hover:ring-4
		"
>
	<div
		class="h-48 lg:h-auto lg:w-48 text-center {randomColor[
			Math.floor(Math.random() * randomColor.length)
		]}"
	>
		<a {href} sveltekit:prefetch>
			{#if preview !== ''}
				<div
					class="h-48 lg:h-full lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden content-center"
					{title}
					style="background-image: url(&quot;{preview}&quot;);"
				/>
			{/if}
		</a>
	</div>

	<div class="p-4 flex flex-col justify-between leading-normal">
		<div class="mb-8">
			<div class="text-gray-900 font-bold text-xl mb-2">
				<a {href} sveltekit:prefetch>{title}</a>
			</div>
			<p class="text-gray-700 text-xs hidden">{id}</p>
			{#if dataCreated !== ''}
				<p class="text-gray-700 text-xs">
					created {writeDate(dataCreated, locales)}
				</p>
			{/if}
			{#if dataCreated != dataUpdated}
				<p class="text-gray-700 text-xs">
					updated {dataUpdated}
				</p>
			{/if}
			{#if description !== ''}
				<p class="text-gray-700 text-base">
					{description}
				</p>
			{/if}
		</div>
		{#if tags.length > 0}
			<div class="px-6 pt-4 pb-2">
				{#each tags as tag}
					<a
						href={`${base}/tags/${tag}`}
						sveltekit:prefetch
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>#{tag}</a
					>
				{/each}
			</div>
		{/if}
	</div>
</div>
