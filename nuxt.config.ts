// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {},
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      'Open Sans': [300, 400, 700],
    },
  },
  auth: {
    provider: {
      pages: {
        login: '/auth',
      },
      type: 'local',
      token: {
        maxAgeInSeconds: 60 * 60 * 24,
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        headerName: 'Authorization',
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
