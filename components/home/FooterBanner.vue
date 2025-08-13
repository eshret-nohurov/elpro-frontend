<script setup>
const config = useRuntimeConfig();

defineProps({
	footerBanner: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<a class="aspect-[21/9]" :href="`${footerBanner[0].url}`">
		<NuxtImg
			:src="`${config.public.apiURL}${footerBanner[0].image}`"
			class="w-full h-full object-cover object-center"
			loading="lazy"
			placeholder
		/>
	</a>
</template>
