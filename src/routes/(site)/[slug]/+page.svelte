<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    import { fly, scale, slide } from 'svelte/transition';
    import { slug } from '$posts/_config.js';
    import Circle from "./Circle.svelte";
    import { rand } from "$lib/util/util";
    export let data;

    let topWidth = 0;
    let topHeight = 0;
    $: canvasWidth = topWidth * 2;
    $: canvasHeight = topHeight * 2;

    let top: HTMLDivElement;

    type Context = CanvasRenderingContext2D;

    let canvas: HTMLCanvasElement;
    let context: Context;

    let mounted = false;
    let hovering = false;
    let introDone = false;

    let gridSize = 5;

    let cachedImage: CachedImage;

    type CachedImage = {
        w: number,
        h: number,
        data: ImageData
    }

    async function drawCircles(): Promise<CachedImage> {
        const size = gridSize;

        context.lineWidth = 1;
        context.lineCap = 'round';
        
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(100, 100);
        context.closePath();
        
        context.strokeStyle = 'hotpink';

        let r = 8;

        context.strokeStyle = '#123abc';

        for (let i = 0; i < canvasWidth; i += size) {
            drawCircle(i, rand(0, canvasHeight / size) * size, rand(r-1, r+5), "turquoise");
            drawCircle(i, rand(0, canvasHeight / size) * size, rand(r-1, r+5), "teal");
            drawCircle(i, rand(0, canvasHeight / size) * size, rand(r-1, r+5), "salmon");
            drawCircle(i, rand(0, canvasHeight / size) * size, rand(r-1, r+5), "gold");
            drawCircle(i, rand(0, canvasHeight / size) * size, rand(r-1, r+5), "cornflowerblue");
        }

        await tick();

        const data = context.getImageData(0, 0, canvasWidth, canvasHeight);

        return { w: canvasWidth, h: canvasHeight, data };
    }

    function drawCircle(x: number, y: number, r: number, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.ellipse(x, y, r, r, 0, 0, 2 * Math.PI, );
        context.fill();
        context.closePath();
    }

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
                cachedImage = await drawCircles();
                return;
            }

            context.putImageData(cachedImage.data, 0, 0);
        }

        function setDimensions() {
            const rect = top.getBoundingClientRect();
            topWidth = rect.width;
            topHeight= rect.height;
        }

        setTimeout(() => introDone = true, 1000);

        observer = new ResizeObserver(resize);

        observer.observe(top);

    });

    onDestroy(() => {
        observer && observer.disconnect();
    });

</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>


<svg width="0" height="0">
    <filter id="grainy">
        <feTurbulence 
            type="turbulence"
            baseFrequency="0.8"
            result="turbulence"
        />
    </filter>
</svg>

<article>
    <div 
        class="top" 
        bind:this={top}
        on:pointerenter={() => hovering = introDone && true }
        on:pointerleave={() => hovering = false }
    >
        <div id="grainy-canvas">
            {#if mounted}
                <canvas 
                    width={canvasWidth} height={canvasHeight} 
                    bind:this={canvas} 
                    class:introDone 
                    in:scale
                    on:transitionend={() => introDone = true}
                ></canvas>
            {/if}
        </div>
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
        z-index: 999;
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

    #grainy-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to right, turquoise, salmon, teal, gold, cornflowerblue);
        background-color: hsla(258, 89%, 18%, 0.5);        
    }

    #grainy-canvas::before, #grainy-canvas::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 70%;
        margin: 0;
        padding: 0;
    }

    #grainy-canvas::before {
        filter: url(#grainy);
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