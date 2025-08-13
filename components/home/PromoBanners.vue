<script setup>
const config = useRuntimeConfig();

defineProps({
	promoBanner: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<section
		v-if="promoBanner.length > 0"
		class="grid grid-cols-1 lg:grid-cols-2 bg-white"
	>
		<!-- Left Section -->
		<div class="grid-cols-1 md:grid-cols-2">
			<!-- Top: PlayStation 5 -->
			<a class="flex bg-gray-100 items-center" :href="`${promoBanner[0].url}`">
				<NuxtImg
					:src="`${config.public.apiURL}${promoBanner[0].image}`"
					class="w-full h-full object-cover object-center"
					loading="lazy"
					placeholder
				/>
			</a>

			<!-- Bottom: AirPods Max + Vision Pro -->
			<div class="grid grid-cols-1 md:grid-cols-2">
				<a class="flex bg-gray-50 items-center" :href="`${promoBanner[1].url}`">
					<NuxtImg
						:src="`${config.public.apiURL}${promoBanner[1].image}`"
						class="w-full h-full object-cover object-center"
						loading="lazy"
						placeholder
					/>
				</a>
				<a
					class="flex bg-gray-800 text-white items-center"
					:href="`${promoBanner[2].url}`"
				>
					<NuxtImg
						:src="`${config.public.apiURL}${promoBanner[2].image}`"
						class="w-full h-full object-cover object-center"
						loading="lazy"
						placeholder
					/>
				</a>
			</div>
		</div>

		<!-- Right Section: MacBook -->
		<a
			class="bg-gray-100 flex flex-col justify-center items-start relative"
			:href="`${promoBanner[3].url}`"
		>
			<NuxtImg
				:src="`${config.public.apiURL}${promoBanner[3].image}`"
				class="w-full h-full object-cover object-center"
				loading="lazy"
				placeholder
			/>
		</a>
	</section>
</template>
