<script setup lang="ts">

</script>

<template>
    <div class="branches h-screen grid">
        <div class="branches__container place-self-center">
            <div class="branches__title text-center">
                <h1 class="branches__title--main text-5xl md:text-7xl xl:text-8xl font-serif">Our Branches</h1>
                <h3 class="branches__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Explore our vibrant dance community across multiple locations. Find the nearest branch to you and join us in experiencing the joy of dance.</h3>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">

.branches
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    transform translateY(-10%)
    clip-path polygon(0 0, 100% 10%, 100% 100%, 0 90%)
    
</style>