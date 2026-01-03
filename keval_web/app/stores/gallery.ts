// ~/stores/gallery.ts
import { defineStore } from 'pinia'
import type { ServiceCategory, Project } from '~/types/api'

export const useGalleryStore = defineStore('gallery', () => {
  const { $api } = useNuxtApp()

  // --- State ---
  const categories = ref<ServiceCategory[]>([])
  const currentProject = ref<Project | null>(null)
  const selectedCategoryId = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // --- Getters (Logic preserved from original file) ---
  
  const allProjects = computed(() => {
    const projects: Project[] = []
    const traverse = (cats: ServiceCategory[]) => {
      cats.forEach(cat => {
        if (cat.projects?.length) projects.push(...cat.projects) // [cite: 56]
        if (cat.subcategories?.length) traverse(cat.subcategories)
      })
    }
    traverse(categories.value)
    return projects
  })

  const featuredProjects = computed(() => 
    allProjects.value.filter(p => p.is_featured)
  )

  const totalProjects = computed(() => allProjects.value.length)

  const getProjectBySlug = computed(() => (slug: string) => 
    allProjects.value.find(p => p.slug === slug) || null // [cite: 61]
  )

  // --- Actions ---

  async function fetchCategories() {
    // Return if already loaded to prevent duplicate fetches
    if (categories.value.length > 0) return 

    loading.value = true
    error.value = null
    try {
      // NOTE: Using the plugin!
      const data = await $api<ServiceCategory[]>('/api/portfolio/categories/') // [cite: 63]
      categories.value = data
    } catch (e: any) {
      error.value = 'Failed to fetch gallery categories'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function fetchProjectBySlug(slug: string) {
    loading.value = true
    error.value = null
    try {
      const data = await $api<Project>(`/api/portfolio/project/${slug}/`) // [cite: 65]
      currentProject.value = data
      return data
    } catch (e: any) {
      error.value = 'Failed to fetch project'
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearCurrentProject() {
    currentProject.value = null
  }

  function setSelectedCategory(id: number | null) {
    selectedCategoryId.value = id
  }


  return {
    categories,
    currentProject,
    loading,
    error,
    allProjects,
    featuredProjects,
    totalProjects,
    getProjectBySlug,
    selectedCategoryId,
    setSelectedCategory,
    fetchCategories,
    fetchProjectBySlug,
    clearCurrentProject
  }
})