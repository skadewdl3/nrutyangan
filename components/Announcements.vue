<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const breakpoints = useBreakpoints(breakpointsTailwind)

const sm = breakpoints.greaterOrEqual('sm')
const md = breakpoints.greaterOrEqual('md')
const lg = breakpoints.greaterOrEqual('lg')
const xl = breakpoints.greaterOrEqual('xl')

console.log(sm.value, md.value, lg.value, xl.value);



const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

const announcements = [
    {
        title: 'New Classes',
        date: dayjs('01-09-2021', 'DD-MM-YYYY'),
        content: 'We are excited to announce the launch of our new classes! Join us in exploring new dance styles and techniques. Register now and get a special discount on your first class.',
    },
    {
        title: 'Workshops',
        date: dayjs('15-09-2021', 'DD-MM-YYYY'),
        content: 'Join us for our upcoming workshops and masterclasses. Learn from the best instructors and take your dance skills to the next level. Limited slots available, so book your spot now!',
    },
    {
        title: 'Special Offers',
        date: dayjs('01-08-2021', 'DD-MM-YYYY'),
        content: 'Avail of our special offers and promotions this month. Get discounts on class packages, exclusive access to events, and freebies when you refer a friend. Don\'t miss out on these amazing deals!',
    },
]

console.log(announcements[0].date);

const count = computed(() => {
    if (xl.value) return 3
    if (md.value) return 2
    return 1
})
</script>

<template>
    <div class="announcements h-screen grid">
        <div class="announcements__container place-self-center">
            <div class="announcements__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center md:mt-32 xl:mt-0">
                <h1 class="announcements__title--main text-4xl md:text-6xl font-serif">Announcements</h1>
                <h3 class="announcements__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Stay updated with the latest news, events, and important announcements. Be the first to know about new classes, workshops, and special offers.</h3>
            </div>

            <div class="announcements-content w-[90%] lg:w-[80%] xl:w-[60%] mx-auto grid-cols-1 grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-black mt-16">

                <div v-for="item in announcements.slice(0, count)" class="announcement flex flex-col px-8 py-4">
                    
                    
                    <div class="announcement-header flex items-center justify-between">
                        <h2 class="announcement-title font-bold font-heading text-2xl">{{ item.title }}</h2>
                        <div class="announcement-date text-center text-sm text-gray-500 flex items-center justify-between flex-col bg-white font-bold">
                            <span class="bg-red-800 uppercase p-2 text-white font-heading">{{ months[item.date.month()] }}</span>
                            <span class="pb-2 text-black font-serif">{{ item.date.date() + 1 }}</span>
                        </div>

                    </div>

                    <p class="announcements-card-content--text text-xl font-thin">{{ item.content }}</p>
                </div>

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