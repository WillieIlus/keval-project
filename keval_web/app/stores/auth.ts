// ~/stores/auth.ts
import { defineStore } from 'pinia'
import type { 
  User, 
  LoginResponse,
  RegisterResponse,
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
  
  const isSuperuser = computed(() => user.value?.is_superuser ?? false)
  
  const fullName = computed(() => {
    if (!user.value) return 'Guest'
    const firstName = user.value.first_name || ''
    const lastName = user.value.last_name || ''
    const name = `${firstName} ${lastName}`.trim()
    return name || user.value.email.split('@')[0]
  })

  const userInitials = computed(() => {
    const u = user.value
    if (!u) return 'G'
    const firstName = u.first_name ?? ''
    const lastName = u.last_name ?? ''
    if (firstName && lastName) {
      const first = firstName?.[0] ?? ''
      const last = lastName?.[0] ?? ''
      return (first + last).toUpperCase() || 'G'
    }
    return (u.email?.[0] ?? 'G').toUpperCase()
  })

  // ============================================
  // ACTIONS
  // ============================================

  /**
   * Login with email/password
   */
  async function login(credentials: LoginFormData): Promise<void> {
    loading.value = true
    error.value = null

    try {
      // Call Django login endpoint
      const response = await $api<LoginResponse>('/api/auth/login/', {
        method: 'POST',
        body: {
          email: credentials.email.toLowerCase().trim(),
          password: credentials.password
        }
      })

      console.log('Login response:', response) // Debug log

      // Set token from response
      token.value = response.token

      // Build user object from response
      user.value = {
        id: response.user_id,
        email: response.email,
        first_name: response.first_name || '',
        last_name: response.last_name || '',
        is_staff: response.is_staff ?? false,
        is_superuser: response.is_superuser ?? false
      }

      // Persist to localStorage
      if (import.meta.client) {
        try {
          localStorage.setItem('auth_token', response.token)
          localStorage.setItem('auth_user', JSON.stringify(user.value))
        } catch (e) {
          console.warn('Failed to save to localStorage:', e)
        }
      }

      console.log('Login successful, redirecting...') // Debug log

      // Redirect to dashboard
      await router.push('/dashboard')

    } catch (e: any) {
      console.error('Login error:', e) // Debug log
      const message = extractErrorMessage(e)
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  /**
   * Register new user
   */
  async function register(formData: RegisterFormData): Promise<void> {
    loading.value = true
    error.value = null

    if (formData.password !== formData.password_confirm) {
      error.value = 'Passwords do not match'
      loading.value = false
      throw new Error('Passwords do not match')
    }

    try {
      const response = await $api<RegisterResponse>('/api/auth/register/', {
        method: 'POST',
        body: {
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim()
        }
      })

      console.log('Register response:', response) // Debug log

      token.value = response.token

      // Build user object
      user.value = {
        id: response.user_id,
        email: response.email,
        first_name: response.first_name || formData.first_name.trim(),
        last_name: response.last_name || formData.last_name.trim(),
        is_staff: response.is_staff ?? false,
        is_superuser: response.is_superuser ?? false
      }

      if (import.meta.client) {
        try {
          localStorage.setItem('auth_token', response.token)
          localStorage.setItem('auth_user', JSON.stringify(user.value))
        } catch (e) {
          console.warn('Failed to save to localStorage:', e)
        }
      }

      console.log('Registration successful, redirecting...') // Debug log

      // Redirect to dashboard
      await router.push('/dashboard')

    } catch (e: any) {
      console.error('Register error:', e) // Debug log
      const message = extractErrorMessage(e)
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout and clear all auth state
   */
  function logout(redirect: string = '/') {
    token.value = null
    user.value = null
    error.value = null

    if (import.meta.client) {
      try {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      } catch (e) {
        console.warn('Failed to clear localStorage:', e)
      }
    }

    router.push(redirect)
  }

  /**
   * Initialize auth state from localStorage
   */
  function initializeAuth() {
    if (initialized.value) return
    
    if (import.meta.client) {
      try {
        const savedToken = localStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('auth_user')

        if (savedToken && savedUser) {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
          console.log('Auth initialized from localStorage:', user.value) // Debug log
        }
      } catch (e) {
        console.warn('Failed to read from localStorage:', e)
        // Clear corrupted data
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
    
    initialized.value = true
  }

  /**
   * Clear error messages
   */
  function clearError() {
    error.value = null
  }

  // ============================================
  // HELPERS
  // ============================================

  function extractErrorMessage(e: any): string {
    console.log('Extracting error from:', e) // Debug log
    
    if (e.data) {
      if (typeof e.data === 'string') return e.data
      if (e.data.detail) return e.data.detail
      if (e.data.non_field_errors) {
        return Array.isArray(e.data.non_field_errors) 
          ? e.data.non_field_errors[0] 
          : e.data.non_field_errors
      }
      if (e.data.email) {
        return `Email: ${Array.isArray(e.data.email) ? e.data.email[0] : e.data.email}`
      }
      if (e.data.password) {
        return `Password: ${Array.isArray(e.data.password) ? e.data.password[0] : e.data.password}`
      }
      
      // Generic field errors
      const firstKey = Object.keys(e.data)[0]
      if (firstKey) {
        const value = e.data[firstKey]
        return `${firstKey}: ${Array.isArray(value) ? value[0] : value}`
      }
    }
    
    if (e.message) return e.message
    if (e.statusMessage) return e.statusMessage
    
    return 'An unexpected error occurred'
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    // State
    user,
    token,
    loading,
    error,
    initialized,
    // Getters
    isAuthenticated,
    isAdmin,
    isSuperuser,
    fullName,
    userInitials,
    // Actions
    login,
    register,
    logout,
    initializeAuth,
    clearError
  }
})