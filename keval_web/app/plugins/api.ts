// ~/plugins/api.ts
import { useAuthStore } from '~/stores/auth' // Add this import at the top

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // 1. Create a custom $fetch instance with specific settings
  const api = $fetch.create({
    baseURL: config.public.apiBase, // e.g., 'http://localhost:8000'
    
    // 2. Request Interceptor: Runs before every request leaves your app
    onRequest({ options }) {
      // Access the auth store HERE inside the interceptor
      const authStore = useAuthStore()
      
      // Automatically add the auth token to headers if it exists
      if (authStore.token) {
        const headers = options.headers ||= {}
        
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Token ${authStore.token}`])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Token ${authStore.token}`)
        } else {
          // Standard object assignment which is most common
          (headers as Record<string, string>)['Authorization'] = `Token ${authStore.token}`
        }
      }
    },

    // 3. Response Interceptor: Runs after the response arrives but before your component sees it
    onResponseError({ response }) {
      // Access the auth store HERE inside the interceptor
      const authStore = useAuthStore()
      
      // Handle 401 Unauthorized globally
      if (response.status === 401) {
        console.warn('Unauthorized request - logging out')
        authStore.logout() // Forces logout if token is invalid/expired
      }

      // Handle 403 Forbidden
      if (response.status === 403) {
        console.warn('Forbidden request - User does not have permission')
      }

      // Handle 404 Not Found
      if (response.status === 404) {
        console.warn('Resource not found')
      }

      // Handle 500 Server Errors
      if (response.status >= 500) {
        console.error('Server error occurred')
      }
    }
  })

  // 4. Expose this custom 'api' instance to the rest of the app
  return {
    provide: {
      api
    }
  }
})