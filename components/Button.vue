<script setup lang="ts">
const props = defineProps({
    type: {
        required: false,
        type: String,
        default: 'primary'
    },
})
</script>

<template>
    <button class="btn px-4 py-2 rounded border-solid border-2" :class="`btn--${props.type}`"><slot /></button>
</template>

<style lang="stylus">
.btn    
    color #fff
    transition all .5s ease-in-out
    &--primary
        background accentColor
        border-color accentColor
    &--secondary
        border-color accentBlue
    &--disabled
        background #2d3436
        border-color #2d3436
        color darken(#fff, 50%)
    
    &:not(:is(&--disabled))
        &:active
            transition transform .1s ease-in-out
            transform translateY(2px)
</style>