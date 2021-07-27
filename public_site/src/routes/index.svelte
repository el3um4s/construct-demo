<script context="module">
	// export const ssr = false;

	const allPosts = import.meta.globEager(`../demos/**/readme.md`);
	let body = [];
	for (let path in allPosts) {
		const post = allPosts[path];
		// const metadata = post.metadata;
		// const namePage = path.split('/');
		// const slugPage = namePage[namePage.length - 2].slice(4);
		const slugPage = path.replace('../demos/', '').replace('/readme.md', '');
		// console.log(slug);
		const p = {
			path,
			///metadata,
			slugPage
		};
		body.push(p);
	}

	// console.log(body);
	export const load = async () => {
		return { props: { posts: body } };
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';
	export let posts;
</script>

<ul>
	{#each posts as { slugPage }}
		<li>
			<a href={`${base}/${slugPage}`} sveltekit:prefetch>{slugPage}</a>
		</li>
	{/each}
</ul>

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
	li {
		margin-bottom: 16px;
	}
</style>
