<script setup lang="ts">
const items = [
  {
    name: 'Our Story',
    link: '/story'
  },
  {
    name: 'Gurus',
    link: '/gurus'
  },
  {
    name: 'Our Events',
    link: '/events'
  },
  {
    name: 'Exams',
    link: '/exams'
  },
  {
    name: 'Join Us',
    link: '#join'
  }
]
</script>

<template>
      <div class="navbar z-10 sticky top-0 left-0 bg-primary text-white px-16 py-4 flex items-center justify-between shadow-black/50 shadow-2xl">
    <h1 class="navbar__left text-2xl cursor-pointer" @click="navigateTo('/')">
      Nrutyangan - Kathak Dance Academy
    </h1>
    <div class="navbar__right">
      <a v-for="{name, link} in items" class="ml-4 drop-shadow-md cursor-pointer" :href="link">{{ name }}</a>
    </div>
  </div>
</template>

<style lang="stylus"></style>