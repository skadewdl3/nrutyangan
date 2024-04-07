<script setup lang="ts">
const files = await useFetch('/api/imageList')

console.log(files.data.value);

</script>

<template>
    
</template>