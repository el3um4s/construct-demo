<script lang="ts">
	import { base } from '$app/paths';
</script>

<nav>
	<ul>
		<li>
			<a sveltekit:prefetch href={`${base}/`}>Home</a>
		</li>
	</ul>
</nav>

<style>
	ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		margin-right: 10px;
	}
</style>
