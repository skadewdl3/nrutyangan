<script setup lang="ts">
    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Select'
        },
        items: {
            type: Array,
            required: true
        }
    })

    const model = defineModel()
</script>

<template>
    <select class="px-4 py-2 my-2 border-solid border-2 bg-white border-[#ccc] rounded outline-none">
        <option v-for="item in props.items" :value="item">{{ item }}</option>
    </select>
</template>

<style lang="stylus">
    
</style>