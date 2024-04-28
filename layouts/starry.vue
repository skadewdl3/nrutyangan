<script setup lang="ts">
const navbarStore = useNavbarStore()
const props = defineProps({
  footer: {
    type: String,
    required: false,
    default: ''
  }
})

const routeName = computed(() => {

  return String((useRoute().name || '')).split('-')[0]
})
</script>

<template>
  <Head>
    <Title>Nrutyangan</Title>
  </Head>
    <Navbar class="absolute top-0 left-0 w-full z-10" />
    <div
      class="index transition-all relative"
      :class="`${navbarStore.flyout ? 'index--zoomed' : ''} index-${routeName}`"
      >
      <StarField span="full" />

      <div
        class="transition-all index-content flex items-between justify-between flex-col min-h-screen w-full"
        :class="{ 'index-content--hidden': navbarStore.flyout }"
      >
      <div>
        <slot />
      </div>

        <Footer v-if="props.footer != 'hidden'" :simple="Boolean(props.footer)" />
      </div>
    </div>
</template>

<style lang="stylus">

.index-content
    animation fadeIn 0.5s ease-in-out both
    animation-delay 0.5s
    &--hidden
      animation fadeOut 0.5s ease-in-out forwards


.index
    background-repeat no-repeat
    backdrop-filter blur(10px)
    animation zoomOut 0.5s ease-in-out forwards

    &--zoomed
      animation zoomIn 0.5s ease-in-out forwards

@keyframes zoomIn {
  from {
    background-size: 100% 100%;
  }
  to {
    background-size: 150% 150%;
  }
}

@keyframes zoomOut {
  from {
    background-size: 150% 150%;
  }
  to {
    background-size: 100% 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}


html
  scroll-behavior smooth
</style>