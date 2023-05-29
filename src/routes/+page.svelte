<script lang="ts">
    import PostList from "$lib/components/PostList.svelte";
    import Head from "./Head.svelte";

    export let data;
</script>

<Head title="" />

<div id="page">
    <PostList posts={data.posts} title="Posts" />
</div>

<style>
    #page {
        padding: 1rem;
    }
</style>
