<script setup lang="ts">
const home = ref(null)

const navbarStore = useNavbarStore()
</script>

<template>
  <div ref="home" class="home transition-all relative" :class="{'home--zoomed': navbarStore.flyout}">
    <!-- Twinkling Stars -->
    <Stars span="full" />

    <div class="transition-all home-content" :class="{ 'home-content--hidden': navbarStore.flyout }">
      
      <Hero />
      <Branches />
      <Footer />

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

gradients = { position: 'top left', color: accentColor, opacity: 0.6, size: 5%, transparent: 30% },
            { position: '0% 50%', color: accentBlue, opacity: 0.6, size: 5%, transparent: 50% },
            { position: '100% 100%', color: accentBlue, opacity: 0.6, size: 5%, transparent: 30% }


.home
    background gradients_to_bg(gradients)
    background-repeat no-repeat
    backdrop-filter blur(10px)
    animation zoomOut 0.5s ease-in-out forwards

    &--zoomed
      animation zoomIn 0.5s ease-in-out forwards


.home-content
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
