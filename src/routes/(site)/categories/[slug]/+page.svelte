<script lang="ts">
    import PostList from "$lib/components/PostList.svelte";

    export let data;
</script>

<div id="page">
    <PostList {...data} />
</div>

<style>
    #page {
        padding: 1rem;
    }
</style>