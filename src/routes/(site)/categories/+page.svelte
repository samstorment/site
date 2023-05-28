<script lang="ts">
    export let data;

    let letters = new Set(data.categories.map(c => c.name.charAt(0).toLowerCase()));
</script>


<div id="page">
    <section>
        <h1>Categories</h1>
        
        {#each Array.from(letters) as letter}
            <h2>{letter}</h2>

            <div class="category-group">
                {#each data.categories.filter(cat => cat.name.toLowerCase().startsWith(letter)) as c}
                    <a href="/categories/{c.slug.toLowerCase()}">{c.name}</a>
                {/each}
            </div>
        {/each}

    </section>
</div>


<style>
    #page {
        padding: 1rem;
    }

    section {
        max-width: 800px;
        margin: 0 auto;
    }

    h1 {
        margin-bottom: 1rem;
    }
    
    h2 {
        text-transform: uppercase;
        margin-bottom: .5rem;
    }

    h2:not(:first-of-type) {
        margin-top: 2rem;
    }

    .category-group {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
    }

    a {
        border: 1px solid var(--clr-border);
        border-radius: .25rem;
        display: block;
        padding: 1rem;
        flex: 1;
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        box-shadow: 0 0 .4rem 0 var(--clr-shadow);
    }
</style>