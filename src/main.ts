import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue3-carousel/dist/carousel.css';
import '@/assets/main.scss';

import { createApp } from 'vue';

import App from './App.vue';
import { i18n } from './plugins/i18n';
import { pinia } from './plugins/pinia';
import router from './router';

const app = createApp(App);

app
    .use(pinia)
    .use(i18n)
    .use(router);

app.mount('#app');
