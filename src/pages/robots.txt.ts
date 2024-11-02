export const prerender = true;
import type { APIContext, APIRoute } from 'astro';

const getRobotsTXT = (sitemapURL: URL) => `
User-agent: ia_archiver
Disallow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }: APIContext) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTXT(sitemapURL));
};
