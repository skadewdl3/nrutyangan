<script setup lang="ts">
import { isEmail, isStrongPassword, isEmpty, isAlphanumeric } from 'validator'
let users = ref()
let selected = ref(-1)

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const reset = ref(false)
const auth = useAuth()
const loading = ref(false)

const updateUsers = async () => {
    let data = await $fetch<any>('/api/users', {
        method: 'GET'
    })
    // @ts-ignore
    users.value = data.users
}



const setSelected = (index: number) => {
    selected.value = index
    if (index < users.value.length) {
        firstName.value = users.value[index].firstName
        lastName.value = users.value[index].lastName
        email.value = users.value[index].email
        password.value = users.value[index].password
    }
}

const save = async () => {
    loading.value = true
    if (selected.value == users.value.length) {
        let data = await auth.signUp({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        }, {
            redirect: false
        }).catch(err => console.log(err))
    }
    else {
        let data = await $fetch<any>('/api/users', {
            method: 'PUT',
            body: {
                updates: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value,
                    resetPassword: reset.value
                }
            }
        })
        console.log(data);
        
        
    }
    selected.value = -1
    loading.value = false

    updateUsers()
}


const deleteUser = async (index: number) => {
    let data = await $fetch<any>(`/api/users`, {
        method: 'DELETE',
        query: {
            email: users.value[index].email
        }
    })
    console.log(data);
    
    updateUsers()
}

const removeSelected = () => {
    selected.value = -1
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
}

const setReset = (value: boolean) => {
    reset.value = value
    if (reset.value) {
        password.value = ''
    }
}

updateUsers()
</script>

<template>
    <div class="admin-users flex flex-col items-start justify-start gap-4 cursor-pointer relative w-full h-full">
        <div v-if="selected != -1" class="user-editor absolute top-0 left-1/2 -translate-x-1/2 w-3/4 z-[2]">
            <div class="mx-auto grid place-items-center ">
                <span class="text-4xl font-serif">{{ selected == users.length ? 'Add User' : 'Edit User' }}</span>
                <Input class="w-1/2 "  placeholder="First Name" v-model="firstName" />
                <Input class="w-1/2 "  placeholder="Last Name" v-model="lastName" />
                <Input :validator="isEmail" type="email" class="w-1/2 "  placeholder="Email" v-model="email" />
                <Input v-if="selected == users.length" :validator="isStrongPassword" type="password" class="w-1/2 "  placeholder="Password" v-model="password" />

                <template v-else>
                    <span @click="setReset(true)" class="w-full text-yellow-600">Reset Password ?</span>
                    <Input v-if="reset" :validator="isStrongPassword" type="password" class="w-1/2 "  placeholder="New Password" v-model="password" />
                </template>

                <div class="flex items-center justify-center">
                    <Button class="mr-2" :type="loading ? 'disabled' : 'secondary'" @click="removeSelected">Cancel</Button>
                    <Button @click="save" :type="loading ? 'disabled' : 'primary'">Save</Button>
                </div>
            </div>
        </div>
        
        <template v-else>
            <div v-for="(user, i) in users" class="user w-full flex items-center justify-between bg-white/80 text-black px-4 py-2 rounded mb-2">
                <span>{{ i + 1 }}. {{ user.firstName }} {{ user.lastName }}</span>

                <div class="flex items-center justify-end text-2xl">
                    <Icon class="mr-2" name="material-symbols:edit" @click="setSelected(i)" />
                    <Icon class="text-red-500" name="material-symbols:delete-outline" @click="deleteUser(i)" />
                </div>
            </div>
            <div class="user w-full flex items-center justify-center bg-white/20 border-dashed border-2 border-white/50 hover:border-white px-4 py-2 rounded mb-2 text-white" @click="setSelected(users.length)">
                <Icon class="text-2xl mr-2" name="material-symbols:add-circle-outline" />
                <span>Add User</span>

            </div>

        </template>
    </div>
</template>

<style lang="stylus">
</style>