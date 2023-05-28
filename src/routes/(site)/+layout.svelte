<script lang="ts">
    import { toggleTheme } from '$lib/util/theme';
    import { fly } from 'svelte/transition';
    import '../../global.css';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';

    export let data;

    let header: HTMLElement;

    let theme = "";
    $: other = theme === "dark" ? "light" : "dark";

    onMount(() => {
        theme = data.theme;
        // add this on mount or there is a color flicker
        document.body.classList.add('theme-transition');
        header.classList.add('theme-transition');
    });



</script>

<div id="all">

<header bind:this={header}>
    <nav>
        <a href="/">Home</a>
        <a href="/categories">Categories</a>
        <button 
            title="Activate {other} mode"
            aria-label="Activate {other} mode"
            id="theme-button" 
            type="button"
            on:click={() => theme = toggleTheme()}
            class:dark={theme === "dark"}
        >
            {#key theme}
                <span in:fly={{y: -100}}>
                    <Icon icon="{theme === "dark" ? "ph:moon" : "ph:sun"}" />
                </span>
            {/key}
            <div class="bloom"></div>
        </button>
    </nav>
</header>

<main>
    <slot />
</main>
    
</div>

<style>
    #all {
        min-height: 100%;
    }

    header {
        padding: 1em;
        position: sticky;
        top: 0;
        background-color: var(--clr-bg);
        z-index: 9999;
        /* backdrop-filter: blur(10px); */
    }
    
    nav {
        display: flex;
        gap: 1em;
        max-width: 800px;
        margin: 0 auto;
        align-items: center;
    }

    a {
        color: inherit;
        text-decoration: none;
    }


    button {
        background-color: transparent;
        color: inherit;
        border: none;
        margin-left: auto;
        cursor: pointer;
        padding: 0 1rem;
        border-radius: 9999px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 1rem;
        transition: transform ease-in-out 250ms;
        position: relative;
    }
    
    button:hover {
        /* background-color: var(--clr-hover); */
        /* transform: rotate(20deg); */
        background-color: transparent;
    }

    button:focus {
        outline: none;
    }
    
    span {
        font-size: 1.4rem;
        transition: color ease-in-out 250ms;
    }
    
    button:hover span,
    button:focus-visible span {
        /* transform: rotate(20deg); */
        /* color: rgb(230, 126, 0); */
        color: goldenrod;
    }

    button.dark:hover span,
    button.dark:focus-visible span {
        color: teal;
    }

    .bloom {
        position: absolute;
        pointer-events: none;
        transition: box-shadow ease-in-out 100ms;
    }

    button:hover .bloom,
    button:focus-visible .bloom {
        box-shadow: 0 0 2em .8em goldenrod;
    }

    button.dark:hover .bloom,
    button.dark:focus-visible .bloom {
        box-shadow: 0 0 2em .7em teal;
    }
</style>
