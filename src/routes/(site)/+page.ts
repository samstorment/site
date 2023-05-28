import { browser } from '$app/environment';
import { getTheme } from '$lib/util/theme.js';
import type { Post } from '$posts/_config';

export async function load({ fetch }) {
    const response = await fetch('/api/posts');
    const posts: Post[] = await response.json();

    return { posts };
}

