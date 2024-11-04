import { defineConfig } from 'astro/config';
import { homepage as site } from './package.json';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site,
  adapter: netlify({
  }),
  integrations: [
		sitemap(),
		mdx(),
	],
	prefetch: {
		defaultStrategy: 'viewport',
		prefetchAll: true,
	},
	devToolbar: {
		enabled: false,
	},
});
