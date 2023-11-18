import {
    fileURLToPath,
    URL,
} from 'node:url';

// Utilities
import { defineConfig } from 'vite';

// Plugins
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
        ],
    },
    server: {
        port: 3000,
    },
});
