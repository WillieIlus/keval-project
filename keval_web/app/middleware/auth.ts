// ~/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (import.meta.server) return

  const token = localStorage.getItem('auth_token')
  const user = localStorage.getItem('auth_user')

  // Not authenticated - redirect to login
  if (!token || !user) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // Validate user data
  try {
    JSON.parse(user)
  } catch {
    // Corrupted data - clear and redirect
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    return navigateTo('/login')
  }
})