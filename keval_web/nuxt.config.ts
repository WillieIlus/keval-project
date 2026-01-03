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
    '/': { prerender: true }
  },

  runtimeConfig: {
    public: {
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
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})

