import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls },
        }), vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/index.scss',
            },
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
        ],
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://script.google.com/macros/s/AKfycbxxYhVKAzrI7aYZ4PSC7_8q9QeXSkmmicVXRaJV5JjCz43C8DhjlMsL5c2kCaLNSjCguw/exec',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
