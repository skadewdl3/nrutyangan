import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
  const flyout = ref(false)
  const joinScroll = ref(false)
  const toggleFlyout = () => {
    flyout.value = !flyout.value
  }
  const setJoinScroll = (value: boolean) => {
    joinScroll.value = value
  }

  return { flyout, toggleFlyout, joinScroll, setJoinScroll }
})
