// ~/stores/core.ts
import { defineStore } from 'pinia'
import type { Banner, CoreValue, WhyChooseUs } from '~/types/api'

export const useCoreStore = defineStore('core', () => {
  // --- State ---
  const banners = ref<Banner[]>([])
  const values = ref<CoreValue[]>([])
  const whyChooseUs = ref<WhyChooseUs[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  const sortedBanners = computed(() => 
    [...banners.value].sort((a, b) => a.order - b.order)
  )

  const activeBanners = computed(() => 
    sortedBanners.value.filter(b => b.is_active)
  )

  // --- Actions ---
  
  /**
   * Fetch all banners
   */
  async function fetchBanners() {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<Banner[]>('/api/core/banners/')
      banners.value = data
    } catch (e: any) {
      error.value = 'Failed to fetch banners'
      console.error('Failed to fetch banners:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch core values
   */
  async function fetchValues() {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<CoreValue[]>('/api/core/values/')
      values.value = data
    } catch (e: any) {
      error.value = 'Failed to fetch core values'
      console.error('Failed to fetch core values:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch why choose us items
   */
  async function fetchWhyChooseUs() {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch<WhyChooseUs[]>('/api/core/why-choose-us/')
      whyChooseUs.value = data
    } catch (e: any) {
      error.value = 'Failed to fetch why choose us'
      console.error('Failed to fetch why choose us:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch all core content at once
   */
  async function fetchAllCoreContent() {
    loading.value = true
    error.value = null

    try {
      const [bannersData, valuesData, whyChooseUsData] = await Promise.all([
        $fetch<Banner[]>('/api/core/banners/'),
        $fetch<CoreValue[]>('/api/core/values/'),
        $fetch<WhyChooseUs[]>('/api/core/why-choose-us/')
      ])

      banners.value = bannersData
      values.value = valuesData
      whyChooseUs.value = whyChooseUsData
    } catch (e: any) {
      error.value = 'Failed to fetch core content'
      console.error('Failed to fetch core content:', e)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    banners,
    values,
    whyChooseUs,
    loading,
    error,

    // Getters
    sortedBanners,
    activeBanners,

    // Actions
    fetchBanners,
    fetchValues,
    fetchWhyChooseUs,
    fetchAllCoreContent
  }
})