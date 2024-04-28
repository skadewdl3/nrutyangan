import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', () => {
  const flyout = ref(false)
  const joinScroll = ref(false)
  const toggleFlyout = () => {
    flyout.value = !flyout.value
  }
  const route = ref('/')
  const auth = useAuth()

  const items = computed(() => [
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
    auth.status.value == 'authenticated'
      ? route.value == '/admin'
        ? {
            name: 'Logout',
            action: () => {
              auth.signOut({ redirect: false })
              navigateTo('/login')
            },
          }
        : { name: 'Dashboard', link: '/admin' }
      : {
          name: 'Login',
          link: '/login',
        },
  ])
  const setJoinScroll = (value: boolean) => {
    joinScroll.value = value
  }

  const setRoute = (value: string) => {
    route.value = value
  }

  return {
    flyout,
    toggleFlyout,
    joinScroll,
    setJoinScroll,
    items,
    route,
    setRoute,
  }
})
