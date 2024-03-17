<script setup lang="ts">
const props = defineProps({
    start: {
        required: true,
        type: Number
    },
    end: {
        required: true,
        type: Number
    },
    color: {
        required: false,
        type: String,
        default: '#283C27'
    },
    animate: {
        required: false,
        type: Boolean,
        default: true
    }
})

console.log(props.start, props.end);

</script>

<template>
    <div class="line__wrapper absolute left-1/2 -translate-x-1/2 w-4" :style="{top: `${props.start}px`, height: `${props.end - props.start}px`}">
        <div :data-aos="props.animate ? 'slide-down' : 'zoom-in-down'" class="timeline__line w-full h-full  rounded-lg" :style="{background: props.color}"></div>
    </div>
</template>