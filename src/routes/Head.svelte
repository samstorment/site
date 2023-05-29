<script lang="ts">
    import * as constants from "$lib/util/constants";

    export let title: string;
    export let description = constants.description;
    export let type = "website";
    export let image = `${constants.url}/og-image.png`;
    export let imageAlt: string = "";
    export let imageWidth: number = 1200;
    export let imageHeight: number = 630;
</script>

<svelte:head>
    <title>{title}</title>

    <meta property="og:type" content={type} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:image:width" content="'{imageWidth}'" />
    <meta property="og:image:width" content="'{imageHeight}'" />

    <meta property="twitter:description" content={title} />
    <meta property="twitter:title" content={description} />
    <meta property="twitter:image" content={image} />
    <slot />
</svelte:head>