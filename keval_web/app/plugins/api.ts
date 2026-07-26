// ~/plugins/api.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || '').trim()

  // Create a custom $fetch instance with interceptors
  const apiFetch = $fetch.create({
    baseURL: apiBase || undefined,
    
    // Request Interceptor: Add auth token
    onRequest({ options }) {
      if (!apiBase) {
        throw new Error('NUXT_PUBLIC_API_BASE is not configured. Set it to the production Django API base URL.')
      }

      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const headers = new Headers(options.headers as HeadersInit)
          headers.set('Authorization', `Token ${token}`)
          options.headers = headers
        }
      }
    },

    // Response Interceptor: Handle errors
    onResponseError({ response }) {
      if (response.status === 401) {
        console.warn('[API] Unauthorized - clearing auth')
        if (import.meta.client) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          // Optional: redirect to login
          // window.location.href = '/login'
        }
      }

      if (response.status === 403) {
        console.warn('[API] Forbidden - insufficient permissions')
      }

      if (response.status >= 500) {
        console.error('[API] Server error:', response.status)
      }
    }
  })

  // Wrapper function for easier typing
  const api = async <T>(
    endpoint: string, 
    options: Parameters<typeof $fetch>[1] = {}
  ): Promise<T> => {
    return apiFetch<T>(endpoint, options)
  }

  return {
    provide: {
      api
    }
  }
})
