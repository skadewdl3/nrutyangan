<script setup lang="ts">
const filesResponse = await useFetch<Array<string>>('/api/imageList')

type FileType = {
    name: string,
    url: string | null,
    error: string | null
}

const files = ref<Array<FileType>>(filesResponse.data.value?.map(x => ({name: x, url: null, error: null})) || [])


let start = ref(0)
let count = 3

const fetchURLs = async () => {
    console.log('start now is', start.value);
    let names = files.value.slice(start.value, (start.value + count) > files.value.length ? files.value.length : start.value + count).map(x => (x.url ? null : x.name))

    await $fetch<Array<string>>('/api/imageURL', {
        method: 'POST',
        body: {names}
    }).then(urls => {
        for (let i = start.value; i < start.value + count; i++) {
            if (i > files.value.length - 1) {
                break
            }
            if (files.value[start.value + i].url) {
                continue
            }
            files.value[start.value + i].url = urls[i]
            console.log('loaded image', start.value + i);
        }
        
    }).catch(err => {
        for (let i = start.value; i < start.value + count; i++) {
            if (i > files.value.length - 1) {
                break
            }
            files.value[start.value + i].error = err
        }
        
    })
    
}

watch(start, fetchURLs, {immediate: true})

</script>

<template>
    <div class="gallery">
        <div class="gallery__controls sticky top-[10rem] left-0">
            <Button @click="start = (start + 1) % files.length">Next</Button>
            <Button @click="start = (start - 1 < 0) ? files.length - 1 : start - 1">Prev</Button>
        </div>
        <div class="gallery__image">
            <img class="w-1/3" v-if="files[start].url" :src="files[start].url || ''" :alt="files[start].name">
        </div>
        
    </div>    
</template>