<script setup lang="ts">
const home = ref(null)

const navbarStore = useNavbarStore()
</script>

<template>
  <div ref="home" class="home transition-all" :class="{'home--zoomed': navbarStore.flyout}">
    <!-- Twinkling Stars -->
    <Stars span="full" />

    <div class="transition-all home-content" :class="{ 'home-content--hidden': navbarStore.flyout }">
      
      <Hero />
      <!-- <Branches / -->

      <div class="branches h-screen">Branches</div>
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
            { position: '0% 50%', color: #2980b9, opacity: 0.6, size: 5%, transparent: 50% },
            { position: '100% 100%', color: #2980b9, opacity: 0.6, size: 5%, transparent: 30% }



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

.star-type1{
    width: 1px;
    height: 1px;
    border-radius: 2px;
    box-shadow: 0 0 1px 1px white;
    animation: twinkle_one 3s ease-in-out infinite;
    filter blur(1px)
}
.star-type2{
    width: 2px;
    height: 2px;
    border-radius: 2px;
    box-shadow: 0 0 2px 1px white;
    animation: twinkle_two 12s ease-in-out infinite;
    filter blur(1px)
}
.star-type3{
    width: 2px;
    height: 2px;
    border-radius: 2px;
    box-shadow: 0 0 2px 0 white;
    animation: twinkle_three 7s ease-in-out infinite;
    filter blur(1px)
}

@keyframes twinkle_one {
  0%   { opacity: 1; }
  30%  { opacity: 1; }
  70%  { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes twinkle_two {
  0%   { opacity: 1; }
  25%  { opacity: 0; }
  80%  { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes twinkle_three {
  0%   { opacity: 1; }
  30%  { opacity: 0; }
  40%  { opacity: 0; }
  100% { opacity: 1; }
}

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
