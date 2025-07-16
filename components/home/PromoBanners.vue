<template>
	<section class="grid grid-cols-1 lg:grid-cols-2 bg-white">
		<!-- Left Section -->
		<div class="grid-cols-1 md:grid-cols-2">
			<!-- Top: PlayStation 5 -->
			<a class="flex bg-gray-100 items-center" href="https://ya.ru/">
				<NuxtImg
					src="img/banners/ps5.jpg"
					class="w-full h-full object-cover object-center"
					loading="lazy"
					placeholder
				/>
			</a>

			<!-- Bottom: AirPods Max + Vision Pro -->
			<div class="grid grid-cols-1 md:grid-cols-2">
				<a class="flex bg-gray-50 items-center" href="https://ya.ru/">
					<NuxtImg
						src="img/banners/airPodsMax.jpg"
						class="w-full h-full object-cover object-center"
						loading="lazy"
						placeholder
					/>
				</a>
				<a
					class="flex bg-gray-800 text-white items-center"
					href="https://ya.ru/"
				>
					<NuxtImg
						src="img/banners/visionPro.jpg"
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
			href="https://ya.ru/"
		>
			<NuxtImg
				src="img/banners/mac.jpg"
				class="w-full h-full object-cover object-center"
				loading="lazy"
				placeholder
			/>
		</a>
	</section>
</template>
