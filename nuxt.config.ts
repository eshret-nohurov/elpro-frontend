import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		public: {
			apiURL: process.env.NUXT_PUBLIC_API_URL,
		},
	},

	devServer: {
		port: Number(process.env.NUXT_PORT) || 3000,
		host: '0.0.0.0',
	},

	vite: {
		plugins: [tailwindcss()],
	},

	/* fonts: {
		providers: {
			fontshare: false,
			fontsource: false,
		},
		families: [
			{ name: 'Inter', provider: 'google' },
			{ name: 'Roboto', provider: 'google' },
		],
		defaults: {
			weights: [400, 500, 700],
		},
	}, */

	i18n: {
		locales: [
			{ code: 'ru', name: 'Русский', file: 'ru.json' },
			{ code: 'tm', name: 'Türkmençe', file: 'tm.json' },
			{ code: 'en', name: 'English', file: 'en.json' },
		],
		strategy: 'prefix',
		defaultLocale: 'ru',
	},

	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/scripts',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'nuxt-swiper',
		'@nuxtjs/i18n',
		'nuxt-toast',
	],
});
