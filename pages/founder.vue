<script setup lang="ts">
const navbarStore = useNavbarStore()
</script>

<template>
  <div
    class="index transition-all relative"
    :class="{ 'index--zoomed': navbarStore.flyout }"
  >
    <StarField span="full" />

    <div
      class="transition-all index-content"
      :class="{ 'index-content--hidden': navbarStore.flyout }"
    >
      <Footer />
    </div>
  </div>
</template>

<style lang="stylus"></style>
