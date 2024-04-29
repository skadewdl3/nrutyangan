// https://nuxt.com/docs/api/configuration/nuxt-config

import { stylusVars } from './tailwind.config'

const customVars = `
gradients_to_bg(gds)
    s = ''
    for gd in gds
        push(s, 'radial-gradient(circle at ' + gd.position + ', ' + rgba(gd.color, gd.opacity) + ' ' + gd.size + ', transparent ' + gd.transparent + ')')
    shift(s)
    unquote(join(', ', s))
`

export default defineNuxtConfig({
  routeRules: {
    '/**': { isr: 60 * 60 * 24 },
    '/login': { ssr: false },
    '/admin': { redirect: '/admin/testimonials', ssr: false },
    '/admin/**': { ssr: false },
  },
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
        login: '/login',
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
            .join('\n')
            .concat(customVars),
        },
      },
    },
  },
})
