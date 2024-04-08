<script setup lang="ts">
import dayjs from 'dayjs'
import timeToNow from 'dayjs/plugin/relativeTime'

dayjs.extend(timeToNow)

const galleryOpen = ref(false)
const startImage = ref(undefined)
const folder = ref('')

const events = {
    nrutyadarpan: {
        title: 'Nrutyadarpan',
        folder: 'nrutyadarpan',
        date: dayjs().subtract(1, 'year').fromNow(),
        images: [
            'WhatsApp Image 2024-04-08 at 12.19.14_5121036f.jpg',
            'WhatsApp Image 2024-04-08 at 12.19.35_ad595ffc.jpg',
            'WhatsApp Image 2024-04-08 at 12.19.35_ad595ffc.jpg'
        ]
    }

}
</script>

<template>
    <div class="events px-8 md:px-16 lg:px-16 xl:px-32">
        <Gallery v-if="galleryOpen" @close="galleryOpen = false" :folder="folder" :startImage="startImage" />
        <LandingTitle>Events</LandingTitle>
        
        <EventPreview v-for="event in events" :title="event.title" :date="event.date" :images="event.images" :folder="event.folder" @open-gallery="data => {
            folder = event.folder
            startImage = data.start
            galleryOpen = true
        }" />

    </div>
</template>