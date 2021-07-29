<script context="module">
	async function generateBody(allPosts) {
		let body = [];
		for (let path in allPosts) {
			const post = allPosts[path];
			const metadata = post.metadata;
			const slugPage = path.replace('../../demos/', '').replace('/readme.md', '');
			const preview = `image-post/${slugPage}/image.jpg`;
			const p = {
				path,
				metadata,
				slugPage,
				preview
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
	import Card from '$lib/components/Card/Card.svelte';
	export let posts;
	export let tag;
</script>

<div>
	<h1>{tag}</h1>
	{#each posts as { slugPage, metadata, preview }}
		<Card
			title={metadata?.title ? metadata.title : slugPage}
			href={`${base}/${slugPage}`}
			preview="{base}/{preview}"
			tags={metadata?.tags ? metadata.tags : []}
			description={metadata?.description ? metadata.description : ''}
		/>
	{/each}
</div>
