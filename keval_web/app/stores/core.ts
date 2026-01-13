// ~/stores/core.ts
import { defineStore } from 'pinia'
import type { 
  Banner, 
  CoreValue, 
  WhyChooseUs, 
  TeamMember,
  ContactFormData,
  ContactSubmissionResponse
} from '~/types/api'

export const useCoreStore = defineStore('core', () => {
  const { $api } = useNuxtApp()

  // ============================================
  // STATE: Content
  // ============================================
  const banners = ref<Banner[]>([])
  const coreValues = ref<CoreValue[]>([])
  const whyChooseUs = ref<WhyChooseUs[]>([])
  const teamMembers = ref<TeamMember[]>([])
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ============================================
  // STATE: Contact Form
  // ============================================
  const contactForm = reactive({
    loading: false,
    success: false,
    error: null as string | null,
    lastSubmission: null as ContactSubmissionResponse | null
  })

  // ============================================
  // GETTERS
  // ============================================
  
  const activeBanners = computed(() =>
    banners.value
      .filter(b => b.is_active)
      .sort((a, b) => a.order - b.order)
  )

  const primaryBanner = computed(() => activeBanners.value[0] || null)

  const activeTeamMembers = computed(() =>
    teamMembers.value
      .filter(m => m.is_active)
      .sort((a, b) => a.order - b.order)
  )

  const teamByDepartment = computed(() => {
    const grouped: Record<string, TeamMember[]> = {}
    activeTeamMembers.value.forEach(member => {
      const dept = member.department || 'Other'
      if (!grouped[dept]) grouped[dept] = []
      grouped[dept].push(member)
    })
    return grouped
  })

  const sortedCoreValues = computed(() =>
    [...coreValues.value].sort((a, b) => a.order - b.order)
  )

  const sortedWhyChooseUs = computed(() =>
    [...whyChooseUs.value].sort((a, b) => a.order - b.order)
  )

  // ============================================
  // ACTIONS: Fetch Content (GET)
  // ============================================

  async function fetchBanners() {
    if (banners.value.length > 0) return banners.value
    
    loading.value = true
    error.value = null
    try {
      const data = await $api<Banner[]>('/api/banners/')
      banners.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load banners'
      console.error('[Core Store]', e)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchCoreValues() {
    if (coreValues.value.length > 0) return coreValues.value
    
    loading.value = true
    try {
      const data = await $api<CoreValue[]>('/api/values/')
      coreValues.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load core values'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchWhyChooseUs() {
    if (whyChooseUs.value.length > 0) return whyChooseUs.value
    
    loading.value = true
    try {
      const data = await $api<WhyChooseUs[]>('/api/why-choose-us/')
      whyChooseUs.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load features'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchTeamMembers() {
    if (teamMembers.value.length > 0) return teamMembers.value
    
    loading.value = true
    try {
      const data = await $api<TeamMember[]>('/api/team/')
      teamMembers.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to load team'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchAllContent() {
    loading.value = true
    error.value = null
    
    try {
      await Promise.all([
        fetchBanners(),
        fetchCoreValues(),
        fetchWhyChooseUs(),
        fetchTeamMembers()
      ])
    } catch (e) {
      error.value = 'Failed to load some content'
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // ACTIONS: Contact Form (POST)
  // ============================================

  async function submitContactForm(formData: ContactFormData): Promise<boolean> {
    contactForm.loading = true
    contactForm.success = false
    contactForm.error = null

    try {
      const response = await $api<ContactSubmissionResponse>('/api/contact/', {
        method: 'POST',
        body: {
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          phone: formData.phone.trim(),
          service_interest: formData.service_interest,
          message: formData.message.trim()
        }
      })

      contactForm.success = true
      contactForm.lastSubmission = response
      
      return true
    } catch (e: any) {
      contactForm.error = extractContactError(e)
      return false
    } finally {
      contactForm.loading = false
    }
  }

  function resetContactForm() {
    contactForm.loading = false
    contactForm.success = false
    contactForm.error = null
    contactForm.lastSubmission = null
  }

  // ============================================
  // HELPERS
  // ============================================

  function extractContactError(e: any): string {
    if (e.data) {
      if (e.data.detail) return e.data.detail
      if (e.data.email) return `Email: ${e.data.email[0]}`
      if (e.data.phone) return `Phone: ${e.data.phone[0]}`
      if (e.data.message) return `Message: ${e.data.message[0]}`
      if (e.data.non_field_errors) return e.data.non_field_errors[0]
    }
    return 'Failed to submit. Please try again.'
  }

  // ============================================
  // RETURN
  // ============================================
  return {
    banners,
    coreValues,
    whyChooseUs,
    teamMembers,
    loading,
    error,
    contactForm,
    activeBanners,
    primaryBanner,
    activeTeamMembers,
    teamByDepartment,
    sortedCoreValues,
    sortedWhyChooseUs,
    fetchBanners,
    fetchCoreValues,
    fetchWhyChooseUs,
    fetchTeamMembers,
    fetchAllContent,
    submitContactForm,
    resetContactForm
  }
})