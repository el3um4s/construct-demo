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
	export let posts: any[];

	posts = posts.sort((a, b) => {
		const postA = +new Date(a?.metadata?.date?.created ? a.metadata.date.created : '1990-01-01');
		const postB = +new Date(b?.metadata?.date?.created ? b.metadata.date.created : '1990-01-01');
		return postB - postA;
	});
</script>

<div>
	{#each posts as { slugPage, metadata, preview, id }, i}
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
		<!-- <p>
			<a href={`${base}/${slugPage}`} sveltekit:prefetch>
				<img src={`${base}/${preview}`} alt="preview" />
				{#if metadata?.title} {metadata.title} {:else}{slugPage}{/if}
			</a>
			({#if metadata?.tags} {metadata.tags} {:else}"NO TAGS"{/if})
		</p> -->
	{/each}
</div>
