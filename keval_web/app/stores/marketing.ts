// ~/stores/marketing.ts
import { defineStore } from 'pinia'
import type { Banner, CoreValue, WhyChooseUs, ContactSubmission } from '~/types/api'

export const useMarketingStore = defineStore('marketing', () => {
  const { $api } = useNuxtApp()

  // --- State ---
  const banners = ref<Banner[]>([])
  const values = ref<CoreValue[]>([])
  const whyChooseUs = ref<WhyChooseUs[]>([])
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters ---
  const sortedBanners = computed(() => 
    [...banners.value].sort((a, b) => a.order - b.order) // 
  )
  
  const activeBanners = computed(() => 
    sortedBanners.value.filter(b => b.is_active)
  )

  // --- Actions ---

  async function fetchBanners() {
    try {
      const data = await $api<Banner[]>('/api/banners/') // [cite: 49]
      banners.value = data
    } catch (e) {
      console.error('Failed to fetch banners', e)
    }
  }

  async function fetchAllCoreContent() {
    loading.value = true
    try {
      // Parallel requests using the plugin
      const [bannersData, valuesData, whyData] = await Promise.all([
        $api<Banner[]>('/api/banners/'),
        $api<CoreValue[]>('/api/values/'),
        $api<WhyChooseUs[]>('/api/why-choose-us/')
      ])

      banners.value = bannersData
      values.value = valuesData
      whyChooseUs.value = whyData
    } catch (e: any) {
      error.value = 'Failed to load marketing content'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function submitContact(form: ContactSubmission) {
    try {
      await $api('/api/contact/', { // [cite: 36]
        method: 'POST',
        body: form
      })
      return true
    } catch (e) {
      throw e
    }
  }

  return {
    banners,
    values,
    whyChooseUs,
    sortedBanners,
    activeBanners,
    loading,
    error,
    fetchBanners,
    fetchAllCoreContent,
    submitContact
  }
})