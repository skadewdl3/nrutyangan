<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import validatorModule from 'validator'

const { signOut, data }: { data: any, signOut: Function } = useAuth()
const { firstName: fn, lastName: ln, course } = data.value.session

const firstName = ref(fn)
const lastName = ref(ln)

const editable = ref(false)

const save = () => {
    editable.value = false
}



const logout = () => {
    signOut({
        redirect: true,
        callbackUrl: '/auth'
    })
}
</script>
:default="lastName"
<template>
    <div class="dashboard__wrapper w-full h-screen flex items-center justify-center">
        <Button class="absolute top-5 right-5" @click="logout">Sign Out</Button>
        <div class="dashboard w-2/3">
            <div class="card flex items-center justify-between">
                <div>
                    <Icon class="text-[10rem]" name="carbon:user-avatar" />
                    <Label class="text-4xl ml-4">{{ firstName }} {{ lastName }}</Label>
                </div>

                <Button v-if="!editable" @click="editable = true" >
                    <Icon name="material-symbols:edit-outline" class="mr-2"/>Edit
                </Button>
                <Button v-else @click="save" >
                    <Icon name="material-symbols:edit-outline" class="mr-2"/>Save
                </Button>
            </div>
            <div class="card">
                <Input :disabled="!editable" v-model="firstName" placeholder="First Name" :validator="(val: string) => !validatorModule.isEmpty(val)" />
                <Input :disabled="!editable" v-model="lastName" placeholder="Last Name" type="text" :validator="(val: string) => !validatorModule.isEmpty(val)" />
            </div>
            <div class="card" v-if="course">
                <p>Course: {{ course.name }}</p>
                <p>Location: {{ course.location }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">

</style>