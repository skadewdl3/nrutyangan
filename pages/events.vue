<script setup lang="ts">
const navbarStore = useNavbarStore()

const { data } = await useFetch<any>('/api/events', {
    method: 'GET'
})

const activeEvent = ref(-1)

let events = data.value.events

watch(activeEvent, () => {
  console.log(activeEvent.value);
  
})
</script>

<template>
  <NuxtLayout name="starry" footer="simple">
    <Gallery v-if="activeEvent != -1" :folder="events[activeEvent].id" @close="activeEvent = -1" />
        <div class="events__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center pb-8 md:pb-8 pt-32">
             <h1 class="events__title--main text-4xl md:text-6xl font-serif">Our Events</h1>
             <h3 class="events__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Dive into a world of exciting dance events and performances. From showcases to competitions and cultural celebrations, there's always something extraordinary happening here.</h3>
         </div>
        <div class="events w-[70%] md:w-[90%] xl:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8">
            <div @click="activeEvent = i" class="event my-4 self-end xl:self-center justify-self-center bg-white text-black md:w-[90%] rounded-md overflow-hidden cursor-pointer" v-for="(event, i) in [...events, ]">
                <div class="overflow-hidden">
                  <img class="transition-all" loading="lazy" :src="event.coverPhoto" alt="">
                </div>
                <div class="px-4 py-2">
                  <div class="event-title text-2xl">{{ event.name }}</div>
                  <div class="event-title text-xm text-gray-800">{{ event.date }}</div>
                </div>
            </div>
        </div>
  </NuxtLayout>
</template>

<style lang="stylus">
.event
  img
    &:hover
      transform scale(1.2) 
gradients_to_bg(gds)
    s = ''
    for gd in gds
        push(s, 'radial-gradient(circle at ' + gd.position + ', ' + rgba(gd.color, gd.opacity) + ' ' + gd.size + ', transparent ' + gd.transparent + ')')
    shift(s)
    unquote(join(', ', s))

gradients = { position: 'top center', color: accentColor, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom center', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% }


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

html
  scroll-behavior smooth
</style>
