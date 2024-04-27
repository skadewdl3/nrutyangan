<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const md = breakpoints.greaterOrEqual('md')
const xl = breakpoints.greaterOrEqual('xl')


let { data } = await useFetch<any>('/api/testimonials', {
    method: 'GET'
})

let testimonials = data.value.testimonials

const count = computed(() => {
    if (xl.value) return 3
    if (md.value) return 2
    return 1
})
const start = ref(0)

const prev = () => {
    if (start.value > 0) {
        start.value -= 1
    }
}
const next = () => {
    if (start.value + count.value < testimonials.length) {
        start.value += 1
    }
}
</script>

<template>
    <div class="testimonials h-screen grid">
        <div class="testimonials__container place-self-center">
            <div class="testimonials__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center md:mt-32 xl:mt-0">
                <h1 class="testimonials__title--main text-4xl md:text-6xl font-serif">Testimonials</h1>
                <h3 class="testimonials__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Discover what our students and parents have to say about their experiences with us. Read heartwarming stories and testimonials that reflect the impact of dance in their lives.</h3>
            </div>

            <div class="testimonials-content w-[90%] lg:w-[80%] xl:w-[70%] mx-auto grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-black mt-16">
                <div class="testimonial p-8 rounded" v-for="item in testimonials.slice(start, start + count)">
                    <div class="testimonial-header flex items-center justify-between">
                        <Stars :count="item.stars" />
                        <span>{{ item.date }}</span>
                    </div>
                    <div class="testimonial-content">{{ item.content }}</div>
                    <div class="testimonial-author capatalize font-bold text-pink-400">- {{ item.author }} </div>
                </div>
            </div>
            <div class="testimonials-controls">
                <div class="flex items-center justify-center w-full" v-if="count != testimonials.length">
                  <Icon name="material-symbols-light:chevron-left" class="text-4xl cursor-pointer" :class="{'text-gray-300':!(start > 0)}" @click="prev"  />
                <span v-if="count != 1" class="mx-8">{{ start + 1 }} - {{ start + count }} / {{ testimonials.length }}</span>
                <span v-else>{{ start + 1 }} / {{ testimonials.length }}</span>
                  <Icon name="material-symbols-light:chevron-right" class="text-4xl cursor-pointer" :class="{'text-gray-300': !(start + count < testimonials.length)}" @click="next" />
            </div>
        </div>
        </div>
    </div>
</template>

<style lang="stylus">

.testimonial
    background rgba(#fff, 0.7)
    backdrop-filter blur(5px)
    
</style>