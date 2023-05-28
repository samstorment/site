<script lang="ts" context="module">
    import '$styles/prose.scss';
    import img from './img.svelte';

    export { img };
</script>

<div class="prose">
    <slot />
</div>