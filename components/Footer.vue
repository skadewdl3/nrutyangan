<script setup lang="ts">
const firstName = ref('')
const lastName = ref('')
const contact = ref('')
const email = ref('')
const content = ref('')
</script>

<template>
    <div class="footer">
        <div class="contact-form grid place-content-center">
            <div class="branches__title text-center">
                <h1 class="branches__title--main text-4xl md:text-6xl font-serif">Contact Us</h1>
                <h3 class="branches__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">We would love to hear from you!</h3>
            </div>
            <Input placeholder="First Name" class="first-name" v-model="firstName" />
            <Input placeholder="Last Name" class="last-name" v-model="lastName" />
            <Input placeholder="Contact No" class="contact" v-model="contact" />
            <Input placeholder="Email" class="contact" v-model="email" />
            <Input :multiline="true" placeholder="Write to us!" class="content" v-model="content" />
            <Button class="w-32 mx-auto">Submit</Button>
        </div>
        <div class="socials"></div>
    </div>
</template>