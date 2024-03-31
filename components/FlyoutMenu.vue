<script setup lang="ts">
const emit = defineEmits(['close'])
const props = defineProps({
	items: {
		type: Array<{name: String, link: String}>,
		required: true
	}
})
const shown = ref(false)

onMounted(() => {
	setTimeout(() => {
		shown.value = true
	}, 500)
	
	console.log(props.items);
})

const close = () => {
	emit('close')
}
</script>

<template>
	<div class="absolute top-0 right-0 w-full h-screen z-[11] flex justify-end" @click="close">
		<div class="wrapper w-[90%] lg:w-3/4 h-full relative bg-black/85 text-white text-2xl" @click.stop="">

			<div class="close-btn w-full px-4 lg:px-16 py-4 flex justify-end">
				<button @click="close" class="text-white transition-all text-2xl cursor-pointer" :class="{'scale-100': shown, 'scale-0': !shown}"><Icon name="material-symbols-light:close-rounded"/></button>
			</div>
			<div class="flex flex-col items-start justify-center">
				<div class="flyout-item w-full" v-for="(item, i) in props.items">
					<slot :content="item.name" :link="item.link.toString()"  />
					<div class="w-full my-2 h-0.5 bg-white" v-if="i != props.items.length - 1"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="stylus">

</style>