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

const body = ref(null)


const { width, height } = useWindowSize()
let stars = ref<Array<{ x: number; y: number; type: number }>>([])
var generateStars = function () {
  for (let i = 0; i < props.count; i++) {
    let x = Math.random()
    let y = Math.random()
    var type = Math.floor(Math.random() * 3 + 1)


    let star = {
      x: width.value * x,
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
            star.x = width.value -  (width.value / 2) * x
            break    
    }
    stars.value.push(star)
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

</script>

<template>
    <Teleport to="body">
    <Body ref="body">
        
    </Body>
      <div class="stars fixed top-0 left-0 w-full h-screen z-10">
        <div
          v-for="star in stars"
          :class="`absolute bg-white star star-type${star.type}`"
          :style="{ top: star.y + 'px', left: star.x + 'px' }"
        ></div>
      </div>
    </Teleport>
</template>