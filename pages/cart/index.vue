<script setup>
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';
import * as yup from 'yup';

const config = useRuntimeConfig();
const { locale } = useI18n();
const cart = useCartStore();
const toast = useToast();
const { post } = useApi();

// Поля
const form = ref({
	location: 'Ашхабад',
	isPickup: false,
	address: '',
	name: '',
	phone: '',
	email: '',
	comment: '',
});

// Ошибки
const errors = ref({});

// Состояние
const submitting = ref(false);
const success = ref(false);

// Схема валидации
const schema = yup.object({
	location: yup.string().required('Пожалуйста выберите опцию'),
	address: yup.string().when('isPickup', {
		is: false,
		then: schema => schema.required('Адрес доставки обязателен'),
		otherwise: schema => schema.notRequired(),
	}),
	name: yup.string().required('Фамилия и имя обязательны'),
	phone: yup
		.string()
		.matches(/^\+993 \(\d{2}\) \d{2}-\d{2}-\d{2}$/, 'Формат телефона не верен')
		.required('Номер телефона обязателен'),
	email: yup.string().email('Email не верен').notRequired(),
	comment: yup
		.string()
		.test(
			'min-if-not-empty',
			'Сообщение должно быть не менее 5 символов',
			value => !value || value.length >= 5
		)
		.notRequired(),
});

// Отправка формы
const submitForm = async () => {
	errors.value = {};

	try {
		await schema.validate(form.value, { abortEarly: false });
	} catch (err) {
		if (err.inner) {
			err.inner.forEach(e => {
				errors.value[e.path] = e.message;
			});
		}
		return;
	}

	submitting.value = true;
	try {
		const sentData = {
			...form.value,
			products: cart.cartItems.map(item => ({
				_id: item._id,
				name: item.name.ru,
				quantity: item.quantity,
				price: item.price,
			})),
			totalPrice: cart.sumTotal,
		};

		await post('/create-order', sentData);
		success.value = true;

		form.value = {
			location: 'Ашхабад',
			isPickup: false,
			address: '',
			name: '',
			phone: '',
			email: '',
			comment: '',
		};

		cart.clearCart();

		toast.success({
			title: 'Успешно!',
			message: 'Заказ был успешно создан!',
			position: 'bottomCenter',
		});
	} catch (e) {
		console.error(e);

		toast.error({
			title: 'Ошибка!',
			message: 'Что-то пошло не так, попробуйте позже',
			position: 'bottomCenter',
		});
	} finally {
		submitting.value = false;
	}
};
</script>

<template>
	<div class="container mx-auto py-6 px-4">
		<Breadcrumb />

		<!-- CART -->
		<div class="container mx-auto p-4 lg:flex lg:gap-8">
			<!-- Cart Items -->
			<div class="flex-1">
				<h1 class="text-2xl font-semibold mb-2">Корзина</h1>

				<p class="mb-6 text-gray-600 font-thin">
					После оформления заказа, наш менеджер свяжеться с вами , для
					согласования стоимости доставки. Сейчас вы ни за что не платите.
				</p>

				<div
					v-for="item in cart.cartItems"
					:key="item._id"
					class="flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-400 py-4 gap-4"
				>
					<div class="flex items-center gap-4">
						<NuxtImg
							:src="`${config.public.apiURL}${item.images[0]}`"
							class="w-24 h-24 object-cover object-center"
							loading="lazy"
							placeholder
						/>

						<NuxtLink :to="$localePath(`/${item._id}`)">
							<h2 class="font-medium hover:text-sky-700">
								{{ item.name[locale] }}
							</h2>
						</NuxtLink>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex items-center rounded-sm border border-gray-200">
							<button
								class="size-10 px-4 leading-10 font-medium text-gray-600 transition hover:opacity-75 cursor-pointer"
								@click="cart.decreaseQuantity(item._id)"
							>
								&minus;
							</button>

							<span class="font-medium px-2">{{ item.quantity }}</span>

							<button
								v-if="item.stock > item.quantity"
								class="size-10 px-4 font-medium leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer"
								@click="cart.increaseQuantity(item._id)"
							>
								&plus;
							</button>

							<button
								v-else
								class="size-10 px-4 font-medium leading-10 text-gray-600 transition hover:opacity-75 cursor-not-allowed"
								@click="
									toast.warning({
										title: 'Внимание!',
										message:
											'Вы достигли максимального количества данного товара',
										position: 'bottomCenter',
									})
								"
							>
								&plus;
							</button>
						</div>
						<p class="w-35 text-center font-medium">{{ item.price }} тмт</p>
						<button
							class="text-2xl pr-3 cursor-pointer"
							@click="cart.removeItem(item._id)"
						>
							&times;
						</button>
					</div>
				</div>
			</div>

			<!-- Order Summary -->
			<form
				class="lg:w-1/3 w-full mt-10 lg:mt-0 border border-gray-400 rounded-lg p-6 h-fit"
				@submit.prevent="submitForm"
			>
				<h2 class="text-xl font-semibold mb-4">Оформление заказа</h2>

				<!-- Cities -->
				<div class="mb-4">
					<label class="block text-sm mb-2">
						Город доставки <span class="text-red-600">*</span>
					</label>
					<select
						v-model="form.location"
						class="w-full border border-gray-400 rounded p-2"
					>
						<option value="Ашхабад" selected>Ашхабад</option>
						<option value="Аркадаг">Аркадаг</option>
						<option value="Ахалский велаят">Ахалский велаят</option>
						<option value="Балканский велаят">Балканский велаят</option>
						<option value="Ташаузский велаят">Ташаузский велаят</option>
						<option value="Лебабский велаят">Лебабский велаят</option>
						<option value="Марыйский велаят">Марыйский велаят</option>
					</select>
					<p v-if="errors.location" class="text-red-600 text-sm">
						{{ errors.location }}
					</p>
				</div>

				<!-- Pickup -->
				<div class="mb-4">
					<label class="block text-sm mb-2">
						Адрес доставки <span class="text-red-600">*</span>
					</label>

					<div class="flex items-center gap-2">
						<label
							class="relative block h-6 w-13 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-sky-500 cursor-pointer"
						>
							<input
								v-model="form.isPickup"
								type="checkbox"
								class="peer sr-only"
							/>

							<span
								class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[6px] ring-white transition-all ring-inset peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
							>
							</span>
						</label>

						<span>Самовывоз</span>
					</div>
				</div>

				<!-- address -->
				<div class="mb-4">
					<input
						v-model="form.address"
						type="text"
						:class="[
							'w-full border border-gray-400 rounded p-2 focus:outline-none focus:border-sky-500',
							errors.address ? 'border-red-600' : '',
						]"
						:placeholder="
							form.isPickup ? 'Адрес магазина' : 'Введите адрес доставки'
						"
						:disabled="form.isPickup"
					/>
					<p v-if="errors.address" class="text-red-600 text-sm mt-1 px-1">
						{{ errors.address }}
					</p>
				</div>

				<!-- name -->
				<div class="mb-4">
					<label class="block text-sm mb-2">
						Фамилия, имя <span class="text-red-600">*</span>
					</label>
					<input
						v-model="form.name"
						type="text"
						:class="[
							'w-full border border-gray-400 rounded p-2 focus:outline-none focus:border-sky-500',
							errors.name ? 'border-red-600' : '',
						]"
						placeholder="Дурды Дурдыев"
					/>
					<p v-if="errors.name" class="text-red-600 text-sm mt-1 px-1">
						{{ errors.name }}
					</p>
				</div>

				<!-- Phone -->
				<div class="mb-4">
					<label class="block text-sm mb-2">
						Номер телефона <span class="text-red-600">*</span>
					</label>
					<input
						v-model="form.phone"
						v-mask="'+993 (##) ##-##-##'"
						type="text"
						:class="[
							'w-full border border-gray-400 rounded p-2 focus:outline-none focus:border-sky-500',
							errors.phone ? 'border-red-600' : '',
						]"
						placeholder="+993 (__) ___-____"
					/>
					<p v-if="errors.phone" class="text-red-600 text-sm mt-1 px-1">
						{{ errors.phone }}
					</p>
				</div>

				<!-- email -->
				<div class="mb-4">
					<label class="block text-sm mb-2"> E-mail (не обязательно) </label>
					<input
						v-model="form.email"
						type="text"
						:class="[
							'w-full border border-gray-400 rounded p-2 focus:outline-none focus:border-sky-500',
							errors.email ? 'border-red-600' : '',
						]"
						placeholder="info@gmail.com"
					/>
					<p v-if="errors.email" class="text-red-600 text-sm mt-1 px-1">
						{{ errors.email }}
					</p>
				</div>

				<!-- Comment -->
				<div class="mb-4">
					<label class="block text-sm mb-2"> Комментарий </label>
					<textarea
						v-model="form.comment"
						:class="[
							'w-full border border-gray-400 h-40 rounded p-2 focus:outline-none focus:border-sky-500',
							errors.comment ? 'border-red-600' : '',
						]"
						placeholder="Комментарий к заказу (например, удобное время доставки)"
					>
					</textarea>
					<p v-if="errors.comment" class="text-red-600 text-sm mt-1 px-1">
						{{ errors.comment }}
					</p>
				</div>

				<!-- TOTAL SUMMA -->
				<div class="flex lg:justify-between font-semibold text-lg mb-6 gap-2">
					<span>Итого:</span>
					<span>{{ cart.sumTotal }} тмт</span>
				</div>

				<!-- button -->
				<button
					type="submit"
					:disabled="submitting"
					class="w-full bg-black text-white py-3 rounded cursor-pointer transition hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{{ submitting ? 'Отправка...' : 'Отправить' }}
				</button>
			</form>
		</div>
	</div>
</template>
