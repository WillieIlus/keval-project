// https://nuxt.com/docs/api/configuration/nuxt-config

const publicApiBase = process.env.NUXT_PUBLIC_API_BASE?.trim()

if (process.env.NETLIFY === 'true' && !publicApiBase) {
  throw new Error('NUXT_PUBLIC_API_BASE must be set in Netlify for production API requests.')
}

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
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/auto-animate/nuxt',
    '@vee-validate/nuxt',
    // '@nuxtjs/seo'
  ],

  devtools: {
    enabled: process.env.NODE_ENV !== 'production'
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
      apiBase: publicApiBase
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
