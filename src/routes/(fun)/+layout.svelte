<script lang="ts">
    import '../../global.css';
    import { onMount, tick } from "svelte";

    let width = 1920;
    let height = 1080;

    type Context = CanvasRenderingContext2D;

    let canvas: HTMLCanvasElement;
    let context: Context;

    let mounted = false;

    let gridSize = 2;

    let cachedImage: CachedImage;

    type Circle = {
        x: number,
        y: number,
        r: number,
        hue: number
    }

    type CachedImage = {
        w: number,
        h: number,
        data: ImageData
    }

    const rand = (min: number, max: number) => Math.floor(Math.random() * max) + min;


    async function drawCircles(): Promise<CachedImage> {
        const size = gridSize;

        context.lineWidth = 1;
        context.lineCap = 'round';
        
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(100, 100);
        context.closePath();
        
        context.strokeStyle = 'hotpink';

        let pad = size * 100;

        let r = 8;

        context.strokeStyle = '#123abc';

        for (let i = -pad; i < width + pad; i += size) {
            drawCircle(i, rand(0, height / size) * size, rand(r-1, r+5), "turquoise");
            drawCircle(i, rand(0, height / size) * size, rand(r-1, r+5), "teal");
            drawCircle(i, rand(0, height / size) * size, rand(r-1, r+5), "salmon");
            drawCircle(i, rand(0, height / size) * size, rand(r-1, r+5), "gold");
            drawCircle(i, rand(0, height / size) * size, rand(r-1, r+5), "cornflowerblue");
        }

        await tick();

        const data = context.getImageData(0, 0, width, height);

        return { w: width, h: height, data };
    }

    function drawCircle(x: number, y: number, r: number, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.ellipse(x, y, r, r, 0, 0, 2 * Math.PI, );
        context.fill();
        context.closePath();
    }

    onMount(async () => {
        mounted = true;

        // wait for canvas to mount
        await tick();

        context = canvas.getContext('2d')!;

        const resize = async () => {

            setDimensions();

            // wait for the new width and height to be applied
            await tick();
            
            const outgrewCache = !cachedImage || width > cachedImage.w || height > cachedImage.h;
            
            if (outgrewCache) {
                cachedImage = await drawCircles();
            } else {   
                context.putImageData(cachedImage.data, 0, 0);
            }
        }

        function setDimensions() {
            width = window.innerWidth;
            height = window.innerHeight;
        }



        const observer = new ResizeObserver(entries => {
            resize();
        });

        observer.observe(document.body);

        return () => {
            observer.disconnect();
        }
    });
</script>

<slot />

{#if mounted}
<div>
    <canvas {width} {height} bind:this={canvas}></canvas>
</div>
{/if}

<svg>
    <filter id="grainy">
        <feTurbulence 
            type="turbulence"
            baseFrequency="0.8"
            result="turbulence"
        />
    </filter>
</svg>

<style>
    div, canvas {
        pointer-events: none;
    }

    div::before, div::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 100%;
        z-index: 9999;
        opacity: 30%;
    }

    div::before {
        filter: url(#grainy);
    }

    canvas {
        top: 0;
        left: 0;
        position: fixed;
    }
</style>