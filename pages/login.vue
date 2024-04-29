<script setup lang="ts">
import { isEmail, isEmpty } from 'validator'

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/admin/testimonials'
    }
})

const email = ref('')
const password =  ref('')
const loading = ref(false)
const { signIn, signUp } = useAuth()


const login = async () => {
    loading.value = true
    let res = await signIn({
        email: email.value,
        password: password.value
    }, {
        redirect: false,
    })
    .catch(err => loading.value = false)
    loading.value = false
    navigateTo('/admin/testimonials')
}
</script>

<template>
<NuxtLayout name="starry" footer="hidden">
    <form class="auth-form flex flex-col mx-auto mt-32" @submit.prevent="login">
        <div class="auth__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center pb-8 md:pb-8 pt-32">
             <h1 class="auth__title--main text-4xl md:text-6xl font-serif">Admin Login</h1>
         </div>
         <div class="w-1/3 mx-auto">
             <Input :validator="isEmail" placeholder="Email" v-model="email" />
             <Input :validator="(x: string) => !isEmpty(x)" type="password" placeholder="Password" v-model="password" />
             <Button :type="loading ? 'disabled' : 'primary'">Login</Button>
         </div>
    </form>
</NuxtLayout>
</template>

<style lang="stylus">
.event
  img
    &:hover
      transform scale(1.2) 

gradients = { position: 'top right', color: accentColor, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom left', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% }

.index-login
    background gradients_to_bg(gradients)

</style>