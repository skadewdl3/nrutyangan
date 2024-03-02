<script setup lang="ts">
    definePageMeta({
        middleware: ['auth'],
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/secret'
        }
    })


    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const mode = ref('login')

    const days = [...Array(31).keys()].map(i => i + 1)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const years = [...Array(70).keys()].map(i => new Date().getFullYear() - i)

    const { signIn, signUp } = useAuth()

    const login = async () => {
        
        let res = await signIn({
            firstName: 'Soham',
            lastName: 'Karandikar'
        }, {
            redirect: true,
            callbackUrl: '/secret'
        })

        console.log(res);
    }

    const register = async () => {
        console.log('this ran');
        
        console.log(email.value)
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
    <div class="auth__wrapper w-full h-screen flex items-center justify-center bg-[#283C27]">
        <div v-if="mode == 'login'" class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <div class="auth__title mx-auto text-4xl">Login</div>
            <Input v-model="firstName" placeholder="First Name" type="text" />
            <Input v-model="lastName" placeholder="Last Name" type="text" />
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            <Label class="mt-4">Select birth date</Label>
            <div class="auth__datepicker flex items-center justify-between">
                <Dropdown placeholder="Day" :items="days" />
                <Dropdown placeholder="Month" :items="months" />
                <Dropdown placeholder="Year" :items="years" />
            </div>
            <Button>Login</Button>
            <Label>
                Don't have an account yet?
                <span @click="mode = 'register'" class="text-blue-700 font-bold cursor-pointer">Register now!</span>
            </Label>
        </div>
         <div v-else class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <div class="auth__title mx-auto text-4xl">Register</div>
            <Input v-model="firstName" placeholder="First Name" type="text" />
            <Input v-model="lastName" placeholder="Last Name" type="text" />
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            <Label class="mt-4">Select birth date</Label>
            <div class="auth__datepicker flex items-center justify-between">
                <Dropdown placeholder="Day" :items="days" />
                <Dropdown placeholder="Month" :items="months" />
                <Dropdown placeholder="Year" :items="years" />
            </div>
            <Button>Register</Button>
            <Label>
                Already have an account?
                <span @click="mode = 'login'" class="text-blue-700 font-bold cursor-pointer">Login now!</span>
            </Label>
        </div>
    </div>
</template>

<style>
    
</style>