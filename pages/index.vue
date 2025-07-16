<template>
	<div>
		<Banners />
		<PromoBanners />
		<ProductList />
		<FooterBanner />
	</div>
</template>

<script setup>
import Banners from '@/components/home/Banners.vue';
import FooterBanner from '@/components/home/FooterBanner.vue';
import ProductList from '@/components/home/ProductList.vue';
import PromoBanners from '@/components/home/PromoBanners.vue';
</script>
