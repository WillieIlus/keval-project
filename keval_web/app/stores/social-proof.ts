// ~/stores/social-proof.ts
import { defineStore } from 'pinia'
import type { Client, Testimonial } from '~/types/api'

export const useSocialProofStore = defineStore('socialProof', () => {
  const { $api } = useNuxtApp()

  // --- State ---
  const clients = ref<Client[]>([])
  const testimonials = ref<Testimonial[]>([])
  const loading = ref(false)

  // --- Getters ---
  const featuredClients = computed(() => 
    clients.value.filter(c => c.is_featured) // [cite: 41]
  )

  const recentTestimonials = computed(() => 
    [...testimonials.value].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  )

  // --- Actions ---

  async function fetchClients() {
    loading.value = true
    try {
      const data = await $api<Client[]>('/api/clients/') // [cite: 105]
      clients.value = data
    } catch (e) {
      console.error('Failed to fetch clients', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchTestimonials() {
    loading.value = true
    try {
      const data = await $api<Testimonial[]>('/api/testimonials/') // [cite: 105]
      testimonials.value = data
    } catch (e) {
      console.error('Failed to fetch testimonials', e)
    } finally {
      loading.value = false
    }
  }

  async function initSocialProof() {
    loading.value = true
    try {
      const [clientsData, testimonialsData] = await Promise.all([
        $api<Client[]>('/api/clients/'),
        $api<Testimonial[]>('/api/testimonials/')
      ])
      clients.value = clientsData
      testimonials.value = testimonialsData
    } catch (e) {
      console.error('Error loading social proof', e)
    } finally {
      loading.value = false
    }
  }

  return {
    clients,
    testimonials,
    featuredClients,
    recentTestimonials,
    loading,
    fetchClients,
    fetchTestimonials,
    initSocialProof
  }
})