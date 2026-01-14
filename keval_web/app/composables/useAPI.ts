// ~/composables/useApi.ts

/**
 * Composable for making authenticated API requests
 * Automatically adds auth token and handles errors
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  /**
   * Make an authenticated API request
   */
  const apiFetch = async <T>(
    url: string,
    options?: RequestInit & { 
      baseURL?: string
      skipAuth?: boolean
    }
  ): Promise<T> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }

    // Add auth token if available and not skipped
    if (authStore.token && !options?.skipAuth) {
      headers['Authorization'] = `Token ${authStore.token}`
    }

    try {
      const response = await $fetch<T>(url, {
        baseURL: options?.baseURL || config.public.apiBase,
        ...options,
        headers
      })

      return response
    } catch (error: any) {
      // Handle 401 - Unauthorized
      if (error.response?.status === 401 || error.statusCode === 401) {
        authStore.logout()
      }
      
      throw error
    }
  }

  return {
    apiFetch
  }
}

/**
 * Composable for handling API errors
 */
export const useApiError = () => {
  const extractErrorMessage = (error: any): string => {
    if (!error) return 'An unknown error occurred'
    
    // Handle different Django error formats
    if (error.data) {
      // Non-field errors
      if (error.data.non_field_errors) {
        return Array.isArray(error.data.non_field_errors)
          ? error.data.non_field_errors[0]
          : error.data.non_field_errors
      }
      
      // Detail error
      if (error.data.detail) {
        return error.data.detail
      }
      
      // Field errors
      const fieldErrors: string[] = []
      Object.keys(error.data).forEach(key => {
        const value = error.data[key]
        if (Array.isArray(value)) {
          fieldErrors.push(`${key}: ${value.join(', ')}`)
        } else if (typeof value === 'string') {
          fieldErrors.push(`${key}: ${value}`)
        }
      })
      
      if (fieldErrors.length > 0) {
        return fieldErrors.join('; ')
      }
    }
    
    // Fallback to error message
    if (error.message) {
      return error.message
    }
    
    return 'An error occurred while processing your request'
  }

  return {
    extractErrorMessage
  }
}

/**
 * Composable for handling loading states
 */
export const useLoadingState = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const withLoading = async <T>(
    fn: () => Promise<T>,
    options?: {
      onError?: (error: any) => void
      onSuccess?: (data: T) => void
    }
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const result = await fn()
      
      if (options?.onSuccess) {
        options.onSuccess(result)
      }
      
      return result
    } catch (e: any) {
      const { extractErrorMessage } = useApiError()
      error.value = extractErrorMessage(e)
      
      if (options?.onError) {
        options.onError(e)
      }
      
      return null
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    withLoading,
    clearError
  }
}

/**
 * Composable for image URLs
 * Handles both full URLs and relative paths from Django
 */
export const useImageUrl = () => {
  const config = useRuntimeConfig()

  const getImageUrl = (imagePath: string | null | undefined): string => {
    if (!imagePath) return '/placeholder.jpg'
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Remove /api from base URL and add /media
    const baseUrl = config.public.apiBase.replace('/api', '')
    
    // Remove leading slash if present
    const path = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
    
    return `${baseUrl}/${path}`
  }

  return {
    getImageUrl
  }
}

/**
 * Composable for form handling
 * RENAMED from useForm to useFormState to avoid conflict with vee-validate
 */
export const useFormState = <T extends Record<string, any>>(initialValues: T) => {
  const form = reactive<T>({ ...initialValues })
  const errors = ref<Partial<Record<keyof T, string>>>({})
  const touched = ref<Partial<Record<keyof T, boolean>>>({})

  const resetForm = () => {
    Object.keys(initialValues).forEach(key => {
      (form as any)[key] = initialValues[key as keyof T]
    })
    errors.value = {}
    touched.value = {}
  }

  const setFieldError = (field: keyof T, message: string) => {
    errors.value[field] = message
  }

  const clearFieldError = (field: keyof T) => {
    delete errors.value[field]
  }

  const touchField = (field: keyof T) => {
    touched.value[field] = true
  }

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    form,
    errors: readonly(errors),
    touched: readonly(touched),
    isValid,
    resetForm,
    setFieldError,
    clearFieldError,
    touchField
  }
}