<script context="module">
	export const ssr = false;
	const allPosts = import.meta.globEager(`../demos/**/readme.md`);
	let body = [];

	for (let path in allPosts) {
		const post = allPosts[path];
		const metadata = post.metadata;

		const slugPage = path.replace('../demos/', '').replace('/readme.md', '');
		const p = {
			post,
			path,
			slugPage,
			metadata
		};

		body.push(p);
	}

	export const load = ({ page }) => {
		const posts = body;
		const { slug } = page.params;
		console.log(slug);

		const filteredPosts = posts.filter((p) => {
			return p.slugPage.toLowerCase() === slug.toLowerCase();
		});

		const path = filteredPosts[0].path.replace('/demos', '').replace('/readme.md', '');
		const nameFileC3P = filteredPosts[0]?.metadata?.c3p;
		const pathFile3CP = `${filteredPosts[0].path
			.replace('/demos', '')
			.replace('/readme.md', '')}/${nameFileC3P}`;
		const pathDemoOnLine = filteredPosts[0].path
			.replace('../demos/', '')
			.replace('/readme.md', '')
			.split('/');
		pathDemoOnLine.unshift('demo');
		// pathDemoOnLine.splice(0, 0, 'demo');

		return {
			props: {
				page: filteredPosts[0].post.default,
				metadata: filteredPosts[0].metadata,
				path,
				nameFileC3P,
				pathFile3CP,
				pathDemoOnLine: pathDemoOnLine.join('/')
			}
		};
	};
</script>

<script>
	import { base } from '$app/paths';
	import PageTransition from '$lib/PageTransition.svelte';
	export let key;

	export let page;
	export let metadata;
	export let path;
	export let pathDemoOnLine;

	// console.log('path: ', path);
	// const a = `${base}/demo/${path}/index.html`;
	// console.log('a: ', a);
</script>

<PageTransition refresh={key}>
	{#if metadata}
		{#if metadata.title}
			<h3 class="text-gray-700 text-3xl font-medium">{metadata.title}</h3>
		{/if}
		<ul>
			<li>
				{#if metadata.c3p}
					<b>c3p:</b>
					<a href={`${base}/${path}/${metadata.c3p}`} download>{metadata.c3p}</a>
				{/if}
			</li>
		</ul>
	{/if}

	<!-- <b>demo:</b><a href={`${base}/${path}/demo/`}>demo</a> -->
	<b>demo:</b><a href={`${base}/${pathDemoOnLine}/index.html`} target="_blank">demo</a>
	<iframe
		src={`${base}/${pathDemoOnLine}/index.html`}
		width="600"
		height="400"
		scrolling="no"
		title="game"
	/>

	<svelte:component this={page} />
</PageTransition>
