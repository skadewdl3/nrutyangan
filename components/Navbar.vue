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

const flyout = ref(false)
const temp = () => {
  flyout.value = !flyout.value
  console.log('this ran', flyout.value);
  
}
</script>

<template>
      <div class="navbar z-10 sticky top-0 left-0 bg-primary text-white px-16 py-4 flex items-center justify-between shadow-black/50 shadow-2xl">
    <h1 class="navbar__left md:text-xl lg:text-2xl cursor-pointer" @click="navigateTo('/')">
      Nrutyangan - Kathak Dance Academy
    </h1>
    <div class="navbar__right hidden lg:block">
      <a v-for="{name, link} in items" class="ml-4 drop-shadow-md cursor-pointer" :href="link">{{ name }}</a>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <FlyoutMenu v-if="flyout" @close="flyout = false">
          <a v-for="{name, link} in items" class="ml-4 drop-shadow-md cursor-pointer" :href="link">{{ name }}</a>
        </FlyoutMenu>
      </Transition>
    </Teleport>
    <div class="navbar__right lg:hidden">
      <button class="text-white text-2xl cursor-pointer" @click="flyout = true"><Icon name="charm:menu-hamburger" /></button>
    </div>
  </div>
</template>

<style lang="stylus">
.fade-enter-active,
.fade-leave-active 
  transition transform 0.5s ease

.fade-enter-from,
.fade-leave-to 
  transform translateX(100%)

</style>