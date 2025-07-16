<template>
	<div class="min-h-screen flex flex-col">
		<!-- HEADER -->
		<Header />

		<!-- MAIN -->
		<main class="flex-grow mt-[140px]">
			<slot />
		</main>

		<!-- FOOTER -->
		<Footer />
	</div>
</template>

<!-- container mx-auto px-4 py-6 -->

<script setup>
import Footer from '@/components/layout/Footer.vue';
import Header from '@/components/layout/Header.vue';
</script>
