import {
    fileURLToPath,
    URL,
} from 'node:url';

import { defineConfig } from 'vite';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        vue({ template: { transformAssetUrls } }), vuetify({
            autoImport: true,
            styles: { configFile: 'src/assets/styles/index.scss' },
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
});
