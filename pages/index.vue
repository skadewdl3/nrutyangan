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

const start = ref(0)

const branchesElement = ref(null)

const goToBranches = () => {
  // @ts-ignore
  branchesElement.value.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="hero relative items-center justify-center text-white">
    <img
      src="~/assets/images/hero.jpeg"
      alt="Nrutyangan Kathak Dance Academy"
      class="w-full h-screen lg:h-full object-cover brightness-50"
    />
    <div
      class="hero-text absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <h1 class="text-5xl md:text-6xl xl:text-8xl font-bold drop-shadow-xl italic">Nrutyangan</h1>
      <h3 class="text-3xl md:text-4xl xl:text-6xl drop-shadow-xl mt-8">Kathak Dance Academy</h3>
    <Button class="mx-auto my-6 rounded-full block lg:hidden" color="#fff" hoverColor="#eee" textColor="#000" @click="goToBranches">Explore more</Button>
    </div>
  </div>
  <div class="branches" ref="branchesElement">
    <LandingTitle>Branches</LandingTitle>
    <div class="branches__items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-primary w-full p-8">
      <div
        v-for="(branch, index) in branches"
        class="w-full aspect-square p-4 bg-white"
        :class="{
          'border-solid border-stone-400 border-b-2 lg:border-b-0 md:border-r-2':
            index != branches.length - 1,
        }"
      >
        <div class="bg-gray-300 w-full aspect-square">{{ branch.name }}</div>
      </div>
    </div>
  </div>
  <div class="owner flex items-center flex-col-reverse lg:grid lg:grid-cols-2 px-8 md:px-32 lg:px-16 xl:px-32 font-thin place-items-center my-16">
    <div class="owner__info italic mt-4 lg:mt-0 lg:px-8 xl:px-16 text-2xl lg:text-3xl xl:text-4xl text-justify">
        <span class="font-normal">Reshma Godambe</span> is the owner of <span class="font-normal">Nrutyangan Kathak Academy</span>, Pune, an esteemed institution that was established by the late Mrs. Suvasini Botala in 1983. 
    </div>
    <img src="~/assets/images/owner.jpg" class="w-full" />
  </div>
  <div class="testimonials">
    <LandingTitle>Testimonials</LandingTitle>

    <TestimonialViewer class="hidden xl:block my-8" :testimonials="testimonials" :start="start" :count="2" @next="start++" @prev="start--" />

    <TestimonialViewer class="hidden md:block xl:hidden" :testimonials="testimonials" :start="start" :count="2" @next="start++" @prev="start--" />

    <TestimonialViewer class="block md:hidden" :testimonials="testimonials" :start="start" :count="1" @next="start++" @prev="start--" />
  </div>
  
</template>

<style lang="stylus">
.navbar
  text-shadow 3px 3px 5px rgba(#000, 0.5)

body
  overflow-x hidden
</style>
