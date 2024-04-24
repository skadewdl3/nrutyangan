import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
  const flyout = ref(false)
  const toggleFlyout = () => {
    flyout.value = !flyout.value
  }

  return { flyout, toggleFlyout }
})
