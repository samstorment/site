<script lang="ts">
    import { onMount } from "svelte";
    import Head from "../../Head.svelte";
    import html2canvas from 'html2canvas';

    export let data;

    let page: HTMLDivElement;

    onMount(async () => {
        const formData = new FormData();

        const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));

        let i = 0;

        for (let thumbnail of thumbnails) {
            const canvas = await html2canvas(thumbnail as HTMLElement);
                
            const post = data.posts[i];
            
            const blob: Blob = await new Promise((res, rej) => {
                canvas.toBlob(blob => res(blob!));
            });
            
            console.log(post.slug);
            
            formData.append(post.slug, blob,`${post.slug}.png`);

            i++;
        }

        const res = await fetch("/admin/thumbnails", { method: 'POST', body: formData });
        const json = await res.json();
    });
</script>

<Head title="Thumbnail Generator" />

<div id="page" bind:this={page}>
    <h1 id="title">Write Thumbnails to <code>/static/thumbnails</code> Folder</h1>

    {#each data.posts as p}
        <div class="thumbnail">
            <hgroup>
                <h1>{p.title}</h1>
                <p>{p.description}</p>
            </hgroup>
        </div>
    {/each}
</div>

<style>
    #page {
        overflow: hidden;
        display: grid;
        gap: 1em;
        padding: 1rem;
        max-width: calc(1200px);
        margin: 0 auto;
    }

    .thumbnail {
        margin: 0 auto;
        width: 1200px;
        height: 630px;
        background-image: linear-gradient(to right, teal, cornflowerblue);
        display: flex;
        align-items: center;
        text-align: center;
    }

    hgroup {
        flex: 1;
        /* text-shadow: 0 0 1rem black; */
        color: white;
        z-index: 2;
        text-align: center;
    }

    hgroup h1 {
        font-size: 8rem;
    }

    hgroup p {
        font-size: 2rem;
    }

    code {
        background-color: var(--clr-border);
        padding: 0 .4rem;
        border-radius: .25rem;
    }
</style>

