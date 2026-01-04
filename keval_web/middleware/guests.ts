// keval_web/middleware/guests.ts

export default defineNuxtRouteMiddleware((to) => {
  // Always skip middleware during the build/server phase for guest pages
  if (process.server) return

  const auth = useAuthStore()
  
  if (auth.token && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})