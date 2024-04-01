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
            <div class="testimonials__items__container grid w-full" :class="`grid-cols-${count}`">
                <div v-for="(testimonial, i) in testimonials.slice(start, start + count)" class="testimonial__item w-full" :class="{'px-8': count == 1}">
                    <div class="flex items-center justify-between">
                        <Stars class="text-2xl" :stars="testimonials[i].stars as number" />
                  <div>{{ testimonial.date }}</div>
                </div>
                <p class="text-justify">{{ testimonial.content }}</p>
              <p class="capitalize font-bold text-pink-400">- {{ testimonial.author }}</p>
            </div>
        </div>
        <div class="flex items-center justify-center w-full">
              <Icon name="material-symbols-light:chevron-left" class="text-4xl cursor-pointer" :class="{'text-gray-300':!(start > 0)}"  @click="emit('prev')" />
            <span class="mx-8">{{ start + 1 }} - {{ start + count }} / {{ testimonials.length }}</span>
              <Icon name="material-symbols-light:chevron-right" class="text-4xl cursor-pointer" :class="{'text-gray-300': !(start + count < testimonials.length)}" @click="emit('next')"/>
          </div>
        </div>
</template>