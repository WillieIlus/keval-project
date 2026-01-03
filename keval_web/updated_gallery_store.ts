// ~/stores/gallery.ts
import { defineStore } from 'pinia'
import type { ServiceCategory, Project } from '~/types/api'

export const useGalleryStore = defineStore('gallery', () => {
  // --- State ---
  const categories = ref<ServiceCategory[]>([])
  const currentProject = ref<Project | null>(null)
  const currentCategory = ref<ServiceCategory | null>(null)
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const loaded = reactive({
    categories: false
  })

  // --- Getters ---
  
  /**
   * Flatten all projects from all categories and subcategories
   */
  const allProjects = computed(() => {
    const projects: Project[] = []
    
    const traverse = (cats: ServiceCategory[]) => {
      cats.forEach(cat => {
        if (cat.projects && cat.projects.length > 0) {
          projects.push(...cat.projects)
        }
        if (cat.subcategories && cat.subcategories.length > 0) {
          traverse(cat.subcategories)
        }
      })
    }
    
    traverse(categories.value)
    return projects
  })

  /**
   * Get only featured projects
   */
  const featuredProjects = computed(() => 
    allProjects.value.filter(p => p.is_featured)
  )

  /**
   * Get projects sorted by date (newest first)
   */
  const recentProjects = computed(() =>
    [...allProjects.value].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  )

  /**
   * Get only top-level categories (no parent)
   */
  const topLevelCategories = computed(() =>
    categories.value.filter(cat => !cat.parent)
  )

  /**
   * Count total number of projects
   */
  const totalProjects = computed(() => allProjects.value.length)

  /**
   * Get category by slug
   */
  const getCategoryBySlug = computed(() => {
    return (slug: string): ServiceCategory | null => {
      const findCategory = (cats: ServiceCategory[]): ServiceCategory | null => {
        for (const cat of cats) {
          if (cat.slug === slug) return cat
          
          if (cat.subcategories && cat.subcategories.length > 0) {
            const found = findCategory(cat.subcategories)
            if (found) return found
          }
        }
        return null
      }
      
      return findCategory(categories.value)
    }
  })

  /**
   * Get project by slug from all projects
   */
  const getProjectBySlug = computed(() => {
    return (slug: string): Project | null => {
      return allProjects.value.find(p => p.slug === slug) || null
    }
  })

  /**
   * Get projects for a specific category
   */
  const getProjectsByCategory = computed(() => {
    return (categoryId: number): Project[] => {
      const findProjects = (cats: ServiceCategory[]): Project[] => {
        let projects: Project[] = []
        
        cats.forEach(cat => {
          if (cat.id === categoryId && cat.projects) {
            projects.push(...cat.projects)
          }
          if (cat.subcategories && cat.subcategories.length > 0) {
            projects.push(...findProjects(cat.subcategories))
          }
        })
        
        return projects
      }
      
      return findProjects(categories.value)
    }
  })

  // --- Actions ---

  /**
   * Fetch all categories with nested projects and subcategories
   */
  async function fetchCategories(force = false) {
    if (loaded.categories && !force) return

    loading.value = true
    error.value = null
    
    try {
      const data = await $fetch<ServiceCategory[]>('/api/portfolio/categories/')
      categories.value = data
      loaded.categories = true
      
      return data
    } catch (e: any) {
      error.value = 'Failed to fetch gallery categories'
      console.error('Failed to fetch gallery:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a specific project by slug
   */
  async function fetchProjectBySlug(slug: string) {
    loading.value = true
    error.value = null
    
    try {
      const data = await $fetch<Project>(`/api/portfolio/project/${slug}/`)
      currentProject.value = data
      
      return data
    } catch (e: any) {
      error.value = 'Failed to fetch project'
      console.error('Failed to fetch project:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  /**
   * Set current category by slug
   */
  function setCurrentCategoryBySlug(slug: string) {
    currentCategory.value = getCategoryBySlug.value(slug)
    return currentCategory.value
  }

  /**
   * Clear current project
   */
  function clearCurrentProject() {
    currentProject.value = null
  }

  /**
   * Clear current category
   */
  function clearCurrentCategory() {
    currentCategory.value = null
  }

  /**
   * Search projects by title or description
   */
  function searchProjects(query: string): Project[] {
    const lowerQuery = query.toLowerCase()
    
    return allProjects.value.filter(project => 
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      project.client.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * Filter projects by criteria
   */
  function filterProjects(filters: {
    categoryId?: number
    printMethod?: string
    material?: string
    isFeatured?: boolean
  }): Project[] {
    let filtered = [...allProjects.value]

    if (filters.categoryId !== undefined) {
      filtered = getProjectsByCategory.value(filters.categoryId)
    }

    if (filters.printMethod) {
      filtered = filtered.filter(p => 
        p.print_method.toLowerCase().includes(filters.printMethod!.toLowerCase())
      )
    }

    if (filters.material) {
      filtered = filtered.filter(p => 
        p.material_used.toLowerCase().includes(filters.material!.toLowerCase())
      )
    }

    if (filters.isFeatured !== undefined) {
      filtered = filtered.filter(p => p.is_featured === filters.isFeatured)
    }

    return filtered
  }

  /**
   * Clear error message
   */
  function clearError() {
    error.value = null
  }

  /**
   * Reset all data
   */
  function resetAll() {
    categories.value = []
    currentProject.value = null
    currentCategory.value = null
    loaded.categories = false
    error.value = null
  }

  return {
    // State
    categories,
    currentProject,
    currentCategory,
    loading,
    error,
    loaded,
    
    // Getters
    allProjects,
    featuredProjects,
    recentProjects,
    topLevelCategories,
    totalProjects,
    getCategoryBySlug,
    getProjectBySlug,
    getProjectsByCategory,
    
    // Actions
    fetchCategories,
    fetchProjectBySlug,
    setCurrentCategoryBySlug,
    clearCurrentProject,
    clearCurrentCategory,
    searchProjects,
    filterProjects,
    clearError,
    resetAll
  }
})