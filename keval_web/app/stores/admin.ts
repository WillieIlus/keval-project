// ~/stores/admin.ts
import { defineStore } from 'pinia'
import type {
  Banner,
  Client,
  CoreValue,
  WhyChooseUs,
  Testimonial,
  TeamMember,
  Project,
  ServiceCategory
} from '~/types/api'

export const useAdminStore = defineStore('admin', () => {
  const { $api } = useNuxtApp()

  // ============================================
  // STATE
  // ============================================
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  // ============================================
  // GENERIC CRUD HELPERS
  // ============================================

  async function fetchAll<T>(endpoint: string): Promise<T[]> {
    loading.value = true
    error.value = null
    try {
      const data = await $api<T[]>(endpoint)
      return data
    } catch (e: any) {
      error.value = extractError(e)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchOne<T>(endpoint: string, id: number): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      const data = await $api<T>(`${endpoint}${id}/`)
      return data
    } catch (e: any) {
      error.value = extractError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  async function create<T>(endpoint: string, formData: FormData | object): Promise<T | null> {
    loading.value = true
    error.value = null
    success.value = null
    try {
      const isFormData = formData instanceof FormData
      const data = await $api<T>(endpoint, {
        method: 'POST',
        body: isFormData ? formData : formData,
        headers: isFormData ? {} : { 'Content-Type': 'application/json' }
      })
      success.value = 'Created successfully!'
      return data
    } catch (e: any) {
      error.value = extractError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  async function update<T>(endpoint: string, id: number, formData: FormData | object): Promise<T | null> {
    loading.value = true
    error.value = null
    success.value = null
    try {
      const isFormData = formData instanceof FormData
      const data = await $api<T>(`${endpoint}${id}/`, {
        method: 'PATCH',
        body: isFormData ? formData : formData,
        headers: isFormData ? {} : { 'Content-Type': 'application/json' }
      })
      success.value = 'Updated successfully!'
      return data
    } catch (e: any) {
      error.value = extractError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  async function remove(endpoint: string, id: number): Promise<boolean> {
    loading.value = true
    error.value = null
    success.value = null
    try {
      await $api(`${endpoint}${id}/`, { method: 'DELETE' })
      success.value = 'Deleted successfully!'
      return true
    } catch (e: any) {
      error.value = extractError(e)
      return false
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // HELPER
  // ============================================

  function extractError(e: any): string {
    if (e.data) {
      if (typeof e.data === 'string') return e.data
      if (e.data.detail) return e.data.detail
      const firstKey = Object.keys(e.data)[0]
      if (firstKey) {
        const val = e.data[firstKey]
        return `${firstKey}: ${Array.isArray(val) ? val[0] : val}`
      }
    }
    return e.message || 'An error occurred'
  }

  function clearMessages() {
    error.value = null
    success.value = null
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    loading,
    error,
    success,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    clearMessages
  }
})