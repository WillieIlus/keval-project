// ~/stores/testimonials.ts
import { defineStore } from 'pinia'
import type { Testimonial } from '~/types/api'

export const useTestimonialsStore = defineStore('testimonials', () => {
  const { $api } = useNuxtApp()

  const testimonials = ref<Testimonial[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const sortedByDate = computed(() =>
    [...testimonials.value].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  )

  const topRated = computed(() =>
    [...testimonials.value]
      .filter(t => t.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
  )

  const averageRating = computed(() => {
    if (testimonials.value.length === 0) return 0
    const sum = testimonials.value.reduce((acc, t) => acc + t.rating, 0)
    return Math.round((sum / testimonials.value.length) * 10) / 10
  })

  const totalTestimonials = computed(() => testimonials.value.length)

  async function fetchTestimonials() {
    if (testimonials.value.length > 0) return testimonials.value
    
    loading.value = true
    error.value = null
    
    try {
      const data = await $api<Testimonial[]>('/api/testimonials/')
      testimonials.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load testimonials'
      console.error('[Testimonials Store]', e)
      return []
    } finally {
      loading.value = false
    }
  }

  async function refreshTestimonials() {
    testimonials.value = []
    return fetchTestimonials()
  }

  return {
    testimonials,
    loading,
    error,
    sortedByDate,
    topRated,
    averageRating,
    totalTestimonials,
    fetchTestimonials,
    refreshTestimonials
  }
})