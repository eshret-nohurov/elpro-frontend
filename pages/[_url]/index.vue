<template>
	<div class="container mx-auto py-6 px-4">
		<Breadcrumb />

		<div class="flex flex-wrap mb-10">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>

		<!-- Pagination -->
		<ul class="flex justify-center gap-1 text-gray-900 mb-5">
			<li>
				<a
					href="#"
					class="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
					aria-label="Previous page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</li>

			<li>
				<a
					href="#"
					class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
				>
					1
				</a>
			</li>

			<li
				class="block size-8 rounded border border-sky-500 bg-sky-500 text-center text-sm/8 font-medium text-white"
			>
				2
			</li>

			<li>
				<a
					href="#"
					class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
				>
					3
				</a>
			</li>

			<li>
				<a
					href="#"
					class="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50"
				>
					4
				</a>
			</li>

			<li>
				<a
					href="#"
					class="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
					aria-label="Next page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="size-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import ProductCard from '@/components/layout/ProductCard.vue';

const products = [
	{
		id: 1,
		name: 'Apple iPhone 14 Pro Max 128GB Deep Purple ',
		price: '$10',
	},
	{ id: 2, name: 'Product A2', price: '$12' },
	{ id: 3, name: 'Product A3', price: '$15' },
	{ id: 4, name: 'Product A4', price: '$20' },
	{ id: 5, name: 'Product A5', price: '$8' },
	{ id: 6, name: 'Product A6', price: '$18' },
	{ id: 7, name: 'Product A7', price: '$25' },
	{ id: 8, name: 'Product A8', price: '$30' },
	{ id: 9, name: 'Product A9', price: '$20' },
	{ id: 10, name: 'Product A10', price: '$8' },
	{ id: 11, name: 'Product A11', price: '$18' },
	{ id: 12, name: 'Product A12', price: '$25' },
];
</script>
