<script setup>
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();

defineProps({
	product: {
		type: Object,
		required: true,
	},
});

const addToCart = product => {
	cart.addToCart(product);
};
</script>

<template>
	<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3">
		<div
			class="relative bg-gray-100 rounded-lg shadow-sm p-4 text-center flex flex-col h-full transform transition duration-300 hover:scale-[1.01] hover:shadow-md py-8 px-6"
		>
			<!-- Ссылка ограничена границами этой обертки -->
			<NuxtLink
				:to="$localePath(`/Dinamica/${product.id}`)"
				class="absolute inset-0 z-11"
			></NuxtLink>

			<!-- Контент -->
			<div class="relative z-10">
				<!-- IMAGE -->
				<div class="w-full aspect-[1/1] mb-4 rounded-lg overflow-hidden">
					<NuxtImg
						src="img/ChatGPT.png"
						:alt="product.name"
						class="w-full h-full object-cover object-center"
						loading="lazy"
						placeholder
					/>
				</div>

				<!-- PRODUCT NAME -->
				<h3
					class="text-base font-medium mb-2 leading-snug line-clamp-2 h-[3rem]"
				>
					{{ product.name }}
				</h3>

				<!-- PRICE -->
				<p class="text-xl font-bold mb-4">{{ product.price }} тмт</p>
			</div>

			<!-- Кнопка -->
			<button
				v-if="!cart.isInCart(product.id)"
				class="mt-auto inline-block bg-black text-white px-10 py-4 rounded-lg hover:bg-sky-700 duration-300 transition cursor-pointer uppercase text-xs font-bold relative z-12"
				@click.stop="addToCart(product)"
			>
				{{ $t('product.addToCart') }}
			</button>

			<NuxtLink
				v-else
				:to="$localePath('/cart')"
				class="mt-auto inline-block text-sky-500 px-10 py-4 rounded-lg hover:bg-sky-700 hover:text-white border duration-300 transition cursor-pointer uppercase text-xs font-bold relative z-12"
			>
				{{ $t('product.goToCart') }}
			</NuxtLink>
		</div>
	</div>
</template>
