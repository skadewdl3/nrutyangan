<script setup lang="ts">
    definePageMeta({
        middleware: ['auth'],
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard'
        }
    })

    import validatorModule from 'validator';


    const firstName = ref('Soham')
    const lastName = ref('Karandikar')
    const email = ref('sohamk10@gmail.com')
    const password = ref('#Dance123')
    
    
    const mode = ref('register')
    const loading = ref(false)
    const error = ref(null)
    
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
        loading.value = true
        let res = await signIn({
            email: email.value,
            password: password.value
        }, {
            redirect: true,
            callbackUrl: '/dashboard'
        }).catch(err => loading.value = false)
        loading.value = false
    }

    const register = async () => {
        loading.value = true
        let res = await signUp({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            dob: dob.value
        }, {
            redirect: true,
            callbackUrl: '/dashboard'
        }).catch(err => loading.value = false)
        loading.value = false
    }

</script>

<template>
    <div class="auth__wrapper w-full h-screen flex items-center justify-center">
        <div v-if="mode == 'login'" class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <Label class="mx-auto text-4xl">Login</Label>
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            
            <Button @click="login" :loading="loading">Login</Button>
            <Label v-if="error" class="text-red-500 font-bold">
                {{ error }}
            </Label>
            <Label>
                Don't have an account yet?
                <span @click="mode = 'register'" class="text-blue-700 font-bold cursor-pointer">Register now!</span>
            </Label>
        </div>
         <div v-else class="auth__container rounded flex flex-col bg-white px-8 py-4">
            <Label class="mx-auto text-4xl">Register</Label>
            <Input v-model="firstName" placeholder="First Name" type="text" :validator="(x: string) => !validatorModule.isEmpty(x)" />
            <Input v-model="lastName" placeholder="Last Name" type="text" :validator="(x: string) => !validatorModule.isEmpty(x)" />
            <Input v-model="email" placeholder="Email" type="email" />
            <Input v-model="password" placeholder="Password" type="password" />
            <Label class="mt-4">Select date of birth</Label>
            <div class="auth__datepicker flex items-center justify-between">
                <Dropdown placeholder="Day" :items="days" v-model="day" />
                <Dropdown placeholder="Month" :items="months" v-model="monthString" />
                <Dropdown placeholder="Year" :items="years" v-model="year" />
            </div>
            <Button @click="register" :loading="loading">Register</Button>
            <Label v-if="error" class="text-red-500 font-bold">
                {{ error }}
            </Label>
            <Label>
                Already have an account?
                <span @click="mode = 'login'" class="text-blue-700 font-bold cursor-pointer">Login now!</span>
            </Label>
        </div>
    </div>
</template>

<style lang="stylus">
.auth__wrapper
    background url('~/assets/images/hero.jpeg') rgba(primaryColor, 0.7)
    background-blend-mode overlay
    background-repeat no-repeat
    background-size cover
</style>