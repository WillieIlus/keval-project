// ~/stores/auth.ts
import { defineStore } from 'pinia'
import type { 
  User, 
  AuthResponse, 
  LoginFormData, 
  RegisterFormData 
} from '~/types/api'

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()
  const router = useRouter()

  // ============================================
  // STATE
  // ============================================
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  // ============================================
  // GETTERS
  // ============================================
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const isAdmin = computed(() => user.value?.is_staff ?? false)
  
  const fullName = computed(() => {
    if (!user.value) return 'Guest'
    const name = `${user.value.first_name} ${user.value.last_name}`.trim()
    return name || user.value.email
  })

  const userInitials = computed(() => {
    if (!user.value) return 'G'
    const first = user.value.first_name?.[0] || ''
    const last = user.value.last_name?.[0] || ''
    return (first + last).toUpperCase() || user.value.email[0].toUpperCase()
  })

  // ============================================
  // ACTIONS: Authentication
  // ============================================

  async function login(credentials: LoginFormData): Promise<AuthResponse> {
    loading.value = true
    error.value = null

    try {
      const response = await $api<AuthResponse>('/api/auth/login/', {
        method: 'POST',
        body: {
          email: credentials.email.toLowerCase().trim(),
          password: credentials.password
        }
      })

      // Set state
      token.value = response.token
      user.value = response.user

      // Persist to localStorage
      if (import.meta.client) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
      }

      return response
    } catch (e: any) {
      const message = extractErrorMessage(e)
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  async function register(formData: RegisterFormData): Promise<AuthResponse> {
    loading.value = true
    error.value = null

    if (formData.password !== formData.password_confirm) {
      error.value = 'Passwords do not match'
      loading.value = false
      throw new Error('Passwords do not match')
    }

    try {
      const response = await $api<AuthResponse>('/api/auth/register/', {
        method: 'POST',
        body: {
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim()
        }
      })

      token.value = response.token
      user.value = response.user

      if (import.meta.client) {
        localStorage.setItem('auth_token', response.token)
        localStorage.setItem('auth_user', JSON.stringify(response.user))
      }

      return response
    } catch (e: any) {
      const message = extractErrorMessage(e)
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  function logout(redirect: string = '/') {
    token.value = null
    user.value = null
    error.value = null

    if (import.meta.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }

    router.push(redirect)
  }

  function initializeAuth() {
    if (initialized.value) return
    
    if (import.meta.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedUser = localStorage.getItem('auth_user')

      if (savedToken && savedUser) {
        try {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
        } catch {
          logout('/')
        }
      }
    }
    
    initialized.value = true
  }

  function clearError() {
    error.value = null
  }

  // ============================================
  // HELPERS
  // ============================================

  function extractErrorMessage(e: any): string {
    if (e.data) {
      if (typeof e.data === 'string') return e.data
      if (e.data.detail) return e.data.detail
      if (e.data.non_field_errors) return e.data.non_field_errors[0]
      if (e.data.email) return `Email: ${e.data.email[0]}`
      if (e.data.password) return `Password: ${e.data.password[0]}`
      
      const firstKey = Object.keys(e.data)[0]
      if (firstKey && Array.isArray(e.data[firstKey])) {
        return `${firstKey}: ${e.data[firstKey][0]}`
      }
    }
    return e.message || 'An unexpected error occurred'
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    user,
    token,
    loading,
    error,
    initialized,
    isAuthenticated,
    isAdmin,
    fullName,
    userInitials,
    login,
    register,
    logout,
    initializeAuth,
    clearError
  }
})
// NO persist config - we handle it manually with localStorage