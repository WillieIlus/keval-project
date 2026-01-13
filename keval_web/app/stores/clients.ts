// ~/stores/clients.ts
import { defineStore } from 'pinia'
import type { Client } from '~/types/api'

export const useClientsStore = defineStore('clients', () => {
  const { $api } = useNuxtApp()

  const clients = ref<Client[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const featuredClients = computed(() =>
    clients.value
      .filter(c => c.is_featured)
      .sort((a, b) => a.order - b.order)
  )

  const allClientsSorted = computed(() =>
    [...clients.value].sort((a, b) => a.order - b.order)
  )

  const totalClients = computed(() => clients.value.length)

  async function fetchClients() {
    if (clients.value.length > 0) return clients.value
    
    loading.value = true
    error.value = null
    
    try {
      const data = await $api<Client[]>('/api/clients/')
      clients.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load clients'
      console.error('[Clients Store]', e)
      return []
    } finally {
      loading.value = false
    }
  }

  async function refreshClients() {
    clients.value = []
    return fetchClients()
  }

  return {
    clients,
    loading,
    error,
    featuredClients,
    allClientsSorted,
    totalClients,
    fetchClients,
    refreshClients
  }
})