<script setup lang="ts">
const branches = [
    {
        name: 'Dhayari',
        teacher: 'Guru A',
        address: 'Dhayari, Pune',
        contact: '1234567890'
    },
    {
        name: 'Dhakawdi',
        teacher: 'Guru B',
        address: 'Dhakawdi',
        contact: '1234567890'
    },
    {
        name: 'Ambegaon',
        teacher: 'Guru C',
        address: 'Ambegaon, Pune',
        contact: '1234567890'
    },
    {
        name: 'Katraj',
        teacher: 'Guru D',
        address: 'Katraj, Pune',
        contact: '1234567890'
    }
    
]
const socials = [
    {
        name: 'Instagram',
        icon: 'streamline:instagram',
        link: 'https://www.instagram.com/nrutyangan_kathak_academy?igsh=Z2Vra2N1bnN0dHp0'
    },
    {
        name: 'Facebook',
        icon: 'mdi:facebook-box',
        link: 'https://www.facebook.com/'
    }
]
</script>

<template>
    <div class="footer-mobile lg:hidden">
    <div class="branch-contacts bg-primary px-8 md:px-32 py-8">

      <div class="contact-card bg-white my-4" v-for="branch in branches">
        <div class="flex items-center justify-between px-4 py-2 border-solid border-gray-300 border-b-2">
          <span class="uppercase font-bold">Area</span><span>{{ branch.name }}</span>
        </div>
        <div class="flex items-center justify-between px-4 py-2 border-solid border-gray-300 border-b-2">
          <span class="uppercase font-bold">Teacher In-charge</span><span>{{ branch.teacher }}</span>
        </div>
        <div class="flex items-center justify-between px-4 py-2">
          <span class="uppercase font-bold">Contact No.</span><span>{{ branch.contact }}</span>
        </div>
      </div>
    </div>
    <div class="px-8 md:px-32 pb-8">
      <LandingTitle>Contact Us</LandingTitle>
      <div class="socials flex items-center justify-center">
        <a v-for="social in socials" :href="social.link" target="_blank" class=" text-4xl mx-4 flex items-center justify-center rounded-full p-4 border-black border-2 border-solid">
          <Icon :name="social.icon" />
        </a>
      </div>
    </div>
  </div>
    <div class="footer hidden lg:grid lg:grid-cols-[1fr_2fr] bg-primary text-white px-16 font-light">
    <div class="footer__left px-8 text-3xl my-4">
        <h2>Contact Us</h2>
        <div class="footer__socials">
            <a v-for="social in socials" class="flex items-center justify-start my-2" :href="social.link" target="_blank">
                <Icon :name="social.icon" />
                <h4 class="ml-2">{{ social.name }}</h4>
            </a>
        </div>
    </div>
    <div class="footer__contacts grid grid-cols-2 grid-rows-2 px-8 text-2xl">
        <div v-for="branch in branches" class="my-4">
            <p>{{ branch.name }}: {{ branch.teacher }}</p>
            <p>{{ branch.contact }}</p>
            <p>{{ branch.address }}</p>
        </div>
    </div>
  </div>
</template>