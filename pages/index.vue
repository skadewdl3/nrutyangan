<script setup lang="ts">
import dayjs from 'dayjs'
import timeToNow from 'dayjs/plugin/relativeTime'

dayjs.extend(timeToNow)

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
const testimonials = [
  {
    stars: 4.5,
    date: dayjs().subtract(1, 'month').fromNow(),
    content: 'I have been learning Kathak for 3 years now and I am very happy with the progress I have made. I am very grateful to my Guru for the same. I would recommend Nrutyangan to anyone who is interested in learning Kathak.',
    author: 'abhilasha p'
  },
  {
    stars: 3.5,
    date: dayjs().subtract(2, 'month').fromNow(),
    content: 'I have been learning Kathak for 3 years now and I am very happy with the progress I have made. I am very grateful to my Guru for the same. I would recommend Nrutyangan to anyone who is interested in learning Kathak.',
    author: 'nisha m' 
  },
  {
    stars: 5,
    date: dayjs().subtract(4, 'day').fromNow(),
    content: 'I have been learning Kathak for 3 years now and I am very happy with the progress I have made. I am very grateful to my Guru for the same. I would recommend Nrutyangan to anyone who is interested in learning Kathak.',
    author: 'bhawna r'
  },
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
  <div class="hero relative items-center justify-center text-white">
    <img
      src="~/assets/images/hero.jpeg"
      alt="Nrutyangan Kathak Dance Academy"
      class="w-full h-full object-cover brightness-50"
    />
    <div
      class="hero-text absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <h1 class="text-8xl font-bold drop-shadow-xl italic">Nrutyangan</h1>
      <h3 class="text-6xl drop-shadow-xl mt-8">Kathak Dance Academy</h3>
    </div>
  </div>
  <div class="branches">
    <LandingTitle>Branches</LandingTitle>
    <div class="branches__items grid grid-cols-4 bg-primary w-full p-8">
      <div
        v-for="(branch, index) in branches"
        class="w-full aspect-square p-4 bg-white"
        :class="{
          'border-solid border-r-2 border-r-stone-400':
            index != branches.length - 1,
        }"
      >
        <div class="bg-gray-300 w-full aspect-square">{{ branch.name }}</div>
      </div>
    </div>
  </div>
  <div class="owner grid grid-cols-2 px-32 font-thin place-items-center my-16">
    <div class="owner__info italic px-16 -ml-16 text-4xl text-justify">
        <span class="font-normal">Reshma Godambe</span> is the owner of <span class="font-normal">Nrutyangan Kathak Academy</span>, Pune, an esteemed institution that was established by the late Mrs. Suvasini Botala in 1983. 
    </div>
    <img src="~/assets/images/owner.jpg" class="w-full" />
  </div>
  <div class="testimonials">
    <LandingTitle>Testimonials</LandingTitle>
    <div class="testimonials__items grid grid-cols-3 w-full p-8">

      <div v-for="(testimonial, i) in testimonials" class="testimonial__item w-full px-16">
        <div class="flex items-center justify-between">
            <Stars class="text-2xl" :stars="testimonials[i].stars" />
            <div>{{ testimonial.date }}</div>
        </div>
        <p class="text-justify">{{ testimonial.content }}</p>
        <p class="capitalize font-bold text-pink-400">- {{ testimonial.author }}</p>
      </div>

    </div>
  </div>
  <div class="footer grid grid-cols-3 bg-primary text-white px-16 font-light">
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

<style lang="stylus">
.navbar
  text-shadow 3px 3px 5px rgba(#000, 0.5)
</style>
