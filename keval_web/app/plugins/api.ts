// ~/plugins/api.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Create a custom $fetch instance with interceptors
  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase || 'http://localhost:8000',
    
    // Request Interceptor: Add auth token
    onRequest({ options }) {
      // Get token from localStorage (can't use store here to avoid circular deps)
      if (import.meta.client) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const headers = options.headers ||= {}
          if (Array.isArray(headers)) {
            headers.push(['Authorization', `Token ${token}`])
          } else if (headers instanceof Headers) {
            headers.set('Authorization', `Token ${token}`)
          } else {
            (headers as Record<string, string>)['Authorization'] = `Token ${token}`
          }
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