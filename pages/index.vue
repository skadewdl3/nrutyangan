<script setup lang="ts">
const navbarStore = useNavbarStore()

onMounted(() => {
  if (navbarStore.joinScroll) {
    setTimeout(() => {
      // @ts-ignore
      document.querySelector('.footer').scrollIntoView()
       navbarStore.setJoinScroll(false)
    }, 1000)
  }
})

watch(() => navbarStore.joinScroll, () => {
  if (navbarStore.joinScroll) {
    (document.querySelector('.footer') as HTMLElement).scrollIntoView({ behavior: 'smooth' })
    navbarStore.setJoinScroll(false)
  }
})
</script>

<template>
      <NuxtLayout name="starry">
        <Hero />
        <Announcements />
        <Testimonials />
      </NuxtLayout>
</template>

<style lang="stylus" >
gradients = { position: 'top left', color: accentColor, opacity: 0.6, size: 5%, transparent: 20% },
            { position: '100% 40%', color: accentBlue, opacity: 0.6, size: 5%, transparent: 40% },
            { position: '50% 65%', color: accentColor, opacity: 0.6, size: 5%, transparent: 30% },
            { position: '50% 100%', color: accentBlue, opacity: 0.6, size: 2%, transparent: 20% }

.index-index
    background gradients_to_bg(gradients)

</style>
