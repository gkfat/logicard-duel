import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import pinia from './plugins/pinia';
import i18n from './plugins/i18n';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'vue3-carousel/dist/carousel.css';
import '@/assets/main.scss';

const app = createApp(App);

app
	.use(pinia)
	.use(i18n)
	.use(router);

app.mount('#app');
