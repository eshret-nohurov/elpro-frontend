<script setup>
import { useNavStore } from '~/stores/nav';

const navStore = useNavStore();

onMounted(() => {
	if (navStore.items.length === 0) {
		navStore.fetchNav();
	}
});
</script>

<template>
	<div>
		<NuxtLayout class="font-sans">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
