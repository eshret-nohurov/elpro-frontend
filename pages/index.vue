<script setup>
import Banners from '@/components/home/Banners.vue';
import FooterBanner from '@/components/home/FooterBanner.vue';
import ProductList from '@/components/home/ProductList.vue';
import PromoBanners from '@/components/home/PromoBanners.vue';
import Error from '@/components/layout/Error.vue';
import Loader from '@/components/layout/Loader.vue';
import { onMounted, ref } from 'vue';
import useApi from '~/composables/useApi';

const { get } = useApi();
const isLoading = ref(false);
const error = ref(false);
const errorMessage = ref('');

const mainBanner = ref([]);
const promoBanner = ref([]);
const productsSection = ref([]);
const footerBanner = ref([]);

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
	try {
		error.value = false;
		isLoading.value = true;

		// await delay(1500);

		const data = await get('/home');

		mainBanner.value = data.main_banner || [];
		promoBanner.value = data.promo_banner || [];
		productsSection.value = data.products_section || [];
		footerBanner.value = data.footer_banner || [];
	} catch (err) {
		error.value = true;
		errorMessage.value =
			err.response.data.error || 'Не удалось загрузить данные';
	} finally {
		isLoading.value = false;
	}
};

onMounted(fetchData);
</script>

<template>
	<Error v-if="error" :message="errorMessage" @retry="fetchData" />

	<div v-else>
		<Loader :loading="isLoading" />

		<Banners v-if="mainBanner.length > 0" :mainBanner="mainBanner" />
		<PromoBanners v-if="promoBanner.length > 0" :promoBanner="promoBanner" />
		<ProductList
			v-if="productsSection.length > 0"
			:productsSection="productsSection"
		/>
		<FooterBanner v-if="footerBanner.length > 0" :footerBanner="footerBanner" />
	</div>
</template>
