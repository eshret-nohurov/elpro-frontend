<script setup>
import { useCartStore } from '@/stores/cart';
import { useNavStore } from '~/stores/nav';
const { locale, locales, setLocale } = useI18n();

const navStore = useNavStore();
const cart = useCartStore();

// const url = ref('Dinamica');
</script>

<template>
	<header class="w-full fixed bg-white z-100">
		<!-- Top Navbar -->
		<div
			class="flex items-center justify-between container mx-auto px-4 h-[90px]"
		>
			<!-- LOGO -->
			<NuxtLink :to="$localePath('/')" class="w-25">
				<img src="/public/img/logo/logo-black.png" alt="elpro" />
			</NuxtLink>

			<!-- SEARCH -->
			<div class="hidden md:flex flex-1 mx-5">
				<input
					type="text"
					:placeholder="$t('header.search')"
					class="w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none"
				/>
			</div>

			<!-- NAV -->
			<nav class="hidden md:flex items-center gap-6 text-sm">
				<NuxtLink
					:to="$localePath('/')"
					class="text-gray-500 hover:text-black"
					active-class="font-semibold !text-black"
				>
					{{ $t('header.home') }}
				</NuxtLink>

				<NuxtLink
					:to="$localePath('/about-us')"
					class="text-gray-500 hover:text-black"
					active-class="font-semibold text-black"
				>
					{{ $t('header.about') }}
				</NuxtLink>

				<NuxtLink
					:to="$localePath('/contact-us')"
					class="text-gray-500 hover:text-black"
					active-class="font-semibold text-black"
				>
					{{ $t('header.contact') }}
				</NuxtLink>

				<!-- LANG -->
				<div class="group relative inline-block">
					<div
						class="px-4 py-2 bg-sky-500 text-white rounded-lg cursor-pointer transition-all uppercase"
					>
						{{ locale }}
					</div>

					<div
						class="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-20 mt-1 p-4 bg-sky-500 rounded-xl shadow-xl"
					>
						<button
							v-for="(localeCode, index) in locales"
							:key="index"
							class="font-bold text-white uppercase py-2 cursor-pointer"
							@click="setLocale(localeCode.code)"
						>
							{{ localeCode.code }}
						</button>
					</div>
				</div>

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
			</nav>
		</div>

		<!-- Category Bar -->
		<div class="hidden md:block bg-neutral-800">
			<div
				class="flex items-center justify-center gap-15 text-white text-base container mx-auto px-4 h-[50px]"
			>
				<div
					v-for="(cat, idx) in navStore.items.nav"
					:key="cat.id"
					class="flex items-center justify-center gap-15"
				>
					<NuxtLink
						v-if="cat.subcategories.length === 0"
						:to="$localePath(`/category/${cat.url}`)"
					>
						{{ cat.name[locale] }}
					</NuxtLink>

					<div v-else class="group relative inline-flex justify-center">
						<div class="cursor-pointer transition-all">
							{{ cat.name[locale] }}
						</div>

						<div
							class="absolute top-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-20 mt-1 p-4 bg-sky-500 rounded-xl shadow-xl w-50"
						>
							<NuxtLink
								v-for="subCat in cat.subcategories"
								:key="subCat.id"
								:to="$localePath(`/subcategory/${subCat.url}`)"
								class="font-bold py-2 cursor-pointer block"
							>
								{{ subCat.name[locale] }}
							</NuxtLink>
						</div>
					</div>

					<div v-if="idx != navStore.items.nav.length - 1">|</div>
				</div>
			</div>
		</div>
	</header>
</template>
