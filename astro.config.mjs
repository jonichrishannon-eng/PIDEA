// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://jonichrishannon-eng.github.io',
  base: '/PIDEA',

  vite: {
      plugins: [tailwindcss()],
      server: {
          watch: {
              usePolling: true,
              interval: 100,
          },
      },
  },

  integrations: [react(), mdx()],
});