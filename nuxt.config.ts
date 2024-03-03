// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth', '@nuxtjs/tailwindcss', 'nuxt-icon'],
  auth: {
    provider: {
      pages: {
        login: '/auth',
      },
      type: 'local',
      token: {
        maxAgeInSeconds: 60 * 60 * 24,
        signInResponseTokenPointer: '/token',
      },
    },
    enableSessionRefreshPeriodically: 5000,
    enableSessionRefreshOnWindowFocus: true,
  },
  runtimeConfig: {
    public: ['MONGO_URI', 'JWT_SECRET'].reduce((acc: any, key) => {
      acc[key] = process.env[key]
      return acc
    }, {}),
  },
})
