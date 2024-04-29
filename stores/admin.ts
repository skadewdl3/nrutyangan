import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const tabs = [
    {
      name: 'Branches',
      icon: 'material-symbols:location-on-outline',
      link: '/admin/branches',
    },
    {
      name: 'Testimonials',
      icon: 'material-symbols:kid-star-outline',
      link: '/admin/testimonials',
    },
    {
      name: 'Announcements',
      icon: 'ph:megaphone',
      link: '/admin/announcements',
    },
    {
      name: 'Events',
      icon: 'material-symbols:calendar-today',
      link: '/admin/events',
    },
    {
      name: 'Users',
      icon: 'material-symbols:person-2-outline-rounded',
      link: '/admin/users',
    },
  ]
  const activeTab = ref(0)

  const setActiveTab = (index: number) => {
    activeTab.value = index
  }

  return {
    tabs,
    activeTab,
    setActiveTab,
  }
})
