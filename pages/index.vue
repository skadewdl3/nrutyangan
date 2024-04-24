<script setup lang="ts">
const home = ref(null)
const { width, height } = useElementSize(home)
let stars = ref<Array<{ x: number; y: number; type: number }>>([])
var generateStars = function () {
  if (width.value < 1024) {
    for (let i = 0; i < 50; i++) {
      let x = Math.random()
      let y = Math.random()
      var type = Math.floor(Math.random() * 3 + 1)
      stars.value.push({
        x: width.value * x,
        y: height.value * y,
        type,
      })
    }
  } else {
    for (let i = 0; i < 50; i++) {
      let x = Math.random()
      let y = Math.random()
      var type = Math.floor(Math.random() * 3 + 1)
      stars.value.push({
        x: width.value - (width.value / 2) * x,
        y: height.value * y,
        type,
      })
    }
  }
}

const throttle = (func: (...argArr: any[]) => any, timeFrame: number) => {
  var lastTime = 0
  return (...args: any[]) => {
    var now = new Date().getTime()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}

watch(
  [width, height],
  throttle(() => {
    stars.value = []
    generateStars()
  }, 500)
)

onMounted(() => {
  generateStars()
})

const navbarStore = useNavbarStore()
</script>

<template>
  <div ref="home" class="home w-full h-screen relative transition-all" :class="{'home--zoomed': navbarStore.flyout}">
    <!-- Twinkling Stars -->
    <div class="stars">
      <div
        v-for="star in stars"
        :class="`absolute bg-white star star-type${star.type}`"
        :style="{ top: star.y + 'px', left: star.x + 'px' }"
      ></div>
    </div>
    <div class="transition-all home-content" :class="{ 'home-content--hidden': navbarStore.flyout }">
      <div
        class="hero__title w-full h-screen px-8 grid grid-cols-1 lg:grid-cols-2 absolute top-1/2 -translate-y-1/2"
      >
        <img
          class="hidden lg:block self-end justify-self-center xl:h-[calc(100vh_-_200px)] h-[calc(100vh_-_300px)]"
          src="~/assets/hero.png"
          alt=""
        />
        <div class="place-self-center text-center lg:text-right">
          <h1 class="text-5xl md:text-7xl xl:text-8xl font-serif">
            Nrutyangan
          </h1>
          <h3 class="font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">
            Where passion meets elegance
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
delay = 0.25s
.home
    background radial-gradient(circle at top left, rgba(accentColor, 0.6) 5%, transparent 30%),  radial-gradient(circle at bottom left, rgba(#2980b9, 0.6) 5%, transparent 50%)
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
