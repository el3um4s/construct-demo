<script>
	export let title;
	export let href;
	export let preview;
	export let tags = [];
</script>

<div class="w-full lg:max-w-full lg:flex mt-6">
	<div
		class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
		{title}
		style="background-image: url(&quot;{preview}&quot;);"
	/>

	<div
		class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
	>
		<div class="mb-8">
			<div class="text-gray-900 font-bold text-xl mb-2">
				{title}
			</div>
			<p class="text-gray-700 text-base">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
				et perferendis eaque, exercitationem praesentium nihil.
			</p>
		</div>
		<a {href} sveltekit:prefetch>Read More</a>
		{#if tags.length > 0}
			<div class="px-6 pt-4 pb-2">
				{#each tags as tag}
					<span
						class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>#{tag}</span
					>
				{/each}
			</div>
		{/if}
	</div>
</div>
