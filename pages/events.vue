<script setup lang="ts">
import dayjs from 'dayjs'
import timeToNow from 'dayjs/plugin/relativeTime'

dayjs.extend(timeToNow)

const galleryOpen = ref(false)
const startImage = ref(undefined)
const folder = ref('')

const events = [{
        title: 'Nrutyadarpan',
        folder: 'nrutyadarpan',
        date: dayjs().subtract(1, 'year').fromNow(),
        images: [
            'WhatsApp Image 2024-04-08 at 12.19.14_5121036f.jpg',
            'WhatsApp Image 2024-04-08 at 12.19.35_ad595ffc.jpg',
            'WhatsApp Image 2024-04-08 at 12.19.35_ad595ffc.jpg'
        ]
    },
    {
        title: 'Others',
        folder: 'images',
        images: [
            'IMG-20240226-WA0009.jpg',
            'IMG-20240318-WA0001.jpg',
            'IMG-20240318-WA0005.jpg'
        ]
    },
    ]
</script>

<template>
    <div class="events p-4 md:p-16 lg:p-16 xl:p-32">
        <Gallery v-if="galleryOpen" @close="galleryOpen = false" :folder="folder" :startImage="startImage" />
        <LandingTitle>Events</LandingTitle>
        
        <EventPreview v-for="event in events" :title="event.title" :date="event.date" :images="event.images" :folder="event.folder" @open-gallery="data => {
            folder = event.folder
            startImage = data.start
            galleryOpen = true
        }" />

    </div>
</template>

<style lang="stylus">
.events
    padding-top 0
</style>