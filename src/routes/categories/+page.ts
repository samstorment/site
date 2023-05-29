import { categories, type Category, type Post } from '$posts/_config';

export async function load({ fetch }) {
   const response = await fetch('/api/posts');

   const posts: Post[] = await response.json();

   const distinctCategories = Array.from(new Set(posts.map(p => p.categories).flat()));

   const sortedCategories = categories
      .filter(c => distinctCategories.includes(c.name))
      .sort((cat1: Category, cat2: Category) => {
         const a = cat1.name.toLowerCase();
         const b = cat2.name.toLowerCase();
         if (a === b) return 0;
         if (a > b) return 1;
         return -1;
      });

   return { categories: sortedCategories };
}

