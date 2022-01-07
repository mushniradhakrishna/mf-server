import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languageEN from '../locales/en/translation.json';
import languageDE from '../locales/de/translation.json';

i18n
	// i18next-http-backend
	// loads translations from your server
	// https://github.com/i18next/i18next-http-backend
	.use(Backend)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: false,
		resources: {
			en: {
				translation: languageEN,
			},
			de: {
				translation: languageDE,
			},
		},
		/* default language when load the website in browser */
		lng: 'en',
		/* When react i18next not finding any language to as default in borwser */
		fallbackLng: 'en',
		keySeparator: '.',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
