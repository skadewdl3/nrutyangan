<script setup lang="ts">
const {testimonials, start, count} = defineProps({
    testimonials: {
        type: Array<{stars: Number, date: String, content: String, author: String}>,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    count: {
        type: Number, 
        required: true
    }
})

const emit = defineEmits(['prev', 'next'])

</script>

<template>
    <div class="testimonials__wrapper">
        <div class="testimonials__items__container w-full grid" :class="`grid-cols-${count}`">
            <div v-for="(testimonial, i) in testimonials.slice(start, start + count)" class="testimonial__item w-full px-8 md:px-16 xl:px-32">
                <div class="flex items-center justify-between">
                    <Stars class="text-2xl" :stars="testimonials[i].stars as number" />
                    <span>{{ testimonial.date }}</span>
                </div>
                <p class="text-justify">{{ testimonial.content }}</p>
                <p class="capitalize font-bold text-pink-400">- {{ testimonial.author }}</p>
            </div>
        </div>
        <div class="flex items-center justify-center w-full" v-if="count != testimonials.length">
              <Icon name="material-symbols-light:chevron-left" class="text-4xl cursor-pointer" :class="{'text-gray-300':!(start > 0)}"  @click="emit('prev')" />
            <span v-if="count != 1" class="mx-8">{{ start + 1 }} - {{ start + count }} / {{ testimonials.length }}</span>
            <span v-else>{{ start + 1 }} / {{ testimonials.length }}</span>
              <Icon name="material-symbols-light:chevron-right" class="text-4xl cursor-pointer" :class="{'text-gray-300': !(start + count < testimonials.length)}" @click="emit('next')"/>
        </div>
    </div>
</template>