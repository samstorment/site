import { z } from 'zod';

const categoryNames = [
    'Svelte', 
    'SvelteKit', 
    'CSS', 
    'C#', 
    'Canvas', 
    'Java', 
    'JavaScript', 
    'TypeScript',
    'UI/UX'
] as const;

type CategoryName = typeof categoryNames[number];
type CategorySlug = Record<CategoryName, string>;
export type Category = { name: CategoryName, slug: string };

// provide better slugs when needed
const categorySlugs: Partial<CategorySlug> = {
    'C#': 'c-sharp',
    'UI/UX': 'ui-ux'
};

export const slug = (name: CategoryName) => categorySlugs[name] ?? name.toLowerCase();

export const categories: Category[] = categoryNames.map(c => {
    return { name: c, slug: slug(c) }
});

export const File = z.object({
    filename: z.string().endsWith('.md'),
    slug: z.string().toLowerCase().trim().transform(val => (
        // replace any number of spaces with a dash
        val.replace(/\s+/g, '-').replace('.md', '')
    ))
});

export const Metadata = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
    draft: z.boolean().default(false),
    categories: z.array(z.enum(categoryNames)).default([])
});

export const Post = File.merge(Metadata);

export type Post = z.infer<typeof Post>;
export type Metadata = z.infer<typeof Metadata>;
export type File = z.infer<typeof File>;