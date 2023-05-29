import { Metadata, Post } from '$posts/_config.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    
    try {
        const { slug } = Post.pick({ slug: true }).parse({
            slug: params.slug
        });

        const post = await import(`../../posts/${slug}.md`);

        return {
            slug: slug,
            meta: Metadata.parse(post.metadata),
            content: post.default
        }
    } catch (err) {
        // console.log(err);

        throw error(404);
    }
}