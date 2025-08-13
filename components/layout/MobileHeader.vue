<script setup>
import { useCartStore } from '@/stores/cart';
import { useNavStore } from '~/stores/nav';
const { locale, locales, setLocale } = useI18n();
const containerRef = ref(null);

const navStore = useNavStore();
const cart = useCartStore();
const isMenuOpen = ref(false);

useSwiper(containerRef, {
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		0: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 4,
		},
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
	<header class="w-full fixed bg-white z-100">
		<!-- Top Navbar -->
		<div
			class="flex items-center justify-between container mx-auto px-4 h-[70px] border-b"
		>
			<!-- LOGO -->
			<NuxtLink :to="$localePath('/')" class="w-25">
				<img src="/public/img/logo/logo-black.png" alt="elpro" />
			</NuxtLink>

			<div class="flex items-center gap-4">
				<!-- CART -->
				<NuxtLink :to="$localePath('/cart')" class="relative">
					<img src="/public/img/ico/Cart.svg" alt="" />
					<span
						v-if="cart.totalItems > 0"
						class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
					>
						{{ cart.totalItems }}
					</span>
				</NuxtLink>

				<!-- BURGER -->
				<button
					class="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75"
					@click="isMenuOpen = !isMenuOpen"
				>
					<span class="sr-only">Toggle menu</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Навигационное меню -->
		<div
			class="fixed inset-0 z-101 overflow-hidden"
			:class="{ 'pointer-events-none': !isMenuOpen }"
		>
			<!-- Затемнение фона -->
			<div
				class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
				:class="isMenuOpen ? 'opacity-80' : 'opacity-0'"
				@click="isMenuOpen = false"
			></div>

			<!-- Контент меню -->
			<nav
				class="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-neutral-900 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col items-center p-5 overflow-auto"
				:class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
			>
				<div class="flex items-center justify-between w-full p-3">
					<!-- LOGO -->
					<img src="/public/img/logo/logo-white.png" alt="elpro" class="w-40" />

					<!-- CLOSE BUTTON -->
					<button
						class="block rounded-sm bg-neutral-700 p-2 text-white transition"
						@click="isMenuOpen = false"
					>
						<span class="sr-only">Close menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<!-- LANG -->
				<div class="flex mt-6 space-x-5">
					<button
						v-for="(localeCode, index) in locales"
						:key="index"
						class="font-bold text-white uppercase p-1.5 rounded-sm cursor-pointer text-lg"
						:class="{ 'bg-sky-500': locale === localeCode.code }"
						@click="setLocale(localeCode.code)"
					>
						{{ localeCode.code }}
					</button>
				</div>

				<!-- MENU -->
				<div
					class="flex flex-col items-center mt-7 space-y-8 text-white text-base w-full"
				>
					<!-- <NuxtLink
						:to="$localePath('/')"
						active-class="font-semibold text-sky-500"
						@click="isMenuOpen = false"
					>
						{{ $t('header.home') }}
					</NuxtLink>

					<NuxtLink
						:to="$localePath('/about-us')"
						active-class="font-semibold text-sky-500"
						@click="isMenuOpen = false"
					>
						{{ $t('header.about') }}
					</NuxtLink>

					<NuxtLink
						:to="$localePath('/contact-us')"
						active-class="font-semibold text-sky-500"
						@click="isMenuOpen = false"
					>
						{{ $t('header.contact') }}
					</NuxtLink> -->
					<ul class="space-y-1 w-full">
						<li v-for="cat in navStore.items.nav" :key="cat._id">
							<NuxtLink
								v-if="cat.subcategories.length === 0"
								:to="$localePath(`/category/${cat.url}`)"
								class="block rounded-lg px-4 py-4"
								active-class="bg-gray-800"
								@click="isMenuOpen = false"
							>
								{{ cat.name[locale] }}
							</NuxtLink>

							<details
								v-else
								class="group [&_summary::-webkit-details-marker]:hidden"
							>
								<summary
									class="group flex items-center justify-between rounded-lg px-4 py-4"
								>
									<div class="flex items-center gap-2">
										{{ cat.name[locale] }}
									</div>

									<span
										class="shrink-0 transition duration-300 group-open:-rotate-180"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								</summary>

								<ul class="rounded-lg mt-2 space-y-1 bg-neutral-800">
									<li v-for="subCat in cat.subcategories" :key="subCat.id">
										<NuxtLink
											:to="$localePath(`/subcategory/${subCat.url}`)"
											class="block rounded-lg px-8 py-4 text-base"
											active-class="bg-gray-800"
											@click="isMenuOpen = false"
										>
											{{ subCat.name[locale] }}
										</NuxtLink>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</header>
</template>

<style>
/* Плавная анимация для затемнения */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* Отключение скролла при открытом меню */
body.menu-open {
	overflow: hidden;
}
</style>
