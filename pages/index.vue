<script setup lang="ts">
const home = ref(null)
const {width, height} = useElementSize(home)
let stars = ref<Array<{x: number, y: number, type: number}>>([])
var generateStars = function(){
    for(let i = 0; i < 50; i++) {
        let x = Math.random();
        let y = Math.random();
        var type = Math.floor((Math.random() * 3) + 1);
        stars.value.push({
            x : width.value - (width.value / 2) * x,
            y : height.value * y,
            type
        })
    }
};

onMounted(() => {
    generateStars();
})
</script>

<template>
    <div ref="home" class="home w-full h-screen relative">
        <div v-for="star in stars" :class="`absolute bg-white star star-type${star.type}`" :style="{top: star.y + 'px', left: star.x + 'px'}">
            
        </div>
        <div class="hero__title text-right absolute top-1/2 right-[5%] -translate-y-1/2">
            <h1 class="text-8xl font-serif">
                Nrutyangan
            </h1>
            <h3 class="font-heading mt-8 text-2xl">Where passion meets elegance</h3>
        </div>
    </div>
</template>

<style lang="stylus">
.home
    background-image url('~/assets/hero.png'), radial-gradient(circle at top left, rgba(accentColor, 0.6) 5%, transparent 30%),  radial-gradient(circle at bottom left, rgba(#2980b9, 0.6) 5%, transparent 50%)
    background-position left bottom
    background-size 30%, 100%, 100%
    background-repeat no-repeat
    backdrop-filter blur(10px)

.star-type1{
    width: 1px;
    height: 1px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 1px 1px white;
            box-shadow: 0 0 1px 1px white;
    -webkit-animation: twinkle_one 3s ease-in-out infinite;
        -moz-animation: twinkle_one 3s ease-in-out infinite;
            -o-animation: twinkle_one 3s ease-in-out infinite;
            animation: twinkle_one 3s ease-in-out infinite;
}
.star-type2{
    width: 2px;
    height: 2px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 2px 1px white;
            box-shadow: 0 0 2px 1px white;
    -webkit-animation: twinkle_two 12s ease-in-out infinite;
        -moz-animation: twinkle_two 12s ease-in-out infinite;
            -o-animation: twinkle_two 12s ease-in-out infinite;
            animation: twinkle_two 12s ease-in-out infinite;
}
.star-type3{
    width: 2px;
    height: 2px;
    border-radius: 2px;
    -webkit-box-shadow: 0 0 2px 0 white;
            box-shadow: 0 0 2px 0 white;
    -webkit-animation: twinkle_three 7s ease-in-out infinite;
        -moz-animation: twinkle_three 7s ease-in-out infinite;
            -o-animation: twinkle_three 7s ease-in-out infinite;
            animation: twinkle_three 7s ease-in-out infinite;
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
</style>

