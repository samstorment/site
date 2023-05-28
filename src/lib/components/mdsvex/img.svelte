<script lang="ts">
    export let src: string;
    export let alt: string;
</script>

<img {src} {alt} loading="lazy">
<div>{alt}</div>


<style>
    img {
        max-height: 200px;
    }
</style>