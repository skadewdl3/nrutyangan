<script setup lang="ts">
const props = defineProps({
    date: {
        type: String,
        required: false
    }
})
</script>

<template>
     <div class="event-title">
         <h1 class="text-4xl xl:text-5xl text-left font-bold"><slot /></h1>
         <h4 class="text-xl xl:text-2xl font-thin" v-if="props.date">{{ props.date }}</h4>
     </div>
</template>