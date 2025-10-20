<script setup>
import { useCartStore } from '@/stores/cart';
import {
	computed,
	nextTick,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from 'vue';
import { useNavStore } from '~/stores/nav';

const { locale, locales, setLocale } = useI18n();

const navStore = useNavStore();
const cart = useCartStore();

// Какая категория ховерится
const hoveredId = ref(null);
const open = computed(() => hoveredId.value !== null);
const hoveredChildren = computed(() => {
	const list = navStore.items.nav || [];
	return list.find(c => c._id === hoveredId.value)?.children ?? [];
});

// Управление ховером (с небольшой задержкой закрытия)
let hideTimer = null;
const onEnter = id => {
	if (hideTimer) {
		clearTimeout(hideTimer);
		hideTimer = null;
	}
	hoveredId.value = id;
};
const onLeave = () => {
	hideTimer = setTimeout(() => {
		hoveredId.value = null;
	}, 120);
};
onBeforeUnmount(() => hideTimer && clearTimeout(hideTimer));

// Измерение и анимация высоты панели
const panelRef = ref(null);
const innerRef = ref(null);
const panelHeight = ref('0px');
let ro;

const recalcHeight = () => {
	if (!innerRef.value) return;
	// Высота = половина контента
	// const h = Math.ceil(innerRef.value.scrollHeight / 2);
	// Если нужна полная высота контента — используйте:
	const h = innerRef.value.scrollHeight;
	panelHeight.value = open.value ? `${h}px` : '0px';
};

watch(open, async () => {
	await nextTick();
	recalcHeight();
});

onMounted(() => {
	window.addEventListener('resize', recalcHeight);
	ro = new ResizeObserver(recalcHeight);
	if (innerRef.value) ro.observe(innerRef.value);
	recalcHeight();
});
onBeforeUnmount(() => {
	window.removeEventListener('resize', recalcHeight);
	ro?.disconnect();
});
</script>

<template>
	<header class="w-full fixed bg-white z-[100]">
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
		<div class="hidden md:block bg-neutral-800 relative" @mouseleave="onLeave">
			<!-- Ряд категорий -->
			<div
				class="flex items-center justify-center gap-15 text-white text-base container mx-auto px-4 h-[50px]"
			>
				<div
					v-for="(cat, idx) in navStore.items.nav"
					:key="cat.id"
					class="flex items-center justify-center gap-15"
				>
					<!-- Без подкатегорий -->
					<NuxtLink
						v-if="!cat.children || cat.children.length === 0"
						:to="$localePath(`/category/${cat.url}`)"
						class="px-2 py-2 hover:text-sky-300 transition-colors"
						@mouseenter="onEnter(null)"
						@focusin="onEnter(null)"
					>
						{{ cat.name[locale] }}
					</NuxtLink>

					<!-- С подкатегориями: при наведении открываем нижнюю панель -->
					<NuxtLink
						v-else
						:to="$localePath(`/category/${cat.url}`)"
						class="px-2 py-2 hover:text-sky-300 transition-colors"
						:aria-expanded="open && hoveredId === cat._id ? 'true' : 'false'"
						@mouseenter="onEnter(cat._id)"
						@focusin="onEnter(cat._id)"
					>
						{{ cat.name[locale] }}
					</NuxtLink>

					<div v-if="idx != navStore.items.nav.length - 1">|</div>
				</div>
			</div>

			<!-- Расширяемая панель подкатегорий (высота = 1/2 контента) -->
			<div
				ref="panelRef"
				class="overflow-hidden bg-neutral-800 border-t border-neutral-700"
				:style="{
					height: panelHeight,
					opacity: open ? '1' : '0',
					transition:
						'height 300ms ease, opacity 150ms ease, padding 200ms ease',
					willChange: 'height, opacity',
				}"
			>
				<div ref="innerRef" class="container mx-auto px-4 py-8">
					<div v-if="hoveredChildren.length" class="flex row gap-20">
						<div v-for="subCat in hoveredChildren" :key="subCat.id">
							<div v-if="subCat.children && subCat.children != 0">
								<span class="text-gray-400 text-xs">
									{{ subCat.name[locale] }}
								</span>

								<NuxtLink
									v-for="und_subCat in subCat.children"
									:key="und_subCat.id"
									:to="$localePath(`/category/${und_subCat.url}`)"
									class="block text-white/90 py-2 text-xl hover:text-sky-300 transition-colors"
								>
									{{ und_subCat.name[locale] }}
								</NuxtLink>
							</div>

							<div v-else>
								<NuxtLink
									:to="$localePath(`/category/${subCat.url}`)"
									class="block text-white/90 py-2 text-xl hover:text-sky-300 transition-colors"
								>
									{{ subCat.name[locale] }}
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
