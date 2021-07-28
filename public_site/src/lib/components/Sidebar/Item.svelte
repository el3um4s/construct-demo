<script>
	export let icon;
	export let label;
	export let href;

	let customClass = '';
	export { customClass as class };
</script>

<a
	class="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 {customClass}"
	{href}
>
	<span class={icon} />

	<span class="mx-3">{label}</span>
</a>
