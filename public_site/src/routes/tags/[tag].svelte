<script context="module">
    const allPosts = import.meta.glob("../blog/**/*.md");

    let body = [];
    for (let path in allPosts) {
        body.push(
            allPosts[path]().then( ({metadata}) => {
            return { path, metadata}
            })
        );  
    }

    export async function load({page}) {
		const posts = await Promise.all(body);
        const tag = page.params.tag;
        
        const filteredPosts = posts.filter( p => p.metadata.tags.includes(tag) );

        return {
            props: {
                posts: filteredPosts,
                tag
            }
        }
	}
</script>

<script>
    import { base } from '$app/paths';
    
    export let posts;
    export let tag;
</script>

<h1>{tag}</h1>

<ul>
    {#each posts as {path, metadata: {title, tags}} }
        <li>
            <a href={`${base}/blog/${path.replace(".md","")}`}>{title}</a>

                {#each tags as tag}
                    <a class="tag" href="{`${base}/tags/${tag}`}">{tag}</a>
                {/each}
        </li>
    {/each}
</ul>