import { defineConfig } from 'astro/config';
import { homepage as site } from './package.json';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site,
  adapter: netlify({
  }),
  integrations: [
		sitemap()
	],
});
