<script setup>
const containerRef = ref(null);
const slides = ref([
	{
		img: 'img/banners/banner.jpg',
	},
	{ img: 'img/banners/mainSlide.jpg' },

	{ img: 'img/banners/mainSlide2.jpg' },
]);
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
		<swiper-slide v-for="(slide, idx) in slides" :key="idx">
			<NuxtImg
				:src="slide.img"
				class="w-full h-full object-cover object-center"
				loading="lazy"
				placeholder
			/>
		</swiper-slide>
	</swiper-container>
</template>
