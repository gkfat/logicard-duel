import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import 'vue3-carousel/dist/carousel.css';
import '@/assets/main.scss';

createApp(App)
	.use(store)
	.use(router)
	.mount('#app');
