<template>
	<div class="flex flex-col gap-20">
		<section class="bg-neutral-900 text-white">
			<div class="container mx-auto px-4 py-16 sm:py-20 lg:py-28">
				<div class="max-w-3xl">
					<p class="text-xs font-semibold tracking-[0.35em] text-sky-400 uppercase">
						{{ t('store.hero.badge') }}
					</p>
					<h1 class="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
						{{ t('store.hero.title') }}
					</h1>
					<div class="mt-6 space-y-5 text-lg text-white/80 leading-relaxed">
						<p v-for="(paragraph, index) in heroParagraphs" :key="index">
							{{ paragraph }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="container mx-auto px-4">
			<div class="max-w-4xl">
				<h2 class="text-3xl sm:text-4xl font-semibold text-neutral-900">
					{{ t('store.values.title') }}
				</h2>
				<p class="mt-4 text-neutral-600 leading-relaxed">
					{{ t('store.values.intro') }}
				</p>
				<div class="mt-10 grid gap-6 sm:grid-cols-2">
					<div
						class="rounded-3xl border border-neutral-200 p-7"
						v-for="(item, index) in valueItems"
						:key="index"
					>
						<h3 class="text-xl font-semibold text-neutral-900">
							{{ item }}
						</h3>
					</div>
				</div>
			</div>
		</section>

		<section class="bg-neutral-50">
			<div class="container mx-auto px-4 py-16 sm:py-20 lg:py-24">
				<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
					<div class="space-y-6 text-neutral-600 leading-relaxed">
						<p v-for="(paragraph, index) in servicesParagraphs" :key="index">
							{{ paragraph }}
						</p>
					</div>
					<div class="rounded-3xl bg-white p-10 shadow-sm">
						<h3 class="text-2xl font-semibold text-neutral-900">
							{{ t('store.services.card.title') }}
						</h3>
						<p class="mt-4 text-neutral-600 leading-relaxed">
							{{ t('store.services.card.description') }}
						</p>
						<div class="mt-8">
							<NuxtLink
								:to="$localePath('/contact-us')"
								class="inline-flex items-center gap-3 text-sky-600 font-semibold"
							>
								{{ t('store.services.card.cta') }}
								<span aria-hidden="true" class="text-xl">→</span>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const { t } = useI18n();

const heroParagraphKeys = [
	'store.hero.paragraph1',
	'store.hero.paragraph2',
	'store.hero.paragraph3',
];

const valueItemKeys = [
	'store.values.item1',
	'store.values.item2',
	'store.values.item3',
	'store.values.item4',
];

const servicesParagraphKeys = [
	'store.services.paragraph1',
	'store.services.paragraph2',
];

const heroParagraphs = computed(() => heroParagraphKeys.map(key => t(key)));
const valueItems = computed(() => valueItemKeys.map(key => t(key)));
const servicesParagraphs = computed(() => servicesParagraphKeys.map(key => t(key)));
</script>
