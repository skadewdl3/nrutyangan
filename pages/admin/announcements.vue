<script setup lang="ts">
let announcements = ref()
let selected = ref(-1)

const title = ref('')
const description = ref('')

const updateAnnouncements = async () => {
    let data = await $fetch<any>('/api/announcements', {
        method: 'GET'
    })
    // @ts-ignore
    announcements.value = data.announcements
}



const setSelected = (index: number) => {
    selected.value = index
    if (index < announcements.value.length) {
        title.value = announcements.value[index].title
        description.value = announcements.value[index].description
    }
}

const save = async () => {
    if (selected.value == announcements.value.length) {
        let data = await $fetch<any>('/api/announcements', {
            method: 'POST',
            body: {
                title: title.value,
                description: description.value,
                date: Date.now().toString()
            }
        })
    }
    else {
        let data = await $fetch<any>('/api/announcements', {
            method: 'PUT',
            body: {
                id: announcements.value[selected.value]._id,
                updates: {
                    title: title.value,
                    description: description.value
                }
            }
        })
        
    }
        selected.value = -1

    updateAnnouncements()
}



const deleteAnnouncement = async (index: number) => {
    let data = await $fetch<any>(`/api/announcements`, {
        method: 'DELETE',
        query: {
            id: announcements.value[index]._id
        }
    })
    updateAnnouncements()
}

const removeSelected = () => {
    selected.value = -1
    title.value = ''
    description.value = ''
}

updateAnnouncements()

</script>

<template>
    <div class="admin-announcements grid grid-cols-3 gap-4 cursor-pointer relative w-full h-full">
        <div v-if="selected != -1" class="announcement-editor absolute top-0 left-1/2 -translate-x-1/2 w-3/4 z-[2]">
            <div class="mx-auto grid place-items-center ">
                <span class="text-4xl font-serif">{{ selected == announcements.length ? 'Add Announcement' : 'Edit Announcement' }}</span>
                <Input class="w-1/2 "  placeholder="Title" v-model="title" />
                <Input class="w-1/2 " :multiline="true" placeholder="Content" v-model="description" />
                <div class="flex items-center justify-center">
                    <Button class="mr-2" type="secondary" @click="removeSelected">Cancel</Button>
                    <Button @click="save">Save</Button>
                </div>
            </div>
        </div>
        
        <template v-else>
            <div class="announcement p-8 rounded group relative" v-for="(item, i) in announcements">
                <div class="hover-overlay opacity-0 group-hover:opacity-100 flex flex-col transition-all bg-white/70 absolute top-0 left-0 w-full h-full border-dashed border-2 border-white/70 rounded text-black items-center justify-center">
                    <span class="flex" @click="setSelected(i)">
                        <Icon class="text-2xl mr-2" name="material-symbols:edit" />
                        <span class="text-xl my-auto">Edit</span>
                    </span>
                    <span class="flex text-red-500" @click="deleteAnnouncement(i)">
                        <Icon class="text-2xl mr-2" name="material-symbols:delete-outline" />
                        <span class="text-xl my-auto">Remove</span>
                    </span>
                </div>
                <div class="announcement-header flex items-center justify-between">
                    <h2 class="announcement-title font-bold font-heading text-2xl">{{ item.title }}</h2>
                    <div class="announcement-date text-center text-sm text-gray-500 flex items-center justify-between flex-col bg-white font-bold">
                        <span class="bg-red-800 uppercase p-2 text-white font-heading">{{ item.month }}</span>
                        <span class="pb-2 text-black font-serif">{{ item.date }}</span>
                    </div>

                </div>

                <p class="announcements-card-title--text text-xl font-thin">{{ item.description }}</p>
            </div>
            <div class="announcement-add p-8 rounded flex items-center justify-center border-dashed border-2 border-white/60 hover:border-white/90 cursor-pointer transition-all" @click="setSelected(announcements.length)">
                <Icon class="text-2xl mr-2" name="material-symbols:add-circle-outline" />
                <span class="text-xl my-auto">Add Announcement</span>
            </div>
        </template>
    </div>
</template>

<style lang="stylus">
.announcement, .announcement-add
    background rgba(#fff, 0.5)
    backdrop-filter blur(5px)
    color black
    
</style>