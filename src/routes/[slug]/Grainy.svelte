<script lang="ts">
    import GrainySvg from "./GrainySvg.svelte";

    
</script>

<GrainySvg />

<div id="grainy-canvas">
    <slot></slot>
</div>


<style>
    #grainy-canvas {
        pointer-events: none;
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
        z-index: 1;
        opacity: 70%;
        margin: 0;
        padding: 0;
    }

    #grainy-canvas::before {
        filter: url(#grainy);
    }
</style>