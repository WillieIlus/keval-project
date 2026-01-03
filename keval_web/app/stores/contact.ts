import { defineStore } from 'pinia'
import type { ContactForm } from '~/types/api'

export const useContactStore = defineStore('contact', () => {
  const loading = ref(false)
  const success = ref(false)
  const error = ref<string | null>(null)

  async function submitForm(form: ContactForm) {
    loading.value = true
    error.value = null
    success.value = false
    const { $api } = useNuxtApp()

    try {
      await $api('/api/contact/', {
        method: 'POST',
        body: form
      })
      success.value = true
      return true
    } catch (e: any) {
      error.value = 'Failed to send message. Please try again.'
      console.error(e)
      throw e
    } finally {
      loading.value = false
    }
  }

  function reset() {
    success.value = false
    error.value = null
  }

  return { loading, success, error, submitForm, reset }
})