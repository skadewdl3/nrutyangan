<script setup>
const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button class="px-4 py-2 rounded bg-[#007bff] text-white hover:bg-[#0056b3] active:translate-y-[1px] transition-all flex items-center justify-center">
        <Icon v-if="props.loading" class="animate-spin mr-4" name="ant-design:loading-outlined" />
        <slot />
    </button>
</template>

<style lang="stylus">

</style>