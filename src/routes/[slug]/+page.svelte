<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    import { fly, scale, slide } from 'svelte/transition';
    import { slug } from '$posts/_config.js';
    import Circle from "./Circle.svelte";
    import { rand } from "$lib/util/util";
    import Grainy from "./Grainy.svelte";
    import { drawCircles, type CachedImage, type Context } from "$lib/util/canvas";
    import Head from "../Head.svelte";
    import { url } from "$lib/util/constants";
    export let data;

    let topWidth = 0;
    let topHeight = 0;
    $: canvasWidth = topWidth * 2;
    $: canvasHeight = topHeight * 2;

    let top: HTMLDivElement;


    let canvas: HTMLCanvasElement;
    let context: Context;

    let mounted = false;
    let hovering = false;
    let introDone = false;

    let gridSize = 5;

    let cachedImage: CachedImage;



    let observer: ResizeObserver;

    onMount(async () => {
        mounted = true;

        // wait for canvas to mount
        await tick();

        context = canvas.getContext('2d')!;

        const resize = async () => {

            setDimensions();

            // wait for the new width and height to be applied
            await tick();

            const outgrewCache = !cachedImage || 
                topWidth * 1.5 > cachedImage.w || 
                topHeight * 1.5 > cachedImage.h;
            
            if (outgrewCache) {
                cachedImage = await drawCircles(context, canvasWidth, canvasHeight, 5, 2);
                return;
            }

            context.putImageData(cachedImage.data, 0, 0);
        }

        function setDimensions() {
            const rect = top.getBoundingClientRect();
            topWidth = rect.width;
            topHeight = rect.height;
        }

        setTimeout(() => introDone = true, 1000);

        observer = new ResizeObserver(resize);

        observer.observe(top);

    });

    onDestroy(() => {
        observer && observer.disconnect();
    });

</script>

<Head 
    title={data.meta.title}
    description={data.meta.description}
    type="article"
    image="{url}/thumbnails/{data.slug}.png"
    imageAlt="The title and description of the article titled {data.meta.title}"
/>

<article>
    <div 
        class="top" 
        bind:this={top}
        on:pointerenter={() => hovering = introDone && true }
        on:pointerleave={() => hovering = false }
    >
        <Grainy>
            {#if mounted}
                <canvas 
                    width={canvasWidth} height={canvasHeight} 
                    bind:this={canvas} 
                    class:introDone 
                    in:scale
                    on:transitionend={() => introDone = true}
                ></canvas>
            {/if}
        </Grainy>
        {#each { length: 100 } as _, i}
            <Circle index={i} {hovering} />
        {/each}
        <hgroup>
            <h1>{data.meta.title}</h1>
            <p>{data.meta.date.toLocaleDateString()}</p>
        </hgroup>
    </div>
    
    <div class="content">
        <div class="wow">
            <svelte:component this={data.content} />
        </div>
    </div>

    {#if data.meta.categories.length > 0}
        <div class="tags-container">
            <ul class="tags">
                {#each data.meta.categories as c}
                <li>
                    <a href="/categories/{slug(c)}" class="tag">{c}</a>
                </li>
                {/each}
            </ul>
        </div>
    {/if}
</article>

<style lang="scss">
    $border: 1px solid var(--clr-border);
    
    .top {
        position: relative;
        overflow: hidden;
        scroll-snap-align: start;
    }

    hgroup {
        padding-bottom: 1em;
        padding: 3rem 1em;
        color: white;
        z-index: 2;
        position: relative;
        text-shadow: 0 2px .5em black;
        box-shadow: inset 0 0 2em 0 black;
    }
    

    hgroup > *, .tags {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        font-size: 3rem;
        margin-top: 5rem;
    }
    
    canvas {
        position: absolute;
        top: -50%;
        left: -50%;
        max-width: none;
        transition: transform ease-in-out 250ms;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: .5em;
    }
    
    .tags-container {
        padding: 1em;
        border-top: $border;
    }

    .tag {
        display: block;
        padding: .25em 1em;
        border-radius: 9999px;
        border: $border;
        color: inherit;
        text-decoration: none;
    }

    .tag:hover {
        box-shadow: 0 0 .4rem 0 var(--clr-shadow);
    }

    article {
        margin: 0 auto;
        font-size: 1.15rem;
    }

    .content {
        padding: 0 1em;
    }
    
    .wow {
        max-width: 800px;
        margin: 0 auto;
    }
</style>