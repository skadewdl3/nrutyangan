<script setup lang="ts">
import dayjs from 'dayjs'

const firstName = ref('')
const lastName = ref('')
const contact = ref('')
const email = ref('')
const content = ref('')

const socials = [
    {
        icon: 'jam:facebook',
        link: 'https://www.facebook.com/nrutyangan'
    },
    {
        icon: 'jam:instagram',
        link: 'https://www.instagram.com/nrutyangan'
    }
]
</script>

<template>
    <div class="footer">
        <div class="contact-form mx-auto mb-16 md:mt-0">
            <div class="branches__title text-center">
                <h1 class="branches__title--main text-4xl md:text-6xl font-serif">Contact Us</h1>
                <h3 class="branches__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">We would love to hear from you!</h3>
            </div>
            <form class="contact w-[90%] md:w-[60%] lg:w-[50%] xl:w-[30%] mx-auto">
                <Input placeholder="First Name" class="first-name" v-model="firstName" />
                <Input placeholder="Last Name" class="last-name" v-model="lastName" />
                <Input placeholder="Contact No" class="contact" v-model="contact" />
                <Input placeholder="Email" class="contact" v-model="email" />
                <Input :multiline="true" placeholder="Write to us!" class="content" v-model="content" />
                <div class="w-full flex items-center justify-center">
                    <Button class="w-32">Submit</Button>
                </div>
            </form>
        </div>
        
        <div class="footer-gradient">

            <div class="socials pt-16">
                <div class="socials-icons flex items-center justify-center">
                    <div class="social-icon mx-4 text-4xl" v-for="social in socials" @click="navigateTo(social.link, { external: true })">
                        <Icon :name="social.icon" />
                    </div>
                </div>
            </div>
    
            <div class="copyright flex items-center justify-center mx-auto w-[70%] md:w-[80%] xl:w-full text-md md:text-lg xl:text-xl font-heading py-8">
                <Icon class=" text-3xl sm:text-xl" name="tdesign:copyright" />&nbsp;
                <span class="text-center">{{ dayjs().year() + ' ' }}Copyright: Nrutyangan Kathak Dance academy, Pune</span>
            </div>
        </div>

    </div>
</template>

<style lang="stylus">
.footer-gradient
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    clip-path polygon(0 0%, 100% 20%, 100% 100%, 0 100%)
</style>