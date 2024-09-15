import type { App } from 'vue';

import router from '@/router';

import { i18n } from './i18n';
import { pinia } from './pinia';
import { vuetify } from './vuetify';

export const registerPlugins = (app: App) => {
    app
        .use(i18n)
        .use(vuetify)
        .use(pinia)
        .use(router);
};
