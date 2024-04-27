<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(customParseFormat)

const breakpoints = useBreakpoints(breakpointsTailwind)

const sm = breakpoints.greaterOrEqual('sm')
const md = breakpoints.greaterOrEqual('md')
const lg = breakpoints.greaterOrEqual('lg')
const xl = breakpoints.greaterOrEqual('xl')



const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

let {announcements: testimonials}: {announcements: Array<{title: string, date: any, description: string}>} = await $fetch('/api/announcements', {
    method: 'GET'
})

testimonials = testimonials.map((testimonial: any) => {
    return {
        ...testimonial,
        date: dayjs(new Date(testimonial.date))
    }
})


const count = computed(() => {
    if (xl.value) return 3
    if (md.value) return 2
    return 1
})
</script>

<template>
    <div class="testimonials h-screen grid">
        <div class="testimonials__container place-self-center">
            <div class="testimonials__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center md:mt-32 xl:mt-0">
                <h1 class="testimonials__title--main text-4xl md:text-6xl font-serif">Testimonials</h1>
                <h3 class="testimonials__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Discover what our students and parents have to say about their experiences with us. Read heartwarming stories and testimonials that reflect the impact of dance in their lives.</h3>
            </div>

            <div class="testimonials-content w-[90%] lg:w-[80%] xl:w-[70%] mx-auto grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-black mt-16">

                <div v-for="item in testimonials.slice(0, count)" class="testimonial flex flex-col px-8 py-4">
                    
                    
                    <div class="testimonial-header flex items-center justify-between">
                        <h2 class="testimonial-title font-bold font-heading text-2xl">{{ item.title }}</h2>
                        <div class="testimonial-date text-center text-sm text-gray-500 flex items-center justify-between flex-col bg-white font-bold">
                            <span class="bg-red-800 uppercase p-2 text-white font-heading">{{ months[item.date.month()] }}</span>
                            <span class="pb-2 text-black font-serif">{{ item.date.date() + 1 }}</span>
                        </div>

                    </div>

                    <p class="testimonials-card-content--text text-xl font-thin">{{ item.description }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="stylus">

.testimonial
    background rgba(#fff, 0.5)
    backdrop-filter blur(5px)
    
</style>