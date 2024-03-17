<script setup lang="ts">
const props = defineProps({
    top: {
        required: true,
        type: Number
    },
    size: {
        required: false,
        type: Number,
        default: 60
    },
    color: {
        required: false,
        type: String,
        default: '#ffffff'
    },
    borderColor: {
        required: false,
        type: String,
        default: '#283C27'
    },
    borderSize: {
        required: false,
        type: Number,
        default: 10
    }
})
</script>

<template>
    <div class="circle__wrapper absolute left-1/2 -translate-x-1/2 -translate-y-1/2" :style="{ top: `${props.top}px`, width: `${props.size}px` }">
    <div
        data-aos="zoom-in"
      class="timeline__circle relative w-full rounded-full border-solid aspect-square"
      :style="{background: props.color, borderColor: props.borderColor, borderWidth: `${props.borderSize}px`}"
    >
    </div>
    </div>
</template>