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
delay = 0.25s
.home
    background radial-gradient(circle at top left, rgba(accentColor, 0.6) 5%, transparent 30%),  radial-gradient(circle at 0% 50%, rgba(#2980b9, 0.6) 5%, transparent 50%)
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
