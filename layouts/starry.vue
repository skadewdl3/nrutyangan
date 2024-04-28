<script setup lang="ts">
const navbarStore = useNavbarStore()
const props = defineProps({
  footer: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<template>
  <Head>
    <Title>Nrutyangan</Title>
  </Head>
  <Body>
    <Navbar class="absolute top-0 left-0 w-full z-10" />
    <div
      class="index transition-all relative"
      :class="{ 'index--zoomed': navbarStore.flyout }"
    >
      <StarField span="full" />

      <div
        class="transition-all index-content flex items-between justify-between flex-col min-h-screen w-full"
        :class="{ 'index-content--hidden': navbarStore.flyout }"
      >
      <div>
        <slot />
      </div>

        <Footer :simple="Boolean(props.footer)" />
      </div>
    </div>
  </Body>
</template>
