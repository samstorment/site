<script lang="ts">
    import { rand } from "$lib/util/util";

    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    export let index: number;
    export let hovering: boolean;

    let visible = false;

    let r = rand(5,10);
    let top = rand(0,100);
    let left = rand(0,100);

    let x = rand(-100,100);
    let y = rand(-100,100);

    // console.log(rand(-200, 200))

    let colors = [ 'teal', 'turquoise', 'cornflowerblue', 'gold', 'salmon' ];

    onMount(() => {
        visible = true;

    });

    function transX() {
        if (left < 10) return rand(-25, 0);
        if (left > 90) return rand(0, 25);
        return rand(-50,50);
    }
    
    function transY() {
        if (top < 10) return rand(-50, -25);
        if (top > 90) return rand(0, 25);
        return rand(-50,50);
    }
</script>

{#if visible}
<div 
    style={`top: ${top}%; left: ${left}%; ${hovering ? `transform: translate(${transX()}px, ${transY()}px)` : ""}`} 
    transition:fly|local={{ x, y, delay: index * 10 }}
>
    <svg xmlns="http://www.w3.org/2000/svg" fill={colors[rand(0,4)]}>
        <circle cx={r} cy={r} r={r} />
    </svg>
</div>
{/if}


<style>
    div {
        position: absolute;
        z-index: 1;
        transition: transform cubic-bezier(0.175, 0.885, 0.32, 1.275) 500ms;
    }
</style>