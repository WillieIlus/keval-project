// ~/stores/auth.ts
import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from '~/types/api'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  // --- State ---
  const user = ref<User | null>(null)
  
  // 1. USE COOKIE INSTEAD OF REF (This replaces both the ref and the manual useCookie call)
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/' 
  })
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.is_staff || false) 
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.first_name} ${user.value.last_name}`.trim() 
  })

  // --- Actions ---
  async function register(credentials: RegisterCredentials) {
    loading.value = true
    error.value = null
    try {
      const response = await $api<AuthResponse>('/api/auth/register/', { 
        method: 'POST',
        body: credentials
      })
      token.value = response.token
      user.value = response.user
      await navigateTo('/dashboard')
    } catch (e: any) {
      const data = e.data || {}
      error.value = data.message || data.detail || 'Registration failed.'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null
    try {
      const response = await $api<any>('/api/auth/login/', { 
        method: 'POST',
        body: credentials
      })
      // Ensure we access the token correctly based on your Django response structure
      token.value = response.token || response.data?.token
      user.value = response.user
      return response
    } catch (e: any) {
      error.value = 'Incorrect Credentials'
      throw e
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null // Clears the cookie automatically
    error.value = null
    navigateTo('/login')
  }

  function clearError() {
    error.value = null
  }

  /**
   * Example of how the plugin simplifies authenticated requests
   */
  async function verifyToken() {
    if (!token.value) return false
    
    try {
      // The plugin AUTOMATICALLY adds: Authorization: Token <token>
      // await $api('/api/auth/verify/') 
      return true
    } catch {
      logout() // Plugin also handles 401s, but good to be explicit
      return false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    fullName,
    register,
    login,
    logout,
    clearError,
    verifyToken
  }
}, {
  persist: {
    storage: persistedState.cookies, // <--- Change this from localStorage
    paths: ['user'] 
  }
})