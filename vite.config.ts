/// <reference types="vitest" />
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// https://github.com/antfu/unplugin-vue-components
		Components(),
		eslintPlugin({ cache: false }),
	],
	server: {
		host: '127.0.0.1',
	},
	resolve: {
		alias: [
			{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
		],
	},
	// Vitest config
	test: {
		environment: 'jsdom',
	},
});
