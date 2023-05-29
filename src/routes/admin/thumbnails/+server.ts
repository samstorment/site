import type { Post } from "$posts/_config.js";
import { json, text } from "@sveltejs/kit";
import * as fs from 'fs';


export async function POST({ request, fetch }) {

    const response = await fetch('/api/posts');
    const posts: Post[] = await response.json();
    
    const formData = await request.formData();

    for (let p of posts) {
        const blob = formData.get(p.slug) as Blob;

        const buffer = Buffer.from(await blob.arrayBuffer());

        fs.writeFile(`static/thumbnails/${p.slug}.png`, buffer, () => {
            console.log("wrote file");
        });
    }

   return json({ message: 'Thumbnails created'});
}