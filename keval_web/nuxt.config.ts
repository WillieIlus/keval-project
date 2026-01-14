// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

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
      // This looks for the variable first; if missing, it defaults to localhost
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  nitro: {
    // THIS IS THE DROP-IN FIX: 
    // It tells the crawler "Do not try to pre-render these pages"
    prerender: {
      ignore: ['/login', '/register', '/dashboard', '/middleware/guests']
    },
    // Keep your existing devProxy below...
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})

