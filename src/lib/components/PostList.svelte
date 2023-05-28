<script lang="ts">
    import type { Post } from "$posts/_config";
    import Date from "./Date.svelte";

    export let title: string;
    export let posts: Post[];
</script>


<section>
    <h1>{title}</h1>

    {#each posts as p}
        <article>
            <a href="/{p.slug}">
                <hgroup>
                    <h2>
                        {p.title}
                    </h2>
                    <p><Date date={p.date} /></p>
                </hgroup>
            </a>
        </article>
    {/each}
</section>


<style>
    section {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        margin-bottom: 1rem;
    }

    a {
        border: 1px solid var(--clr-border);
        padding: 1em;
        display: block;
        color: inherit;
        text-decoration: none;
        border-radius: .25rem;
    }

    a:hover {
        box-shadow: 0 0 .4rem 0 var(--clr-shadow);
    }


    article:not(:last-child) {
        margin-bottom: 1em;
    }

    p {
        font-size: .9rem;
        color: gray;
    }
</style>
