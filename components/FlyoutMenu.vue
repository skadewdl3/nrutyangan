<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
	<div class="absolute top-0 right-0 w-3/4 h-screen z-[11] bg-black/85">
		<div class="wrapper w-full h-full relative">
			<button @click="emit('close')" class="text-white text-2xl cursor-pointer absolute top-4 right-16"><Icon name="charm:menu-hamburger" /></button>
			<slot />
		</div>
	</div>
</template>

<style lang="stylus">

</style>