<script setup>
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import ProductCard from '@/components/layout/ProductCard.vue';

import { useCartStore } from '@/stores/cart';
const cart = useCartStore();

const containerRef = ref(null);
const isOpen = ref(false);
const imgRef = ref();
const fullImg = ref('');
const activeTab = ref(0);
const slides = ref([
	{
		img: 'https://sumbar-computer.com/storage/ip/tITVOIVFZjgZCiYnD3hA.jpg',
	},
	{
		img: 'https://sumbar-computer.com/storage/ip/IEXMGs9Vq5UyA6LwudrF.jpg',
	},

	{
		img: 'https://sumbar-computer.com/storage/ip/GyDcG5prYZ83PgJhTA4i.jpg',
	},

	{
		img: 'https://sumbar-computer.com/storage/ip/5IxPdETODptZebAdlaHp.jpg',
	},
]);

const products = [
	{
		id: 1,
		name: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
		price: '$10',
	},
	{ id: 2, name: 'Product A2', price: '$12' },
	{ id: 3, name: 'Product A3', price: '$15' },
	{ id: 4, name: 'Product A4', price: '$20' },
];

function toggle(imgUrl) {
	isOpen.value = !isOpen.value;
	document.body.style.overflow = isOpen.value ? 'hidden' : '';
	fullImg.value = imgUrl || '';
}

const addToCart = product => {
	cart.addToCart(product);
};

useSwiper(containerRef, {
	loop: true,
	autoplay: {
		delay: 4000,
	},
	creativeEffect: {
		prev: {
			shadow: true,
			translate: [0, 0, -400],
		},
		next: {
			shadow: true,
			translate: [0, 0, -400],
		},
	},
});
</script>

<template>
	<div class="container mx-auto py-6 px-4">
		<!-- Breadcrumb -->
		<Breadcrumb />

		<!-- PRODUCT DETAIL -->
		<div class="pb-8 mb-10">
			<div class="mx-auto max-w-screen-xl px-4 md:px-8">
				<div class="grid gap-8 md:grid-cols-2">
					<!-- images - start -->
					<div class="grid gap-4 lg:grid-cols-5">
						<!-- mini images -->
						<div class="order-last flex gap-4 lg:order-none lg:flex-col">
							<div
								v-for="(slide, idx) in slides"
								:key="idx"
								class="overflow-hidden border border-gray-300"
							>
								<NuxtImg
									:src="slide.img"
									class="w-full h-full object-cover object-center cursor-zoom-in"
									loading="lazy"
									placeholder
									@click="toggle(slide.img)"
								/>
							</div>
						</div>

						<!-- main image -->
						<swiper-container
							ref="containerRef"
							:init="false"
							class="aspect-[1/1] overflow-hidden lg:col-span-4"
						>
							<swiper-slide
								v-for="(slide, idx) in slides"
								:key="idx"
								class="border border-gray-300"
							>
								<NuxtImg
									ref="imgRef"
									:src="slide.img"
									class="w-full h-full object-cover object-center cursor-pointer"
									loading="lazy"
									placeholder
									@click="toggle(slide.img)"
								/>
							</swiper-slide>
						</swiper-container>
					</div>
					<!-- images - end -->

					<!-- content - start -->
					<div class="md:py-5 flex flex-col">
						<!-- name - start -->
						<div class="mb-2 md:mb-6">
							<h2 class="text-2xl font-bold text-black lg:text-3xl">
								Pullover with pattern
							</h2>
						</div>
						<!-- name - end -->

						<!-- short description - start -->
						<div class="mb-2 md:mb-5">
							<span
								class="mb-2 inline-block text-sm font-semibold text-black md:text-base"
							>
								{{ $t('product.shortDesc') }}
							</span>

							<span
								class="inline-block text-sm font-semibold text-gray-500 md:text-base"
							>
								Игровой ноутбук ACER NITRO 5 AN515-45-R56R (Процессор AMD Ryzen7
								5800H / Оперативная память 8GB (DDR4) / SSD 512GB / Диагональ
								экрана 15.6" дюйма FHD 144Hz IPS / Видеокарта NVIDIA RTX 3050
								4GB / Дисковод отсутствует / Язык Английский и Русский / Черный
								цвет) (NH.QBAEM.002)
							</span>
						</div>
						<!-- short description - end -->

						<!-- buttons - start -->
						<div class="flex gap-8 items-center">
							<div>
								<span class="text-xl font-bold text-gray-800 md:text-2xl">
									15 тмт
								</span>
							</div>

							<div
								v-if="!cart.isInCart(products[0].id)"
								class="rounded-lg bg-gray-900 px-8 py-3 text-center text-base font-semibold text-white transition duration-300 hover:bg-sky-700 cursor-pointer"
								@click.stop="addToCart(products[0])"
							>
								{{ $t('product.addToCart') }}
							</div>

							<NuxtLink
								v-else
								:to="$localePath('/cart')"
								class="mt-auto inline-block text-gray-900 px-10 py-4 rounded-lg hover:bg-sky-700 hover:text-white border duration-300 transition cursor-pointer uppercase text-xs font-bold relative z-12"
							>
								{{ $t('product.goToCart') }}
							</NuxtLink>
						</div>
						<!-- buttons - end -->
					</div>
					<!-- content - end -->
				</div>
			</div>
		</div>

		<!-- Full description -->
		<div class="mb-18">
			<!-- TABS -->
			<div class="flex justify-center space-x-6 mb-8">
				<button
					:class="[
						'pb-1 px-1 text-xl font-bold border-b-2 uppercase',
						'transition-colors transition-border duration-300 ease-in-out cursor-pointer ',
						activeTab === 0
							? 'text-black border-black'
							: 'text-gray-400 border-transparent',
					]"
					@click="activeTab = 0"
				>
					{{ $t('product.tab1') }}
				</button>

				<button
					:class="[
						'pb-1 px-1 text-xl font-bold border-b-2 uppercase',
						'transition-colors transition-border duration-300 ease-in-out cursor-pointer ',
						activeTab === 1
							? 'text-black border-black'
							: 'text-gray-400 border-transparent',
					]"
					@click="activeTab = 1"
				>
					{{ $t('product.tab2') }}
				</button>
			</div>

			<!-- CONTENT -->
			<Transition name="fade-slide" mode="out-in">
				<div v-if="activeTab === 0" key="details" class="mb-8">
					<div class="flow-root">
						<dl
							class="-my-3 divide-y divide-gray-200 text-sm *:even:bg-gray-50"
						>
							<div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
								<dt class="font-medium text-gray-900">Screen diagonal</dt>

								<dd class="text-gray-700 sm:col-span-2">6.7"</dd>
							</div>

							<div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
								<dt class="font-medium text-gray-900">The screen resolution</dt>

								<dd class="text-gray-700 sm:col-span-2">2796x1290</dd>
							</div>

							<div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
								<dt class="font-medium text-gray-900">
									The screen refresh rate
								</dt>

								<dd class="text-gray-700 sm:col-span-2">120 Hz</dd>
							</div>

							<div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
								<dt class="font-medium text-gray-900">The pixel density</dt>

								<dd class="text-gray-700 sm:col-span-2">460 ppi</dd>
							</div>

							<div class="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
								<dt class="font-medium text-gray-900">Additionally</dt>

								<dd class="text-gray-700 sm:col-span-2">
									Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
									facilis debitis explicabo doloremque impedit nesciunt dolorem
									facere, dolor quasi veritatis quia fugit aperiam aspernatur
									neque molestiae labore aliquam soluta architecto?
								</dd>
							</div>
						</dl>
					</div>
				</div>

				<!-- DESCRIPTION -->
				<div v-else key="description" class="mb-8">
					<p class="text-gray-700">
						Полное описание товара будет добавлено позже. Спасибо за понимание!
					</p>
				</div>
			</Transition>
		</div>

		<!-- Related Products -->
		<div class="flex flex-col items-center space-x-6 mb-8">
			<h3
				class="pb-1 px-1 text-xl font-bold text-black uppercase border-b-2 mb-8"
			>
				{{ $t('product.recProduct') }}
			</h3>

			<!-- PRODUCTS -->
			<div class="flex flex-wrap -m-2">
				<ProductCard
					v-for="product in products"
					:key="product.id"
					:product="product"
				/>
			</div>
		</div>

		<!-- Модальное окно -->
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="fixed inset-0 z-100 bg-black/90 backdrop-blur flex items-center justify-center p-4"
			>
				<div
					class="absolute w-full h-full z-80 cursor-pointer"
					@click.stop="toggle"
				></div>

				<div class="relative max-w-[95vw] max-h-[95vh] z-90">
					<NuxtImg
						:src="`${fullImg}`"
						class="h-[80vh] object-contain"
						loading="eager"
					/>
					<button
						class="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 cursor-pointer"
						@click.stop="toggle"
					>
						✕
					</button>
				</div>
			</div>
		</Transition>
		<!--  -->
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* Анимация появления/исчезновения */
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition: all 0.3s ease;
}

.fade-slide-enter-from {
	opacity: 0;
	/* transform: translateY(5px); */
}

.fade-slide-leave-to {
	opacity: 0;
	/* transform: translateY(-5px); */
}

/* Опционально: плавное изменение высоты */
.fade-slide-move {
	transition: all 0.3s ease;
}
</style>
