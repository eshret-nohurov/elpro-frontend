import { defineStore } from 'pinia';
import useApi from '~/composables/useApi';

const { get } = useApi();

export const useNavStore = defineStore('nav', {
	state: () => ({
		items: [],
		loading: false,
	}),
	actions: {
		async fetchNav() {
			if (this.items.length > 0) return;

			this.loading = true;
			try {
				const data = await get('/navigation');
				this.items = data;
			} catch (error) {
				console.error('Error fetching navigation:', error);
			} finally {
				this.loading = false;
			}
		},
	},
});
