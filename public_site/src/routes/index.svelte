<script context="module">
	export const ssr = false;

	// const allPosts = import.meta.globEager(`../demos/**/readme.md`);

	async function generateBody(allPosts) {
		let body = [];
		for (let path in allPosts) {
			const post = allPosts[path];
			const metadata = post.metadata;
			// const namePage = path.split('/');
			// const slugPage = namePage[namePage.length - 2].slice(4);
			const slugPage = path.replace('../demos/', '').replace('/readme.md', '');
			const preview = `image-post/${slugPage}/preview.png`;
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

	// console.log(body);
	export const load = async () => {
		const allPosts = import.meta.globEager(`../demos/**/readme.md`);
		let body = await generateBody(allPosts);
		return { props: { posts: body } };
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';
	export let posts;
</script>

<div>
	{#each posts as { slugPage, metadata, preview }}
		<p>
			<!-- {#if hasPreview} -->
			<!-- {image} -->
			<!-- <img src={image} alt="preview" /> -->
			<!-- <img src="{preview}/{metadata.preview}" alt="preview" /> -->
			<!-- <div class="image-div" style="background-image: url('{image}')" /> -->
			<!-- {/if} -->
			<img src={`${base}/${preview}`} alt="preview" />
			<a href={`${base}/${slugPage}`} sveltekit:prefetch
				>{#if metadata?.title} {metadata.title} {:else}{slugPage}{/if}</a
			>
			({#if metadata?.tags} {metadata.tags} {:else}"NO TAGS"{/if})
		</p>
	{/each}
</div>

<!-- <ul>
	{#each posts as { slugPage, metadata: { title, slug } }}
		<li>
			<a href={`${base}/${linkSlug(slug, slugPage)}`} sveltekit:prefetch>{title}</a>
		</li>
	{/each}
</ul> -->
<style>
	a {
		color: #2a2a2a;
	}
</style>
