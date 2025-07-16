<script setup>
import ProductCard from '@/components/layout/ProductCard.vue';
import { ref } from 'vue';

const activeIndex = ref(0);

// Вкладки и продукты
const tabs = [
	{
		name: 'New Arrival',
		products: [
			{
				id: 1,
				name: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
				price: '10',
			},
			{ id: 2, name: 'Product A2', price: '12' },
			{ id: 3, name: 'Product A3', price: '15' },
			{ id: 4, name: 'Product A4', price: '20' },
			{ id: 5, name: 'Product A5', price: '8' },
			{ id: 6, name: 'Product A6', price: '18' },
			{ id: 7, name: 'Product A7', price: '25' },
			{ id: 8, name: 'Product A8', price: '30' },
		],
	},
	{
		name: 'Bestseller',
		products: [
			{ id: 1, name: 'Product B1', price: '11' },
			{ id: 2, name: 'Product B2', price: '13' },
			{ id: 3, name: 'Product B3', price: '16' },
			{ id: 4, name: 'Product B4', price: '21' },
			{ id: 5, name: 'Product B5', price: '9' },
			{ id: 6, name: 'Product B6', price: '19' },
			{ id: 7, name: 'Product B7', price: '26' },
			{ id: 8, name: 'Product B8', price: '31' },
		],
	},
	{
		name: 'Featured Products',
		products: [
			{ id: 1, name: 'Product C1', price: '14' },
			{ id: 2, name: 'Product C2', price: '17' },
			{ id: 3, name: 'Product C3', price: '22' },
			{ id: 4, name: 'Product C4', price: '27' },
			{ id: 5, name: 'Product C5', price: '32' },
			{ id: 6, name: 'Product C6', price: '37' },
			{ id: 7, name: 'Product C7', price: '42' },
			{ id: 8, name: 'Product C8', price: '47' },
		],
	},
];
</script>

<template>
	<div class="container mx-auto py-14 px-4">
		<!-- TABS -->
		<div class="flex space-x-6 mb-8">
			<button
				v-for="(tab, index) in tabs"
				:key="tab"
				:class="[
					'pb-1 px-1 text-base font-medium border-b-2',
					'transition-colors transition-border duration-300 ease-in-out cursor-pointer ',
					activeIndex === index
						? 'text-black border-black'
						: 'text-gray-400 border-transparent',
				]"
				@click="activeIndex = index"
			>
				{{ tab.name }}
			</button>
		</div>

		<!-- PRODUCTS -->
		<Transition name="fade" mode="out-in">
			<div :key="activeIndex" class="flex flex-wrap -m-2">
				<ProductCard
					v-for="product in tabs[activeIndex].products"
					:key="product.id"
					:product="product"
				/>
			</div>
		</Transition>
	</div>
</template>

<style>
/* Анимация всей секции */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.005s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
