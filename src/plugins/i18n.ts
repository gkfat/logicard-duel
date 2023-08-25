/* eslint-disable import/no-extraneous-dependencies */
import { createI18n } from 'vue-i18n';
import zh from '../locales/zh-TW.json';

const i18n = createI18n({
	legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
	locale: 'zh-TW',
	fallbackLocale: 'zh-TW',
	globalInjection: true,
	messages: {
		'zh-TW': zh,
	},
});

export default i18n;
