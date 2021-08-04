<script context="module">
	async function generateBody(allPosts) {
		let body = [];
		for (let path in allPosts) {
			const post = allPosts[path];
			const metadata = post.metadata;
			const slugPage = path.replace('../../demos/', '').replace('/readme.md', '');
			const preview = `image-post/${slugPage}/image.jpg`;

			const id = Math.random().toString();
			const p = {
				path,
				metadata,
				slugPage,
				preview,
				id
			};
			body.push(p);
		}
		return body;
	}

	export const load = async ({ page }) => {
		const allPosts = import.meta.globEager(`../../demos/**/readme.md`);
		console.log(allPosts);
		const tag = page.params.tag;

		let body = await generateBody(allPosts);
		const filteredPosts = body.filter((p) => p?.metadata?.tags.includes(tag));
		return { props: { posts: filteredPosts, tag } };
	};
</script>

<script>
	import { base } from '$app/paths';
	import { flip } from 'svelte/animate';

	import { settings } from '$lib/store/settings';
	import sortPost from '$lib/ts/order';

	import Card from '$lib/components/Card/Card.svelte';
	import Settings from '$lib/components/Layout/Settings/Settings.svelte';

	export let posts;
	export let tag;

	$: listPosts = [...sortPost(posts, $settings.orderBy, $settings.order, $settings.showDeprecated)];
</script>

<Settings />

<div>
	<h1>{tag}</h1>
	{#each listPosts as { slugPage, metadata, preview, id }, i ({ id })}
		<span animate:flip>
			<Card
				{id}
				deprecated={metadata?.deprecated}
				title={metadata?.title ? metadata.title : slugPage}
				href={`${base}/${slugPage}`}
				preview="{base}/{preview}"
				tags={metadata?.tags ? metadata.tags : []}
				description={metadata?.description ? metadata.description : ''}
				dataCreated={metadata?.date?.created ? metadata.date.created : ''}
				dataUpdated={metadata?.date?.updated ? metadata.date.updated : ''}
			/>
		</span>
	{/each}
</div>
