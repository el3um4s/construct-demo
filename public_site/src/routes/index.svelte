<script context="module">
	// export const ssr = false;
	// https://dashboard-tailwindcomponents.netlify.app/

	async function generateBody(allPosts) {
		let body = [];
		for (let path in allPosts) {
			const post = allPosts[path];
			const metadata = post.metadata;
			// const namePage = path.split('/');
			// const slugPage = namePage[namePage.length - 2].slice(4);
			const slugPage = path.replace('../demos/', '').replace('/readme.md', '');
			// const preview = `image-post/${slugPage}/preview.png`;
			const preview = `image-post/${slugPage}/image.jpg`;
			// const preview = `/src/demos/${slugPage}/preview.png`;
			// const preview = `/src/demos/${slugPage}/`;
			// const hasPreview = metadata?.preview ? true : false;
			// let image = null;
			// if (hasPreview) {
			// 	image = await import(`../demos/${slugPage}/preview.png`);
			// 	console.log(image);
			// }
			const p = {
				path,
				metadata,
				slugPage,
				preview
				// preview,
				// hasPreview,
				// image: image ? image.default : ''
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

<script>
	import { base } from '$app/paths';
	import Card from '$lib/components/Card/Card.svelte';
	export let posts;
</script>

<div>
	{#each posts as { slugPage, metadata, preview }}
		<Card
			title={metadata?.title ? metadata.title : slugPage}
			href={`${base}/${slugPage}`}
			preview="{base}/{preview}"
			tags={metadata?.tags ? metadata.tags : []}
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
