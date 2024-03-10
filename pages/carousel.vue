<script setup lang="ts">

</script>

<template>
    <Carousel :items-to-show="5">
        <Slide v-for="slide in 10" :key="slide">
        {{ slide }}
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>

<style lang="stylus">

</style>