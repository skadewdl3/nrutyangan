<script setup lang="ts">
import { isEmail } from 'validator'

definePageMeta({
    middleware: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/admin/home'
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
    navigateTo('/admin/home')
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
             <Input type="password" placeholder="Password" v-model="password" />
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
gradients_to_bg(gds)
    s = ''
    for gd in gds
        push(s, 'radial-gradient(circle at ' + gd.position + ', ' + rgba(gd.color, gd.opacity) + ' ' + gd.size + ', transparent ' + gd.transparent + ')')
    shift(s)
    unquote(join(', ', s))

gradients = { position: 'top right', color: accentColor, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom left', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% }


.index
    background gradients_to_bg(gradients)
    background-repeat no-repeat
    backdrop-filter blur(10px)
    animation zoomOut 0.5s ease-in-out forwards

    &--zoomed
      animation zoomIn 0.5s ease-in-out forwards


.index-content
    animation fadeIn 0.5s ease-in-out both
    animation-delay 0.5s
    &--hidden
      animation fadeOut 0.5s ease-in-out forwards


@keyframes zoomIn {
  from {
    background-size: 100% 100%;
  }
  to {
    background-size: 150% 150%;
  }
}

@keyframes zoomOut {
  from {
    background-size: 150% 150%;
  }
  to {
    background-size: 100% 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>