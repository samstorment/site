import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import slug from 'rehype-slug';
import autolink from 'rehype-autolink-headings';
// import codeFrontmatter from 'remark-code-frontmatter';
// import codeExtra from 'remark-code-extra';
// import codeTitle from 'rehype-code-title';
import { html } from 'common-tags';
import shiki from 'shiki';

/** @param {string[]} argv - Array of markdown arguments  */
function parseArgs(argv) {
	const args = argv.split('__');

	let [ lang, page ] = args[0].split(':');

	page = page?.split('/').join('<wbr />/');

	/** @param {'ins' | 'del' | 'mark'} markType */
	function getLineMarkings(markType) {
		return args.find(arg => arg.startsWith(markType))
			?.split(':').pop()
			?.split(',')
			.map(num => {
				return { line: parseInt(num), classes: [ markType ] }
			}) ?? [];
	} 
		
	return {
		lang, 
		page,
		lineOptions: [
			...getLineMarkings('ins'),
			...getLineMarkings('del'),
			...getLineMarkings('mark')
		]
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: './src/lib/components/mdsvex/_DefaultLayout.svelte'
			},
			highlight: {
				highlighter: async (code, args = 'text') => {
				
					const { lang, page, lineOptions } = parseArgs(args);

					const highlighter = await shiki.getHighlighter({
						theme: 'dark-plus'
					});

					let htmlStr = escapeSvelte(highlighter.codeToHtml(code, { 
						lang,
						lineOptions
					}));

					htmlStr = html`
					<figure class="shiki-container">
						<figcaption>
							<div>${page ?? lang}</div>
						</figcaption>
					${htmlStr}
					</figure>
					`;

					return `{@html \`${htmlStr}\`}`;
				}
			},
			rehypePlugins: [ slug, autolink ],
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			"$posts": "src/posts",
			"$posts/*": "src/posts/*",
			"$styles": "src/styles",
			"$styles/*": "src/styles/*",
			"$lib": "src/lib",
			"$lib/*": "src/lib/*",
		}
	}
};

export default config;
