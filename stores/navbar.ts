import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
  const flyout = ref(false)
  const joinScroll = ref(false)
  const toggleFlyout = () => {
    flyout.value = !flyout.value
  }

  const items = [
    {
      name: 'Our Founder',
      link: '/founder',
    },
    {
      name: 'Branches',
      link: '/branches',
    },
    {
      name: 'Our Events',
      link: '/events',
    },
    {
      name: 'Join Us',
      action: () => {
        setJoinScroll(true)
        navigateTo('/')
      },
    },
    {
      name: 'Login',
      link: '/auth',
    },
  ]
  const setJoinScroll = (value: boolean) => {
    joinScroll.value = value
  }

  return { flyout, toggleFlyout, joinScroll, setJoinScroll, items }
})
