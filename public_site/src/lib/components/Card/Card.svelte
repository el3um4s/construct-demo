<script lang="ts">
	import Tag from './Tag.svelte';

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
		border-gray-300
		border-b-2
		lg:border-none
		hover:bg-gray-800
		p-2
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

	<div class="p-4 flex flex-col justify-between leading-normal text-gray-300">
		<div class="mb-8">
			<div class="text-yellow-200 text-xl mb-2">
				<a {href} sveltekit:prefetch>{title}</a>
			</div>
			<p class="text-xs hidden">{id}</p>
			{#if dataCreated !== ''}
				<p class="text-xs">
					created {writeDate(dataCreated, locales)}
				</p>
			{/if}
			{#if dataCreated != dataUpdated}
				<p class="text-xs">
					updated {dataUpdated}
				</p>
			{/if}
			{#if description !== ''}
				<p class="text-base">
					{description}
				</p>
			{/if}
		</div>
		{#if tags.length > 0}
			<div>
				{#each tags as tag}
					<Tag {tag} />
				{/each}
			</div>
		{/if}
	</div>
</div>
