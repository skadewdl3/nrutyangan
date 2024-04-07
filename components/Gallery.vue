<script setup lang="ts">
const filesResponse = await useFetch<Array<string>>('/api/imageList')

type FileType = {
    name: string,
    url: string | null,
    error: string | null,
    src: any
}

const files = ref<Array<FileType>>(filesResponse.data.value?.map(x => ({name: x, url: null, error: null, src: null})) || [])


let start = ref(0)
let count = 3

const fetchURLs = async () => {
    let names = files.value.slice(start.value, (start.value + count) > files.value.length ? files.value.length : start.value + count).filter(x=> !x.url).map(x => x.name)

    $fetch<Array<string>>('/api/imageURL', {
        method: 'POST',
        body: {names}
    }).then(async urls => {
        let j = 0
        for (let i = start.value; i < start.value + count && j < urls.length; i++) {
            if (i > files.value.length - 1) {
                break
            }
            if (files.value[start.value + i].url) {
                continue
            }
            files.value[start.value + i].url = urls[j]
            
            fetch(urls[j], { mode: 'no-cors' }).then(function(response) {
                return response.blob();
            }).then(function(myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                files.value[start.value + i].src = objectURL;
            });
            j++
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
    <Teleport to="body">
        <div class="gallery w-full h-screen absolute top-0 left-0 bg-black/50 z-[100]">
            <div class="gallery__controls sticky top-[10rem] left-0">
                <Button @click="start = (start + 1) % files.length">Next</Button>
                <Button @click="start = (start - 1 < 0) ? files.length - 1 : start - 1">Prev</Button>
            </div>
            <div class="gallery__image">
                <img class="w-1/3" :src="files[start].url || ''" :alt="files[start].name">
            </div>
            
        </div>    
    </Teleport>
</template>