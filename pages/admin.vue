<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const adminStore = useAdminStore()
const route = useRoute()

adminStore.setActiveTab(adminStore.tabs.findIndex((tab: any) => tab.link === route.path))

</script>

<template>
  <NuxtLayout name="starry" footer="hidden">
    <div class="my-32 relative grid grid-cols-[1fr_5fr]">
      <div
        class="sidebar mx-16 flex flex-col"
      >
        <NuxtLink
          v-for="(tab, i) in adminStore.tabs"
          class="text-2xl mb-2 flex items-center justify-start cursor-pointer"
          :class="{ 'text-accent': i === adminStore.activeTab }"
          @click="adminStore.setActiveTab(i)"
          :to="tab.link"
        >
          <Icon :name="tab.icon" />
          <span class="text-lg uppercase ml-4">{{ tab.name }}</span>
        </NuxtLink>
      </div>

      <div class="mx-20">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="stylus" >
.testimonial
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    

gradients = { position: 'top center', color: accentBlue, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom center', color: transparent, opacity: 0.6, size: 2%, transparent: 40% }
.index-admin
    background gradients_to_bg(gradients)

</style>