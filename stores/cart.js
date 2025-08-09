import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
	state: () => ({
		cartItems: [],
	}),

	actions: {
		addToCart(product) {
			const existingItem = this.cartItems.find(
				item => item._id === product._id
			);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				this.cartItems.push({
					...product,
					quantity: 1,
				});
			}
		},

		removeItem(productId) {
			this.cartItems = this.cartItems.filter(item => item._id !== productId);
		},

		increaseQuantity(productId) {
			const item = this.cartItems.find(item => item._id === productId);
			if (item && item.stock > item.quantity) {
				item.quantity += 1;
			}
		},

		decreaseQuantity(productId) {
			const item = this.cartItems.find(item => item._id === productId);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},

		isInCart(productId) {
			return this.cartItems.some(item => item._id === productId);
		},

		clearCart() {
			this.cartItems = [];
		},
	},

	getters: {
		totalItems: state =>
			state.cartItems.reduce((total, item) => total + item.quantity, 0),

		sumTotal: state =>
			state.cartItems.reduce(
				(total, item) => total + item.price * item.quantity,
				0
			),
	},

	persist: true,
});
