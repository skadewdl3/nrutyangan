<script setup lang="ts">
const filesResponse = await useFetch<Array<string>>('/api/imageList')

type FileType = {
  name: string
  url: string | null
  error: string | null
}

const files = ref<Array<FileType>>(
  filesResponse.data.value?.map(x => ({ name: x, url: null, error: null })) ||
    []
)

let start = ref(0)
let count = 3

const fetchURLs = async () => {
  let names = files.value
    .slice(
      start.value,
      start.value + count > files.value.length
        ? files.value.length
        : start.value + count
    )
    .filter(x => !x.url)
    .map(x => x.name)

  $fetch<Array<string>>('/api/imageURL', {
    method: 'POST',
    body: { names },
  })
    .then(async urls => {
      let j = 0
      for (let i = 0; i < files.value.length; i++) {
        if (i < start.value && i > start.value + count) {
          files.value[i].url = null
          files.value[i].error = null
        }
      }
      for (
        let i = start.value;
        i < start.value + count && j < urls.length;
        i++
      ) {
        if (i > files.value.length - 1) {
          break
        }
        if (files.value[i].url) {
          continue
        }
        files.value[i].url = urls[j]

        // fetch the url to cache it for faster viewing
        fetch(urls[j], { mode: 'no-cors' })
        j++
      }
    })
    .catch(err => {
      for (let i = start.value; i < start.value + count; i++) {
        if (i > files.value.length - 1) {
          break
        }
        files.value[i].error = err
      }
    })
}

watch(start, fetchURLs, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <div
      class="gallery w-full h-screen absolute top-0 left-0 bg-black/90 z-[100]"
    >
      <div
        class="hidden md:flex gallery__controls fixed top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-between text-white"
      >
        <button
          class="bg-black/60 rounded text-2xl p-4 active:translate-y-1 transition-all"
          @click="() => {
              console.log(start);
            start = start == 0 ? files.length - 1 : start - 1
              console.log(files.length - 1);
            
          }"
        >
          <Icon name="material-symbols:arrow-back-rounded" />
        </button>
        <button
          class="bg-black/60 rounded text-2xl p-4 active:translate-y-1 transition-all"
          @click="start = (start + 1) % files.length"
        >
          <Icon name="material-symbols:arrow-forward-rounded" />
        </button>
      </div>
      <div class="gallery__image w-full h-full grid place-items-center">
        <img
          class="h-screen object-contain"
          :src="files[start].url || ''"
          :alt="files[start].name"
        />
      </div>
      <div
        class="gallery__pagination fixed bottom-0 left-1/2 -translate-x-1/2 flex items-center bg-black/60"
      >
        <button
          class="md:hidden text-white bg-black/60 rounded text-xl p-2 active:translate-y-1 transition-all"
          @click="() => {
              console.log(start);
            start = start == 0 ? files.length - 1 : start - 1
              console.log(files.length - 1);
            
          }"
        >
          <Icon name="material-symbols:arrow-back-rounded" />
        </button>

        <p class="text-white text-lg py-2 md:pr-4">
          <span class="inline md:hidden">{{ start + 1 }}</span>
          <input
            type="number"
            class="hidden md:inline bg-transparent w-10 text-white text-center"
            :value="start + 1"
            @input="e => {
                    let val = parseInt((e.target as HTMLInputElement).value) - 1
                    if (Number.isNaN(val)) return
                    if (!(val > files.length || val < 0)) start = val
                    }"
          />

          / {{ files.length }}
        </p>

        <button
          class="md:hidden text-white rounded text-xl p-2 active:translate-y-1 transition-all"
          @click="start = (start + 1) % files.length"
        >
          <Icon name="material-symbols:arrow-forward-rounded" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button,
input[type='number'] {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield !important;
}
</style>
