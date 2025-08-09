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
	<NuxtLink v-if="footerBanner.length > 0" class="aspect-[21/9]" to="/">
		<NuxtImg
			:src="`${config.public.apiURL}${footerBanner[0].image}`"
			class="w-full h-full object-cover object-center"
			loading="lazy"
			placeholder
		/>
	</NuxtLink>
</template>
