import { defineStore } from 'pinia'
import type { ServiceCategory, Project } from '~/types/api'

export const usePortfolioStore = defineStore('portfolio', () => {
  const categories = ref<ServiceCategory[]>([])
  const currentProject = ref<Project | null>(null)
  const loading = ref(false)

  // Helper to flatten the nested category tree
  const allProjects = computed(() => {
    const projects: Project[] = []
    const traverse = (cats: ServiceCategory[]) => {
      for (const cat of cats) {
        if (cat.projects) projects.push(...cat.projects)
        if (cat.subcategories) traverse(cat.subcategories)
      }
    }
    traverse(categories.value)
    return projects
  })

  async function fetchCategories() {
    if (categories.value.length > 0) return

    loading.value = true
    const { $api } = useNuxtApp()
    
    try {
      // This endpoint gets the full tree (Cats -> Subcats -> Projects)
      categories.value = await $api<ServiceCategory[]>('/api/portfolio/categories/')
    } catch (e) {
      console.error('Failed to load portfolio', e)
    } finally {
      loading.value = false
    }
  }

  async function fetchProjectBySlug(slug: string) {
    loading.value = true
    const { $api } = useNuxtApp()

    try {
      currentProject.value = await $api<Project>(`/api/portfolio/project/${slug}/`)
    } catch (e) {
      console.error('Failed to load project', e)
    } finally {
      loading.value = false
    }
  }

  return { 
    categories, currentProject, loading, 
    allProjects, 
    fetchCategories, fetchProjectBySlug 
  }
})