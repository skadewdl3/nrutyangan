<script setup lang="ts">
let testimonials = ref()
let selected = ref(-1)

const content = ref('')
const author = ref('')

const updateTestimonials = async () => {
    let data = await $fetch<any>('/api/testimonials', {
        method: 'GET'
    })
    // @ts-ignore
    testimonials.value = data.testimonials
}



const setSelected = (index: number) => {
    selected.value = index
    if (index < testimonials.value.length) {
        content.value = testimonials.value[index].content
        author.value = testimonials.value[index].author
    }
}

const save = async () => {
    if (selected.value == testimonials.value.length) {
        let data = await $fetch<any>('/api/testimonials', {
            method: 'POST',
            body: {
                content: content.value,
                author: author.value,
                date: Date.now().toString(),
            }
        })
    }
    else {
        let data = await $fetch<any>('/api/testimonials', {
            method: 'PUT',
            body: {
                id: testimonials.value[selected.value]._id,
                updates: {
                    content: content.value,
                    author: author.value
                }
            }
        })
        
    }
        selected.value = -1

    updateTestimonials()
}



const deleteTestimonial = async (index: number) => {
    let data = await $fetch<any>(`/api/testimonials`, {
        method: 'DELETE',
        query: {
            id: testimonials.value[index]._id
        }
    })
    updateTestimonials()
}

const removeSelected = () => {
    selected.value = -1
    author.value = ''
    content.value = ''
}

updateTestimonials()
</script>

<template>
    <div class="admin-testimonials grid grid-cols-3 gap-4 cursor-pointer relative w-full h-full">
        <div v-if="selected != -1" class="testimonial-editor absolute top-0 left-1/2 -translate-x-1/2 w-3/4 z-[2]">
            <div class="mx-auto grid place-items-center ">
                <span class="text-4xl font-serif">{{ selected == testimonials.length ? 'Add Testimonial' : 'Edit Testimonial' }}</span>
                <Input class="w-1/2 " :multiline="true" placeholder="Content" v-model="content" />
                <Input class="w-1/2 " placeholder="Author" v-model="author" />
                <div class="flex items-center justify-center">
                    <Button class="mr-2" type="secondary" @click="removeSelected">Cancel</Button>
                    <Button @click="save">Save</Button>
                </div>
            </div>
        </div>
        
        <template v-else>
            <div class="testimonial p-8 rounded group relative text-black" v-for="(item, i) in testimonials">
                <div class="hover-overlay opacity-0 group-hover:opacity-100 flex flex-col transition-all bg-white/70 absolute top-0 left-0 w-full h-full border-dashed border-2 border-white/70 rounded text-black items-center justify-center">
                    <span class="flex" @click="setSelected(i)">
                        <Icon class="text-2xl mr-2" name="material-symbols:edit" />
                        <span class="text-xl my-auto">Edit</span>
                    </span>
                    <span class="flex text-red-500" @click="deleteTestimonial(i)">
                        <Icon class="text-2xl mr-2" name="material-symbols:delete-outline" />
                        <span class="text-xl my-auto">Remove</span>
                    </span>
                </div>
                <div class="testimonial-header flex items-center justify-between">
                    <Stars :count="item.stars" />
                    <span>{{ item.date }}</span>
                </div>
                <div class="testimonial-content">{{ item.content }}</div>
                <div class="testimonial-author capatalize font-bold text-pink-400">- {{ item.author }} </div>
            </div>
            <div class="testimonial-add p-8 rounded flex items-center justify-center border-dashed border-2 border-white/60 hover:border-white/90 cursor-pointer transition-all" @click="setSelected(testimonials.length)">
                <Icon class="text-2xl mr-2" name="material-symbols:add-circle-outline" />
                <span class="text-xl my-auto">Add Testimonial</span>
            </div>
        </template>
    </div>
</template>

<style lang="stylus">
.testimonial, .testimonial-add
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    
</style>