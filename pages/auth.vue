<script setup lang="ts">
    definePageMeta({
        middleware: ['auth'],
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/secret'
        }
    })

    import { isEmpty } from 'validator'


    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    
    
    const mode = ref('register')
    
    const days = [...Array(31).keys()].map(i => i + 1)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const years = [...Array(70).keys()].map(i => new Date().getFullYear() - i)

    const day = ref(new Date().getDate())
    const monthString = ref(months[new Date().getMonth()])
    const month = computed(() => months.findIndex(m => m == monthString.value))
    const year = ref(new Date().getFullYear())
    const dob = computed(() => new Date(year.value, month.value, day.value))    

    const { signIn, signUp } = useAuth()

    const login = async () => {
        let res = await signIn({
            firstName: 'Soham',
            lastName: 'Karandikar'
        }, {
            redirect: true,
            callbackUrl: '/secret'
        })
    }

    const register = async () => {
        // let res = await signUp({
        //     email: 'sohamk10@gmail.com',
        //     password: 'apssword',
        // }, {
        //     redirect: false
        // })
        // console.log(res)
    }

</script>

<template>
    <div class="auth__wrapper w-full h-screen flex items-center justify-center bg-primary">
        <div v-if="mode == 'login'" class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <Label class="mx-auto text-4xl">Login</Label>
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            
            <Button>Login</Button>
            <Label>
                Don't have an account yet?
                <span @click="mode = 'register'" class="text-blue-700 font-bold cursor-pointer">Register now!</span>
            </Label>
        </div>
         <div v-else class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <Label class="mx-auto text-4xl">Register</Label>
            <Input v-model="firstName" placeholder="First Name" type="text" :validator="(x: string) => !isEmpty(x)" />
            <Input v-model="lastName" placeholder="Last Name" type="text" :validator="(x: string) => !isEmpty(x)" />
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            <Label class="mt-4">Select date of birth</Label>
            <div class="auth__datepicker flex items-center justify-between">
                <Dropdown placeholder="Day" :items="days" v-model="day" />
                <Dropdown placeholder="Month" :items="months" v-model="monthString" />
                <Dropdown placeholder="Year" :items="years" v-model="year" />
            </div>
            <Button @click="register">Register</Button>
            <Label>
                Already have an account?
                <span @click="mode = 'login'" class="text-blue-700 font-bold cursor-pointer">Login now!</span>
            </Label>
        </div>
    </div>
</template>

<style>
    
</style>