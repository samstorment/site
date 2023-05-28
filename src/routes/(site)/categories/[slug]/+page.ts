import { Post, categories } from '$posts/_config';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const response = await fetch('/api/posts');
    const posts: Post[] = await response.json();

    const category = categories
        .find(c => c.slug.toLowerCase() === params.slug.toLowerCase());

    if (!category) {
        throw error(404, `Category ${params.slug} does not exist`);
    }

    return {
        title: category.name,
        posts: posts
            .filter(p => p.categories.includes(category.name))
    };
}
