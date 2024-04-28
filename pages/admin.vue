<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const tabs = [
  {
    name: 'Home',
    icon: 'material-symbols:home-rounded',
    link: '/admin/home'
  },
  {
    name: 'Branches',
    icon: 'material-symbols:location-on-outline',
    link: '/admin/branches'
  },
  {
    name: 'Testimonials',
    icon: 'material-symbols:kid-star-outline',
    link: '/admin/testimonials'
  },
  {
    name: 'Events',
    icon: 'material-symbols:calendar-today',
    link: '/admin/events'
  },
]
const active = ref(0)
</script>

<template>
  <NuxtLayout name="starry" footer="hidden">
    <div class="my-32 relative grid grid-cols-[1fr_5fr]">
      <div
        class="sidebar mx-16 flex flex-col"
      >
        <NuxtLink
          v-for="(tab, i) in tabs"
          class="text-2xl mb-2 flex items-center justify-start cursor-pointer"
          :class="{ 'text-accent': i === active }"
          @click="active = i"
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

<style lang="stylus">

gradients_to_bg(gds)
    s = ''
    for gd in gds
        push(s, 'radial-gradient(circle at ' + gd.position + ', ' + rgba(gd.color, gd.opacity) + ' ' + gd.size + ', transparent ' + gd.transparent + ')')
    shift(s)
    unquote(join(', ', s))

gradients = { position: 'top center', color: accentBlue, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom center', color: transparent, opacity: 0.6, size: 2%, transparent: 40% }

.index
    background gradients_to_bg(gradients)
    background-repeat no-repeat
    backdrop-filter blur(10px)
    animation zoomOut 0.5s ease-in-out forwards

    &--zoomed
      animation zoomIn 0.5s ease-in-out forwards


.index-content
    animation fadeIn 0.5s ease-in-out both
    animation-delay 0.5s
    &--hidden
      animation fadeOut 0.5s ease-in-out forwards


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
</style>