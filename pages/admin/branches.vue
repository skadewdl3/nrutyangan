<script setup lang="ts">
const branches = ref<any>([])
const data = await $fetch<any>('/api/branches', {
  method: 'GET',
}).catch(err => console.log(err))
branches.value = data.branches

const selected = ref(-1)
const name = ref('')
const address = ref('')


const updateBranches = async () => {
  let data = await $fetch<any>('/api/branches', {
    method: 'GET',
  })
  // @ts-ignore
  branches.value = data.branches
}

const setSelected = (index: number) => {
  selected.value = index
  if (index < branches.value.length) {
    name.value = branches.value[index].name
    address.value = branches.value[index].address
  }
}

const save = async () => {
  if (selected.value == branches.value.length) {
    let data = await $fetch<any>('/api/branches', {
      method: 'POST',
      body: {
        name: name.value,
        address: address.value,
      },
    })
  } else {
    let data = await $fetch<any>('/api/branches', {
      method: 'PUT',
      body: {
        id: branches.value[selected.value]._id,
        updates: {
          name: name.value,
          address: address.value,
        },
      },
    })
  }
  selected.value = -1

  updateBranches()
}

const deleteBranch = async (index: number) => {
  let data = await $fetch<any>(`/api/branches`, {
    method: 'DELETE',
    query: {
      id: branches.value[index]._id,
    },
  })
  updateBranches()
}

const removeSelected = () => {
  selected.value = -1
  name.value = ''
  address.value = ''
}
</script>
<template>
  <div class="admin-branches grid grid-cols-3 gap-8 relative">
    <div
      v-if="selected != -1"
      class="branch-editor absolute top-0 left-1/2 -translate-x-1/2 w-3/4 z-[2]"
    >
      <div class="mx-auto grid place-items-center">
        <span class="text-4xl font-serif">{{
          selected == branches.length ? 'Add Branch' : 'Edit Branch'
        }}</span>
        <Input class="w-1/2" placeholder="Name" v-model="name" />
        <Input
          class="w-1/2"
          :multiline="true"
          placeholder="Address"
          v-model="address"
        />
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
        v-for="(branch, i) in branches"
        class="rounded overflow-hidden text-white group cursor-pointer relative"
      >
        <div
          class="hover-overlay opacity-0 group-hover:opacity-100 flex flex-col transition-all bg-white/85 absolute top-0 left-0 w-full h-full border-dashed border-2 border-white/70 rounded text-black items-center justify-center"
        >
          <span class="flex" @click="setSelected(i)">
            <Icon class="text-2xl mr-2" name="material-symbols:edit" />
            <span class="text-xl my-auto">Edit</span>
          </span>
          <span class="flex text-red-500" @click="deleteBranch(i)">
            <Icon
              class="text-2xl mr-2"
              name="material-symbols:delete-outline"
            />
            <span class="text-xl my-auto">Remove</span>
          </span>
        </div>
        <div class="aspect-video overflow-hidden">
          <img
            :src="branch.coverPhoto"
            class="object-contain transition-all"
            loading="lazy"
          />
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold my-2">{{ branch.name }}</p>
          <p class="w-3/4 mx-auto capitalize">{{ branch.address }}</p>
        </div>
        <div class="flex items-center justify-center text-white my-2">
          <div class="flex items-start justify-center text-black">
            <div
              class="rounded overflow-hidden border-solid border-2 border-white/60 text-white mx-2 text-center flex flex-col"
              v-for="[day, timings] in Object.entries(branch.days)"
            >
              <p class="w-full bg-white/60 uppercase text-black">
                {{ day.slice(0, 3) }}
              </p>
              <p class="mb-2 text-sm" v-for="time in timings">{{ time }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="branch-add p-8 rounded flex items-center justify-center border-dashed border-2 border-white/60 hover:border-white/90 cursor-pointer transition-all"
        @click="setSelected(branches.length)"
      >
        <Icon
          class="text-2xl mr-2"
          name="material-symbols:add-circle-outline"
        />
        <span class="text-xl my-auto">Add Branch</span>
      </div>
    </template>
  </div>
</template>
