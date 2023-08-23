import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Resolver
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // plugins
  plugins: [
    vue(),
  ],
  test: {
    // https://vitest.dev/guide/#configuring-vitest
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
  },
});