<script setup lang="ts">
const items = [ 'Our Story', 'Gurus', 'Our Events', 'Exams', 'Join Us']
</script>

<template>
    <Head>
        <Title>Nrutyangan</Title>
    </Head>
    <div class="navbar sticky top-0 left-0 bg-primary text-white px-16 py-4 flex items-center justify-between">
        <h1 class="navbar__left text-2xl drop-shadow-md">Nrutyangan - Kathak Dance Academy</h1>
        <div class="navbar__right">
            <a v-for="item in items" class="ml-4 drop-shadow-md">{{ item }}</a>
        </div>
    </div>
    <div class="hero relative flex flex-col items-center justify-center bg-[url('~/assets/images/hero.jpeg')] h-screen bg-no-repeat bg-center bg-cover text-white">
        <h1 class="text-8xl font-bold drop-shadow-xl">Nrutyangan</h1>
        <h3 class="text-6xl drop-shadow-xl">Kathak Dance Academy</h3>
    </div>
</template>

<style lang="stylus">

</style>