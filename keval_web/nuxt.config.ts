// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Keval',
      meta: [
        {
          name: 'description',
          content: "Nairobi's leading provider of corporate branding, garment printing, and design."
        },
        { property: 'og:title', content: 'Keval' },
        { property: 'og:image', content: 'https://keval.co.ke/logo-white.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },

  imports: {
    dirs: ['stores']
  },

  future: {
    compatibilityVersion: 4,
  },



  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/auto-animate/nuxt',
    '@vee-validate/nuxt',
    // '@nuxtjs/seo'
  ],

  devtools: {
    enabled: true
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  image: {
    provider: 'ipx',
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    // Don't pre-render the dashboard, render it on the client side only
    '/login': { ssr: false },
    '/register': { ssr: false },
    '/forgot-password': { ssr: false },
    '/dashboard': { ssr: false },
    '/dashboard/**': { ssr: false }
  },

  experimental: {
    payloadExtraction: false // Disable payload extraction for static sites
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  },

  compatibilityDate: '2025-01-15',

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  nitro: {
    prerender: {
      ignore: ['/login', '/register', '/dashboard', '/middleware/guests'],
      failOnError: false,
      concurrency: 1,
    }
  },

  icon: {
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
    fetchTimeout: 5000,
  },

})