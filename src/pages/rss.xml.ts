export const prerender = true;
import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context: { site: any; }) => rss({
	title: `Baraq Kamsani's blog`,
	description: `Articles and tutorials for developers.`,
	site: context.site,
	items: await pagesGlobToRssItems(
		import.meta.glob('../data/blog/*.{md,mdx}')
	),
	customData: `<language>en-us</language>`,
});
