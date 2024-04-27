<script setup lang="ts">
const navbarStore = useNavbarStore()

const { data } = await useFetch<any>('/api/events', {
    method: 'GET'
})

let events = data.value.events

console.log(events);

</script>

<template>
  <div
    ref="index"
    class="index transition-all relative"
    :class="{ 'index--zoomed': navbarStore.flyout }"
  >
    <!-- Twinkling Stars -->
    <StarField span="full" />

    <div
      class="transition-all index-content"
      :class="{ 'index-content--hidden': navbarStore.flyout }"
    >

    <div class="events w-full h-screen grid grid-cols-3 gap-32 place-items-center">
        <div class="event bg-white text-black h-64 aspect-square" v-for="event in events">
            <img :src="event.coverPhoto" alt="">
            <div class="event-title">{{ event.name }}</div>
            <div class="event-title">{{ event.date }}</div>
        </div>
    </div>


    <Footer :simple="true" />
    </div>
  </div>
</template>

<style lang="stylus">
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
