import { dev,  } from '$app/environment';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    if (!dev) throw error(404);
}