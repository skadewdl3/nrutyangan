<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(customParseFormat)

const breakpoints = useBreakpoints(breakpointsTailwind)

const md = breakpoints.greaterOrEqual('md')
const xl = breakpoints.greaterOrEqual('xl')



const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

let { data } = await useFetch<any>('/api/announcements', {
    method: 'GET'
})

let announcements = data.value.announcements


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
    if (start.value + count.value < announcements.length) {
        start.value += 1
    }
}
</script>

<template>
    <div class="announcements h-screen grid">
        <div class="announcements__container place-self-center">
            <div class="announcements__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center md:mt-32 xl:mt-0">
                <h1 class="announcements__title--main text-4xl md:text-6xl font-serif">Announcements</h1>
                <h3 class="announcements__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Stay updated with the latest news, events, and important announcements. Be the first to know about new classes, workshops, and special offers.</h3>
            </div>

            <div class="announcements-content w-[90%] lg:w-[80%] xl:w-[70%] mx-auto grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-black mt-16">

                <div v-for="item in announcements.slice(start, start + count)" class="announcement flex flex-col px-8 py-4">
                    
                    
                    <div class="announcement-header flex items-center justify-between">
                        <h2 class="announcement-title font-bold font-heading text-2xl">{{ item.title }}</h2>
                        <div class="announcement-date text-center text-sm text-gray-500 flex items-center justify-between flex-col bg-white font-bold">
                            <span class="bg-red-800 uppercase p-2 text-white font-heading">{{ item.month }}</span>
                            <span class="pb-2 text-black font-serif">{{ item.date }}</span>
                        </div>

                    </div>

                    <p class="announcements-card-content--text text-xl font-thin">{{ item.description }}</p>
                </div>

            </div>

            <div class="flex items-center justify-center w-full" v-if="count != announcements.length">
              <Icon name="material-symbols-light:chevron-left" class="text-4xl cursor-pointer" :class="{'text-gray-300':!(start > 0)}"  @click="prev" />
            <span v-if="count != 1" class="mx-8">{{ start + 1 }} - {{ start + count }} / {{ announcements.length }}</span>
            <span v-else>{{ start + 1 }} / {{ announcements.length }}</span>
              <Icon name="material-symbols-light:chevron-right" class="text-4xl cursor-pointer" :class="{'text-gray-300': !(start + count < announcements.length)}" @click="next"/>
        </div>
        </div>
    </div>
</template>

<style lang="stylus">

.announcements
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    transform translateY(-10%)
    clip-path polygon(0 0, 100% 10%, 100% 100%, 0 90%)

.announcement
    background rgba(#fff, 0.5)
    backdrop-filter blur(5px)
    
</style>