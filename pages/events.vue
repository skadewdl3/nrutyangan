<script setup lang="ts">
import dayjs from 'dayjs'
import timeToNow from 'dayjs/plugin/relativeTime'

dayjs.extend(timeToNow)

const galleryOpen = ref(false)
</script>

<template>
    <div class="events px-32">
        <Gallery v-if="galleryOpen" @close="galleryOpen = false" />
        <LandingTitle>Events</LandingTitle>
        <div class="event">
            <EventTitle :date="dayjs().subtract(1, 'year').fromNow()">Nrutyadarpan</EventTitle>    
            <div class="event__images grid grid-cols-[2fr_1fr] h-[30rem] gap-4">
                <div class="event__image-left bg-gray-800 w-full h-full cursor-pointer" @click="galleryOpen = true"></div>
                <div class="event__image-right grid grid-rows-2 gap-4">
                    <div class="event__image-top bg-gray-800 w-full h-full cursor-pointer" @click="galleryOpen = true"></div>
                    <div class="event__image-bottom bg-gray-800 w-full h-full cursor-pointer" @click="galleryOpen = true"></div>
                </div>
            </div>
        </div>
    </div>
</template>