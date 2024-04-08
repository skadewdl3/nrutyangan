<script setup lang="ts">
const galleryOpen = ref(false)
</script>

<template>
    <div class="test px-32">
        <Gallery v-if="galleryOpen" @close="galleryOpen = false" folder="images" />
        <Button @click="galleryOpen = true">Open Gallery</Button>
    </div>
</template>