// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	devtools: { enabled: true },

	nitro: {
		compatibilityDate: '2025-06-01',
	},

	css: ['~/assets/css/main.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	fonts: {
		families: [
			{ name: 'Inter', provider: 'google' },
			{ name: 'Roboto', provider: 'google' },
		],
		defaults: {
			weights: [400, 500, 700],
		},
	},

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
	],
});
