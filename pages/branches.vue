<script setup lang="ts">
const branches = ref<any>([])
const data = await $fetch<any>('/api/branches', {
    method: 'GET'
}).catch(err => console.log(err))
branches.value = data.branches

console.log(branches.value);
const navbarStore = useNavbarStore()


</script>

<template>
<NuxtLayout name="starry" footer="simply">
    <div class="founder__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center mt-32">
        <h1 class="founder__title--main text-4xl md:text-6xl font-serif">Branches</h1>
        <h3 class="founder__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Explore our vibrant dance community across multiple locations. Find the nearest branch to you and join us in experiencing the joy of dance.</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-[90%] mx-auto mt-8 mb-16">
        <div v-for="branch in branches" class="rounded overflow-hidden text-white group">
            <div class="aspect-video overflow-hidden">
                <img :src="branch.coverPhoto" class="object-contain group-hover:scale-110 transition-all" loading="lazy" />
            </div>
            <div class="text-center">

                <p class="text-2xl font-bold my-2">{{ branch.name }}</p>
                <p class="w-3/4 mx-auto capitalize">{{ branch.address }}</p>
            </div>
             <div class="flex items-center justify-center text-white my-2">
            
                     <div class="flex items-start justify-center text-black">
                <div class="rounded overflow-hidden bg-white mx-2 text-center flex flex-col" v-for="[day, timings] in Object.entries(branch.days)">
                    <p class="w-full bg-red-500 text-white uppercase">{{ day.slice(0, 3) }}</p>
                    <p class="mb-2" v-for="time in timings">{{ time }}</p>
                </div>

            </div>
            </div>
           
        </div>
    </div>
    <h3 class="text-center text-2xl"><span class="underline cursor-pointer" @click="() => {
        navbarStore.setJoinScroll(true)
        navigateTo('/')
    }">Join</span> us today!</h3>
</NuxtLayout>
</template>

<style lang="stylus">
gradients = { position: 'top left', color: accentColor, opacity: 0.6, size: 5%, transparent: 20% },
            { position: 'right center', color: accentBlue, opacity: 0.6, size: 5%, transparent: 40% },
            { position: 'bottom left', color: accentColor, opacity: 0.6, size: 2%, transparent: 20% }

.index-branches
    background gradients_to_bg(gradients)

</style>