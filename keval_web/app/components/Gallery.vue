<template>
  <section class="gallery-container py-20 px-4 bg-gray-50/50">
    <div class="max-w-7xl mx-auto rounded-[2.5rem] p-4 md:p-10 ">
      
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div class="max-w-xl">
          <h2 class="text-5xl font-black text-gray-900 uppercase leading-none">
            {{ isPortfolioPage ? 'Our Full Portfolio' : 'Our Work' }}
          </h2>
          <p class="text-kevalgray-500 mt-4 text-lg">Premium solutions, precisely executed.</p>
        </div>
        
        <UButton
          v-if="limit"
          to="/portfolio"
          size="xl"
          class="rounded-full px-8 bg-kevalgreen-500 hover:bg-kevalorange-500 transition-colors font-bold uppercase"
        >
          Explore All
        </UButton>
      </div>

      <CategoryNav class="mb-10" />

      <div v-if="!gallery.loading" class="space-y-12">
        <div v-if="mainFeatured" class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          <div class="relative h-full min-h-[500px]">
            <ProjectCard :project="mainFeatured" is-large />
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div v-for="project in secondaryProjects" :key="project.id">
              <ProjectCard :project="project" />
            </div>
          </div>
        </div>

        <div v-if="!limit && remainingProjects.length > 0" 
             class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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