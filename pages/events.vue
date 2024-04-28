<script setup lang="ts">
const navbarStore = useNavbarStore()

const { data } = await useFetch<any>('/api/events', {
    method: 'GET'
})

const activeEvent = ref(-1)

let events = data.value.events
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

<style lang="stylus" >
.event
  img
    &:hover
      transform scale(1.2) 

gradients = { position: 'top center', color: accentColor, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom center', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% }

.index-events
    background gradients_to_bg(gradients)

</style>
