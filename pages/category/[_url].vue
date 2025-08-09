<script setup>
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import Error from '@/components/layout/Error.vue';
import Loader from '@/components/layout/Loader.vue';
import ProductCard from '@/components/layout/ProductCard.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import useApi from '~/composables/useApi';

const route = useRoute();
const { get } = useApi();
const isLoading = ref(false);
const error = ref(false);
const errorMessage = ref('');

const products = ref([]);

const lastSegment = computed(() => {
	const parts = route.path.split('/');
	return parts.filter(part => part !== '').pop();
});

const fetchData = async () => {
	try {
		error.value = false;
		isLoading.value = true;

		const data = await get(`/products/category/${lastSegment.value}`);

		products.value = data.data.products || [];
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
	<div class="container mx-auto py-6 px-4">
		<Error v-if="error" :message="errorMessage" @retry="fetchData" />

		<div v-else>
			<Loader :loading="isLoading" />

			<Breadcrumb />

			<div class="flex flex-wrap mb-10">
				<ProductCard
					v-for="product in products"
					:key="product._id"
					:product="product"
				/>
			</div>
		</div>
	</div>
</template>
