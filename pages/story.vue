<script setup lang="ts">
type StoryItem =
  | {
      title: string
      image: string
      description: string
    }
  | {
      title: null
      image: null
      description: string
    }
  | {
      title: null
      image: string
      description: string
    }
  | {
      title: string
      image: null
      description: string
    }

let items: StoryItem[] = [
  {
    title: 'Section 1',
    image: '/owner.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: null,
    image: null,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: null,
    image: '/owner.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Section 4',
    image: null,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Section 4',
    image: null,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
]

let circleY: Ref<null | number[]> = ref(null)

onMounted(() => {
  let x = Array.from(document.querySelectorAll('.story')).map(el => {
    let rect = el.getBoundingClientRect()
    return rect.height / 2 + rect.top
  })
  circleY.value = x
})
</script>

<template>
  <LandingTitle>Our Story</LandingTitle>
  <div class="timeline__container" v-if="circleY">
    <Line  v-for="index in circleY.length - 1" :start="circleY[index - 1]" :end="circleY[index]" :animate="index > 1" />
    <Circle v-for="(top, index) in circleY" :top="top" :key="index" />
  </div>
  <div
    class="story__container grid overflow-x-hidden"
    :class="`grid-rows-[${items.length}]`"
  >
    <div
      class="story w-2/5 gap-8 p-16"
      v-for="({ title, image, description }, index) in items"
      :class="{
        'place-self-start text-left': index % 2 == 0,
        'place-self-end text-right': index % 2 != 0,
      }"
      :data-aos="index % 2 == 0 ? 'fade-right' : 'fade-left'"
    >
      <div v-if="image" class="story__image">
        <img
          class="w-full rounded"
          :src="image"
          alt="Nrutyangan Kathak Dance Academy"
        />
      </div>
      <div class="story__content">
        <h2 class="story__content__title" v-if="title">{{ title }}</h2>
        <p class="story__content__text">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus"></style>
