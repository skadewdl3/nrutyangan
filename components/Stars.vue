<script setup lang="ts">
const props = defineProps({
    count: {
        type: Number,
        required: true
    }
})

let stars = props.count

let starArray: string[] = []

for (let i = 0; i < 5; i++) {
    if (stars == 0.5) {
        starArray.push('half')
    }
    else if (stars >= 0) {
        starArray.push('full')
    }
    else {
        starArray.push('empty')
    }
    stars--
}
</script>

<template>
<div class="stars grid grid-cols-5 text-yellow-500">
    <Icon v-for="star in starArray" :name="star == 'full' ? 'ic:round-star-rate' : star == 'half' ? 'ic:round-star-half' : 'ic:round-star-border'" />
</div>
</template>


<style lang="stylus">
</style>