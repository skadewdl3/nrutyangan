<script setup lang="ts">
let { data } = await useFetch<any>('/api/testimonials', {
    method: 'GET'
})

let testimonials = ref(data.value.testimonials)
</script>

<template>
    <div class="admin-testimonials grid grid-cols-3 gap-4 cursor-pointer">
        
        <div class="testimonial p-8 rounded group relative" v-for="item in testimonials">
            <div class="hover-overlay opacity-0 group-hover:opacity-100 flex transition-all bg-white/70 absolute top-0 left-0 w-full h-full border-dashed border-2 border-white/70 rounded text-black items-center justify-center">
                <Icon class="text-2xl mr-2" name="material-symbols:add-circle-outline" />
                <span class="text-xl my-auto">Edit Testimonial</span>
            </div>
            <div class="testimonial-header flex items-center justify-between">
                <Stars :count="item.stars" />
                <span>{{ item.date }}</span>
            </div>
            <div class="testimonial-content">{{ item.content }}</div>
            <div class="testimonial-author capatalize font-bold text-pink-400">- {{ item.author }} </div>
        </div>
        <div class="testimonial-add p-8 rounded flex items-center justify-center border-dashed border-2 border-white/60 hover:border-white/90 cursor-pointer transition-all">
            <Icon class="text-2xl mr-2" name="material-symbols:add-circle-outline" />
            <span class="text-xl my-auto">Add Testimonial</span>
        </div>
    </div>
</template>

<style lang="stylus">
.testimonial, .testimonial-add
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    
</style>