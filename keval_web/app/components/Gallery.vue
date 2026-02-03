<template>
  <section class="gallery-container py-12 md:py-16 px-4 bg-gray-50/50">
    <div class="max-w-6xl mx-auto p-4 md:p-6">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div class="max-w-lg">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight leading-tight">
            {{ isPortfolioPage ? 'Our Full Portfolio' : 'Our Work' }}
          </h2>
          <p class="text-kevalgray-500 mt-2 text-sm">Premium solutions, precisely executed.</p>
        </div>
        
        <UButton
          v-if="limit"
          to="/portfolio"
          size="sm"
          class="rounded px-5 py-2 bg-kevalgreen-500 hover:bg-kevalorange-500 transition-colors font-semibold text-sm uppercase"
        >
          Explore All
        </UButton>
      </div>

      <CategoryNav class="mb-8" />

      <div v-if="!gallery.loading" class="space-y-8">
        <div v-if="mainFeatured" class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          
          <div class="relative h-full min-h-[360px]">
            <ProjectCard :project="mainFeatured" is-large />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div v-for="project in secondaryProjects" :key="project.id">
              <ProjectCard :project="project" />
            </div>
          </div>
        </div>

        <div v-if="!limit && remainingProjects.length > 0" 
             class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="project in remainingProjects" :key="project.id">
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-20 text-gray-400">
        Loading Projects...
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'

const props = defineProps<{
  limit?: number
}>()

const gallery = useGalleryStore()
const route = useRoute()

const isPortfolioPage = computed(() => route.path === '/portfolio')

// 1. Filter the projects based on store logic
const filteredList = computed(() => {
  let list = [...gallery.allProjects]
  
  // Apply category filter if selected
  if (gallery.selectedCategoryId) {
    list = list.filter(p => p.category === gallery.selectedCategoryId)
  }

  // Sort: Featured first
  return list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
})

// 2. Apply limit only if provided (e.g., Homepage)
const displayProjects = computed(() => {
  return props.limit ? filteredList.value.slice(0, props.limit) : filteredList.value
})

// 3. Grid breakdown
const mainFeatured = computed(() => displayProjects.value[0])
const secondaryProjects = computed(() => displayProjects.value.slice(1, 5))
const remainingProjects = computed(() => displayProjects.value.slice(5))

onMounted(() => {
  // We only need to fetch categories; your store handles project extraction!
  gallery.fetchCategories()
})
</script>