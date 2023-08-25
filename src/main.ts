import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'vue3-carousel/dist/carousel.css';
import '@/assets/main.scss';

const pinia = createPinia();

const app = createApp(App);

app
	.use(pinia)
	.use(router);

app.mount('#app');
