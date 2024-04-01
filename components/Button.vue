<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        default: '#007bff'
    },
    hoverColor: {
        type: String,
        default: '#0056b3'
    },
    textColor: {
        type: String,
        default: '#fff'
    }
})

const btn = ref(null)

onMounted(() => {
    btn.value.addEventListener('mouseover', () => {
        btn.value.style.backgroundColor = props.hoverColor
    })
    btn.value.addEventListener('mouseout', () => {
        btn.value.style.backgroundColor = props.color
    })
})
</script>

<template>
    <button class="px-4 py-2 rounded active:translate-y-[1px] transition-all flex items-center justify-center" :style="{color: props.textColor, backgroundColor: props.color}" ref="btn">
        <Icon v-if="props.loading" class="animate-spin mr-4" name="ant-design:loadinined" />
        <slot />
    </button>
</template>

<style lang="stylus">

</style>