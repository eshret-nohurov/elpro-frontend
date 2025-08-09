<script setup>
import ProductCard from '@/components/layout/ProductCard.vue';
import { ref } from 'vue';
const { locale } = useI18n();

defineProps({
	productsSection: {
		type: Array,
		default: () => [],
	},
});

const activeIndex = ref(0);
</script>

<template>
	<div class="container mx-auto py-14 px-4">
		<!-- TABS -->
		<div class="flex space-x-6 mb-8">
			<button
				v-for="(tab, index) in productsSection"
				:key="index"
				:class="[
					'pb-1 px-1 text-base font-medium border-b-2',
					'transition-colors transition-border duration-300 ease-in-out cursor-pointer ',
					activeIndex === index
						? 'text-black border-black'
						: 'text-gray-400 border-transparent',
				]"
				@click="activeIndex = index"
			>
				{{ tab.name[locale] }}
			</button>
		</div>

		<!-- PRODUCTS -->
		<Transition name="fade" mode="out-in">
			<div :key="activeIndex" class="flex flex-wrap -m-2">
				<ProductCard
					v-for="product in productsSection[activeIndex].products"
					:key="product._id"
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
