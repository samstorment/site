<script lang="ts">
    import { page } from "$app/stores";

</script>

<div id="page">
    <hgroup>
        <h1>{$page.status}</h1>
        <p>{$page.error?.message}</p>
    </hgroup>
</div>

<style>
    #page {
        padding: 1rem;
        max-width: calc(800px + 2rem);
        margin: 0 auto;
        height: 100%;
    }

    hgroup {
        border: 1px solid var(--clr-border);
        padding: 1rem;
        border-radius: .25rem;
    }
</style>