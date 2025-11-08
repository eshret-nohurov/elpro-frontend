<template>
	<div class="flex flex-col gap-16 sm:gap-20 lg:gap-24">
		<section class="bg-neutral-900 text-white">
			<div class="container mx-auto px-4 py-16 sm:py-20 lg:py-28">
				<div class="max-w-3xl space-y-5">
					<h1
						class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight"
					>
						{{ t('contact.hero.title') }}
					</h1>
					<p class="text-lg text-white/80 leading-relaxed">
						{{ t('contact.hero.subtitle') }}
					</p>
				</div>
			</div>
		</section>

		<section class="container mx-auto px-4">
			<div class="grid gap-8 lg:grid-cols-3">
				<div class="rounded-3xl border border-neutral-200 p-8">
					<div class="flex items-start gap-4">
						<span
							class="flex h-[48px] w-[48px] items-center justify-center rounded-2xl bg-neutral-900 text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									d="M2.25 5.25a.75.75 0 0 1 .75-.75h2.878a.75.75 0 0 1 .674.421l1.29 2.699a.75.75 0 0 1-.126.843l-1.55 1.77a11.287 11.287 0 0 0 5.086 5.086l1.77-1.55a.75.75 0 0 1 .843-.126l2.7 1.29a.75.75 0 0 1 .42.674V21a.75.75 0 0 1-.75.75H17.5C9.439 21.75 2.25 14.561 2.25 6.5V6"
								/>
							</svg>
						</span>
						<div>
							<h2 class="text-2xl font-semibold text-neutral-900">
								{{ t('contact.phones.title') }}
							</h2>
							<ul class="mt-4 space-y-3 text-neutral-600 text-lg">
								<li v-for="phone in phoneNumbers" :key="phone">
									<a
										:href="`tel:${phone}`"
										class="hover:text-neutral-900 transition-colors"
									>
										{{ phone }}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="rounded-3xl border border-neutral-200 p-8">
					<div class="flex items-start gap-4">
						<span
							class="flex h-[48px] w-[48px] items-center justify-center rounded-2xl bg-neutral-900 text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									fill-rule="evenodd"
									d="M12 2.25a6.75 6.75 0 0 0-6.75 6.75c0 1.688.395 3.426 1.154 4.947.758 1.522 1.82 2.86 3.011 3.992a32.28 32.28 0 0 0 2.167 1.86.75.75 0 0 0 .973 0 32.15 32.15 0 0 0 2.167-1.86c1.19-1.132 2.253-2.47 3.011-3.992.759-1.521 1.155-3.259 1.155-4.947A6.75 6.75 0 0 0 12 2.25Zm0 9.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
						<div>
							<h2 class="text-2xl font-semibold text-neutral-900">
								{{ t('contact.location.title') }}
							</h2>
							<p class="mt-4 text-neutral-600 text-lg leading-relaxed">
								{{ t('contact.location.address') }}
							</p>
						</div>
					</div>
				</div>
				<div class="rounded-3xl border border-neutral-200 p-8">
					<div class="flex items-start gap-4">
						<span
							class="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									fill-rule="evenodd"
									d="M12 2.25a.75.75 0 0 1 .75.75v8.19l4.51 2.605a.75.75 0 1 1-.75 1.3l-5-2.886a.75.75 0 0 1-.36-.646V3a.75.75 0 0 1 .75-.75ZM6.75 3a.75.75 0 0 1 .75.75v16.5h1.5V13.5a.75.75 0 0 1 1.5 0v6.75h7.5V3.75a.75.75 0 0 1 1.5 0V21A1.5 1.5 0 0 1 18 22.5H6A1.5 1.5 0 0 1 4.5 21V3.75A.75.75 0 0 1 6 3h.75Z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
						<div>
							<h2 class="text-2xl font-semibold text-neutral-900">
								{{ t('contact.hours.title') }}
							</h2>
							<p class="mt-4 text-neutral-600 text-lg">
								{{ t('contact.hours.value') }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="container mx-auto px-4">
			<div class="grid gap-10 lg:grid-cols-[1.1fr,1.4fr] lg:items-center">
				<div class="space-y-5">
					<h2 class="text-3xl font-semibold text-neutral-900">
						{{ t('contact.map.title') }}
					</h2>
					<p class="text-neutral-600 leading-relaxed">
						{{ t('contact.map.subtitle') }}
					</p>
				</div>
				<div
					class="overflow-hidden rounded-3xl border border-neutral-200 shadow-sm"
				>
					<iframe
						:title="t('contact.map.title')"
						:src="mapSrc"
						class="h-[320px] w-full sm:h-[360px] lg:h-[420px]"
						loading="lazy"
						allowfullscreen
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</section>

		<section class="container mx-auto px-4 pb-16 sm:pb-20 lg:pb-24">
			<div class="rounded-3xl border border-neutral-200 p-8 sm:p-12">
				<div
					class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
				>
					<div class="max-w-xl space-y-4">
						<h2 class="text-3xl font-semibold text-neutral-900">
							{{ t('contact.socials.title') }}
						</h2>
						<p class="text-neutral-600 leading-relaxed">
							{{ t('contact.socials.hint') }}
						</p>
					</div>
					<div class="grid gap-8 sm:grid-cols-3">
						<div
							v-for="social in socialLinks"
							:key="social.id"
							class="flex flex-col items-center gap-4"
						>
							<img
								:src="social.qr"
								:alt="social.label"
								class="h-40 w-40 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
								loading="lazy"
							/>
							<div class="text-center">
								<p class="text-lg font-semibold text-neutral-900">
									{{ social.label }}
								</p>
								<a
									:href="social.href"
									target="_blank"
									rel="noopener noreferrer"
									class="text-sm text-sky-600 hover:text-sky-500 transition-colors break-all"
								>
									{{ social.href }}
								</a>
							</div>
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

const phoneNumbers = computed(() =>
	[t('contact.phones.primary'), t('contact.phones.secondary')].filter(Boolean)
);

const socialLinks = computed(() => {
	const profiles = [
		{
			id: 'instagram',
			href: 'https://www.instagram.com/applepro_100?igsh=MTI1bnhtb2FxcDV6eA%3D%3D&utm_source=qr',
		},
		{
			id: 'telegram',
			href: 'https://t.me/elpro_store',
		},
		{
			id: 'tiktok',
			href: 'https://www.tiktok.com/@elpro.store?_t=ZS-8yrweWvDZgd&_r=1',
		},
	];

	return profiles.map(profile => ({
		...profile,
		label: t(`contact.socials.${profile.id}`),
		qr: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
			profile.href
		)}`,
	}));
});

const mapSrc = computed(() => {
	const query = t('contact.location.address');
	return `https://www.google.com/maps?q=${encodeURIComponent(
		query
	)}&output=embed`;
});
</script>
