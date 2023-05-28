import { error, json } from "@sveltejs/kit";
import { File, Metadata, Post } from '$posts/_config';

async function getPosts(): Promise<Post[]> {
    const posts: Post[] = [];

    const paths = import.meta.glob('/src/posts/*.md', { eager: true });

    for (const path in paths) {
        const file = paths[path];

        const filename = path.split('/').pop();

        const fileData = File.parse({ filename, slug: filename });
        
        if (file && typeof file === 'object' && 'metadata' in file) {
            const metadata = Metadata.parse(file.metadata);
            posts.push({ ...metadata, ...fileData });
        }
    }

    return posts.sort(newestFirst);
}

function newestFirst(a: Post, b: Post) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export async function GET() {
    const posts = await getPosts();
    return json(posts.filter(p => !p.draft));
}