/* eslint-disable import/no-extraneous-dependencies */
import { createI18n } from 'vue-i18n';

import zh from '../locales/zh-TW.json';

export const i18n = createI18n({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'zh-TW',
    globalInjection: true,
    messages: {
        'zh-TW': zh,
    },
});
