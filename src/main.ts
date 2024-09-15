import { createApp } from 'vue';

import { registerPlugins } from '@/plugins';

import App from './App.vue';
import { boot } from './boot/boot';

const app = createApp(App);

registerPlugins(app);

await boot();

app.mount('#app');
