<script setup lang="ts">
const { title, date, images, folder } = defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  images: {
    type: Array<String>,
    required: true,
  },
  folder: {
    type: String,
    required: true,
  }
})




const result = await $fetch('/api/imageURL', {
  method: 'POST',
  body: {
    names: images.map(name => `${folder}/${name}`),
  },
  cache: 'no-cache',
})

console.log(result);


const urls = result || []
console.log(urls);


const emit = defineEmits(['openGallery'])
</script>

<template>
  <div class="event">
    <div class="event-title">
      <h1 class="text-4xl xl:text-5xl text-left font-bold">{{ title }}</h1>
      <h4 class="text-xl xl:text-2xl font-thin" v-if="date">{{ date }}</h4>
    </div>
    <div
      class="event__images grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4"
    >
      <div
        class="event__image-left bg-gray-800 w-full cursor-pointer "
        @click="emit('openGallery', { start: images[0] })"
      >
        <img  :src="urls[0] || ''" loading="lazy" :alt="images[0] as string" />
      </div>
      <div class="hidden event__image-right lg:grid grid-rows-2 gap-4">
        <div
          class="event__image-top bg-gray-800 w-full h-full cursor-pointer"
          @click="emit('openGallery', { start: images[1] })"
        >
          <img class="w-full object-cover" :src="urls[1] || ''" loading="lazy" :alt="images[0] as string" />
        </div>
        <div
          class="event__image-bottom bg-gray-800 w-full h-full cursor-pointer"
          @click="emit('openGallery',{ start: images[2] })"
        >
          <img class="h-full object-cover" :src="urls[2] || ''" loading="lazy" :alt="images[0] as string" />
        </div>
      </div>
    </div>
  </div>
</template>
