<script setup lang="ts">
let events = ref<any>([])
let selected = ref(-1)

const name = ref('')
const date = ref('')

const updateEvents = async () => {
  let data = await $fetch<any>('/api/events', {
    method: 'GET',
  })
  // @ts-ignore
  events.value = data.events
}

const setSelected = (index: number) => {
  selected.value = index
  if (index < events.value.length) {
    name.value = events.value[index].name
    date.value = events.value[index].date
  }
}

const save = async () => {
  if (selected.value == events.value.length) {
    let data = await $fetch<any>('/api/events', {
      method: 'POST',
      body: {
        name: name.value,
        date: date.value,
      },
    })
  } else {
    let data = await $fetch<any>('/api/events', {
      method: 'PUT',
      body: {
        id: events.value[selected.value]._id,
        updates: {
          name: name.value,
          date: date.value,
        },
      },
    })
  }
  selected.value = -1

  updateEvents()
}

const deleteEvent = async (index: number) => {
  let data = await $fetch<any>(`/api/events`, {
    method: 'DELETE',
    query: {
      id: events.value[index]._id,
    },
  })
  updateEvents()
}

const removeSelected = () => {
  selected.value = -1
  name.value = ''
  date.value = ''
}

updateEvents()
</script>

<template>
  <div
    class="admin-events grid grid-cols-3 gap-4 cursor-pointer relative w-full h-full"
  >
    <div
      v-if="selected != -1"
      class="event-editor absolute top-0 left-1/2 -translate-x-1/2 w-3/4 z-[2]"
    >
      <div class="mx-auto grid place-items-center">
        <span class="text-4xl font-serif">{{
          selected == events.length ? 'Add Event' : 'Edit Event'
        }}</span>
        <Input class="w-1/2" placeholder="Name" v-model="name" />
        <div class="flex items-center justify-center">
          <Button class="mr-2" type="secondary" @click="removeSelected"
            >Cancel</Button
          >
          <Button @click="save">Save</Button>
        </div>
      </div>
    </div>

    <template v-else>
      <div
        @click="setSelected(i)"
        class="event my-4 self-end xl:self-center justify-self-center bg-white text-black md:w-[90%] rounded-md overflow-hidden cursor-pointer w-full h-full"
        v-for="(event, i) in events"
      >
        <div class="overflow-hidden">
          <img
            class="transition-all"
            loading="lazy"
            :src="event.coverPhoto"
            alt=""
          />
        </div>
        <div class="px-4 py-2">
          <div class="event-name text-2xl">{{ event.name }}</div>
          <div class="event-name text-xm text-gray-800">{{ event.date }}</div>
        </div>
      </div>
      
      <div
        class="event-add p-8 rounded flex items-center justify-center border-dashed border-2 border-white/60 hover:border-white cursor-pointer transition-all"
        @click="setSelected(events.length)"
      >
        <Icon
          class="text-2xl mr-2"
          name="material-symbols:add-circle-outline"
        />
        <span class="text-xl my-auto">Add Event</span>
      </div>
    </template>
  </div>
</template>

<style lang="stylus">
.event, .event-add
    background rgba(#fff, 0.6)
    backdrop-filter blur(5px)
    color black

.event
  img
    &:hover
      transform scale(1.2) 
</style>
