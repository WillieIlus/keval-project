// ~/middleware/guest.ts
/**
 * Guest Middleware
 * Redirects authenticated users away from auth pages (login, register)
 */
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // If user is already authenticated, redirect to dashboard
  if (authStore.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})