<script setup lang="ts">
const props = defineProps({
    span: {
        type: String,
        required: false,
        default: 'full'
    },
    count: {
        type: Number,
        required: false,
        default: 100
    }
})

const { width, height } = useWindowSize()
let stars = ref<Array<{ x: number; y: number; type: number }>>([])
var generateStars = () => {
  for (let i = 0; i < props.count; i++) {
    let x = Math.random()
    let y = Math.random()
    var type = Math.floor(Math.random() * 3 + 1)
    let reducedWidth: number = width.value - 50


    let star = {
      x: reducedWidth * x,
      y: height.value * y,
      type,
    }
    switch (props.span) {
        case 'full':
            break
        case 'top':
            star.y = star.y / 2
            break
        case 'bottom':
            star.y = star.y / 2 + height.value / 2
            break
        case 'left':
            star.x = star.x / 2
            break
        case 'right':
            star.x = width.value -  (reducedWidth / 2) * x
            break    
    }
    stars.value.push(star)
  }
}

onMounted(() => {
  generateStars()
})

</script>

<template>
      <div class="stars sticky top-0 left-0 w-full z-[-1]">
        <div
          v-for="star in stars"
          :class="`absolute bg-white star star-type${star.type}`"
          :style="{ top: star.y + 'px', left: star.x + 'px' }"
        ></div>
      </div>
</template>

<style lang="stylus">
.star-type1
  width 1px
  height 1px
  border-radius 2px
  box-shadow 0 0 1px 1px white
  animation twinkle_one 3s ease-in-out infinite

.star-type2
  width 2px
  height 2px
  border-radius 2px
  box-shadow 0 0 2px 1px white
  animation twinkle_two 12s ease-in-out infinite

.star-type3
  width 2px
  height 2px
  border-radius 2px
  box-shadow 0 0 2px 0 white
  animation twinkle_three 7s ease-in-out infinite


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
</style>