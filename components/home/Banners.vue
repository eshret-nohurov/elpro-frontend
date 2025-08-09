<script setup>
const config = useRuntimeConfig();
const containerRef = ref(null);

defineProps({
	mainBanner: {
		type: Array,
		default: () => [],
	},
});

useSwiper(containerRef, {
	loop: true,
	autoplay: {
		delay: 6000,
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
	<swiper-container ref="containerRef" :init="false" class="aspect-[21/9]">
		<swiper-slide v-for="(slide, idx) in mainBanner" :key="idx">
			<NuxtLink v-if="slide.url != ''" :to="slide.url">
				<NuxtImg
					:src="`${config.public.apiURL}${slide.image}`"
					class="w-full h-full object-cover object-center"
					loading="lazy"
					placeholder
					@error="e => console.error('Image error:', e)"
				/>
			</NuxtLink>
			<NuxtImg
				v-else
				:src="`${config.public.apiURL}${slide.image}`"
				class="w-full h-full object-cover object-center"
				loading="lazy"
				placeholder
				@error="e => console.error('Image error:', e)"
			/>
		</swiper-slide>
	</swiper-container>
</template>
