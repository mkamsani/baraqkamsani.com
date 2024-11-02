import { defineConfig } from 'astro/config';
import { homepage as site } from './package.json';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site,
  adapter: netlify({
  }),
});
