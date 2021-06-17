<script lang="ts">
	// import type { ItemType } from "./Components/Menu/ItemType";

	import initializeMenuSvelte from "./Globals/MenuSvelte";

	import css from "./Stores/CSSVarStyle";
 	import items from "./Stores/Items";
	import columns from "./Stores/Columns";
	import title from "./Stores/Titles";
	import visible from "./Stores/VisibilityMenu";

	import Menu from "./Components/Menu.svelte";
	import Header from "./Components/Menu/Header.svelte"
	import Item from "./Components/Menu/Item.svelte";

	initializeMenuSvelte();
	css.init();
	columns.allColumns();
	items.clearMenu();
</script>

<div id="page" style="{$css.cssVarStyles}">
	{#if $visible}
		<Menu on:closeModal={visible.false} items={$items} let:prop={item} columns={$columns} let:columns={columns}>
			<Header slot="header" title={$title}></Header>
			<Item slot="item" {item} {columns}/>
		</Menu>
	{/if}
</div>



<style>
	#page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
	}
</style>