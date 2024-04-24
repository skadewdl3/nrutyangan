// https://nuxt.com/docs/api/configuration/nuxt-config

import { stylusVars } from './tailwind.config'

export default defineNuxtConfig({
  // routeRules: {
  //   "/": {
  //     prerender: true,
  //   },
  //   "/auth": {
  //     ssr: false, // nuxt-auth doesnt play well with ssr
  //   },
  //   "/dashboard": {
  //     ssr: false, // nuxt-auth doesnt play well with ssr
  //   },
  //   "/story": {
  //     ssr: true, // nuxt-aos doesnt play well with ssr
  //   },
  //   "/events": {
  //     prerender: true,
  //   },
  // },
  devtools: { enabled: false },
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/google-fonts',
    'nuxt-aos',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  googleFonts: {
    families: {
      Inter: [300, 400, 700],
      Montserrat: [300, 400, 700],
      'Noto Serif': [300, 400, 700],
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
        // expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        headerName: 'Authorization',
      },
    },
    // enableSessionRefreshPeriodically: 5000,
    // enableSessionRefreshOnWindowFocus: true,
  },
  runtimeConfig: {
    public: {
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      FIREBASE_CONFIG: {
        type: 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: Object.entries(stylusVars)
            .map(([key, value]) => `${key} = ${value}`)
            .join('\n'),
        },
      },
    },
  },
})
