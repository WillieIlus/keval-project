<template>
  <div v-if="project" class="min-h-screen bg-white pb-20">
    <header class="bg-gray-50 py-10 px-4">
      <div class="max-w-7xl mx-auto">
        <NuxtLink to="/" class="text-indigo-600 font-medium mb-4 inline-block">← Back to Gallery</NuxtLink>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">{{ project.title }}</h1>
        <p class="text-base text-gray-500 mt-3 max-w-2xl">{{ project.description }}</p>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-8">
        <div v-for="img in sortedImages" :key="img.id" class="rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <img :src="img.image" :alt="img.caption" class="w-full object-cover" />
          <p v-if="img.caption && img.caption !== 'none'" class="p-4 text-sm text-gray-500 bg-white italic">
            {{ img.caption }}
          </p>
        </div>
      </div>

      <aside class="lg:col-span-1">
        <div class="sticky top-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-bold mb-6 border-b pb-2">Project Specifications</h3>
          
          <div class="space-y-6">
            <div>
              <label class="text-xs font-bold text-gray-400 uppercase">Client</label>
              <p class="text-gray-900 font-medium">{{ project.client }}</p>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-400 uppercase">Print Method</label>
              <p class="text-gray-900">{{ project.print_method }}</p>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-400 uppercase">Material</label>
              <p class="text-gray-900">{{ project.material_used }}</p>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-400 uppercase">Finishing</label>
              <div class="flex flex-wrap gap-2 mt-1">
                <span 
                  v-for="tag in project.finishing.split(',')" 
                  :key="tag" 
                  class="px-2.5 py-0.5 bg-white border border-gray-200 rounded-sm text-xs text-gray-600"
                >
                  {{ tag.trim() }}
                </span>
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-400 uppercase">Completed</label>
              <p class="text-gray-900">{{ new Date(project.date_completed).toLocaleDateString() }}</p>
            </div>
          </div>

          <button class="w-full mt-6 bg-kevalgreen-500 text-white py-3 rounded font-semibold text-sm hover:bg-kevalgreen-600 transition">
            Request Similar Quote
          </button>
        </div>
      </aside>
    </div>
  </div>

  <div v-else-if="gallery.loading" class="flex justify-center items-center h-screen">
    <p class="text-xl animate-pulse">Loading project details...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGalleryStore } from '~/stores/gallery'


const route = useRoute()
const gallery = useGalleryStore()

// Get project from state or fetch if refreshing page
const project = computed(() => gallery.currentProject)

const sortedImages = computed(() => {
  if (!project.value) return []
  return [...project.value.images].sort((a, b) => a.order - b.order)
})

onMounted(async () => {
  await gallery.fetchProjectBySlug(route.params.slug as string)
})

// Cleanup when leaving
onUnmounted(() => {
  gallery.clearCurrentProject()
})
</script>