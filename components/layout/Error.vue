<template>
	<div class="error">
		<div class="error-icon">⚠️</div>
		<div class="error-message">{{ message }}</div>
		<button @click="$emit('retry')" class="error-button">
			Попробовать снова
		</button>
	</div>
</template>

<script setup>
defineProps({
	message: String,
});

defineEmits(['retry']);
</script>

<style scoped>
.error {
	padding: 20px;
	text-align: center;
	background: #ffebee;
	border-radius: 8px;
	margin: 20px 0;
}

.error-icon {
	font-size: 40px;
	margin-bottom: 10px;
}

.error-message {
	font-size: 18px;
	margin-bottom: 15px;
	color: #d32f2f;
}

.error-button {
	padding: 8px 16px;
	background: #1976d2;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
