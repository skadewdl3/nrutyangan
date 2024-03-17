// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    '/': {
      prerender: true,
    },
    '/auth': {
      ssr: false, // nuxt-auth doesnt play well with ssr
    },
    '/dashboard': {
      ssr: false, // nuxt-auth doesnt play well with ssr
    },
    '/story': {
      ssr: true, // nuxt-aos doesnt play well with ssr
    },
  },
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'vue3-carousel-nuxt',
    'nuxt-aos',
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
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: 'primaryColor = #283C27\n',
        },
      },
    },
  },
})
