<script context="module">
    export const load = async({ page }) => {
        return {
            props: {
                key: page.path,
            }
        }
    };
</script>

<script>
    import PageTransition from "$lib/PageTransition.svelte";
    import Nav from "$lib/components/Nav.svelte";
    export let key
</script>

<div class="container">
    <Nav></Nav>
    <PageTransition refresh={key}>
       <slot></slot>
    </PageTransition>
</div>

<style>
    .container {
        max-width: 600px;
        margin: 50px auto;
    }
</style>