<script lang="ts">
    import PostList from "$lib/components/PostList.svelte";
    import Head from "../../Head.svelte";

    export let data;
</script>

<Head title="{data.title}" />

<div id="page">
    <PostList {...data} />
</div>

<style>
    #page {
        padding: 1rem;
    }
</style>