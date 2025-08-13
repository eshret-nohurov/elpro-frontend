<template>
	<div class="min-h-screen flex flex-col">
		<!-- HEADER -->
		<Header class="hidden lg:block" />
		<MobileHeader class="block lg:hidden" />

		<!-- MAIN -->
		<main class="flex-grow mt-[70px] lg:mt-[140px]">
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
import MobileHeader from '@/components/layout/MobileHeader.vue';
</script>
