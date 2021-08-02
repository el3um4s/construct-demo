<script context="module">
	// export const ssr = false;
	// https://dashboard-tailwindcomponents.netlify.app/

	async function generateBody(allPosts) {
		let body = [];
		for (let path in allPosts) {
			const post = allPosts[path];
			const metadata = post.metadata;
			const slugPage = path.replace('../demos/', '').replace('/readme.md', '');
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

	export const load = async () => {
		const allPosts = import.meta.globEager(`../demos/**/readme.md`);
		let body = await generateBody(allPosts);
		return { props: { posts: body } };
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';

	import Card from '$lib/components/Card/Card.svelte';
	import Settings from '$lib/components/Layout/Settings/Settings.svelte';

	import { settings } from '$lib/store/settings';
	import sortPost from '$lib/ts/order';

	export let posts: any[];

	// posts = sortPost(posts, $settings.orderBy, $settings.order);

	$: sortedPosts = [...sortPost(posts, $settings.orderBy, $settings.order)];
</script>

<Settings />

<div>
	{#each sortedPosts as { slugPage, metadata, preview, id }, i ({ id })}
		<Card
			{id}
			title={metadata?.title ? metadata.title : slugPage}
			href={`${base}/${slugPage}`}
			preview="{base}/{preview}"
			tags={metadata?.tags ? metadata.tags : []}
			description={metadata?.description ? metadata.description : ''}
			dataCreated={metadata?.date?.created ? metadata.date.created : ''}
			dataUpdated={metadata?.date?.updated ? metadata.date.updated : ''}
		/>
	{/each}
</div>
