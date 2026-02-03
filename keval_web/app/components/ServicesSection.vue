<template>
  <section class="py-12 md:py-16 bg-gray-50 overflow-hidden" aria-label="Our Services">
    <div class="max-w-6xl mx-auto px-4">
      
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight">Our Services</h2>
        <p class="text-kevalgray-500 mt-2 text-sm max-w-xl mx-auto">
          Comprehensive branding and printing solutions tailored to your needs.
        </p>
      </div>

      <div v-if="galleryStore.loading" class="flex gap-4 overflow-hidden">
        <div v-for="n in 4" :key="n" class="min-w-[240px] h-56 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <UCarousel
        v-else
        v-slot="{ item }"
        :items="galleryStore.categories"
        :ui="{ 
          item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-6', 
          container: '-ml-6 py-6'
        }"
        indicators
        arrows
        class="w-full"
      >
        <div class="h-full">
          <div 
            class="group h-full rounded-lg p-5 border border-gray-200/80 hover:border-kevalgreen-500/40 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
          >
            <div class="mb-4 p-3 bg-kevalgreen-50 rounded-md group-hover:bg-kevalgreen-500 transition-colors duration-300">
              <UIcon 
                :name="item.icon || 'i-heroicons-swatch'" 
                class="w-7 h-7 text-kevalgreen-500 group-hover:text-white transition-colors duration-300" 
                :alt="item.name"
              />
            </div>

            <h3 class="text-base font-semibold text-gray-900 mb-2 line-clamp-1" :title="item.name">
              {{ item.name }}
            </h3>

            <p class="text-kevalgray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
              {{ item.description || 'Premium quality services designed to elevate your brand identity.' }}
            </p>

            <NuxtLink 
              :to="`/portfolio?category=${item.id}`"
              class="mt-auto px-4 py-1.5 bg-kevalgreen-500 text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-kevalgreen-600 transition-colors outline-none"
              :aria-label="`Explore ${item.name} services`"
            >
              Explore
            </NuxtLink>
          </div>
        </div>
      </UCarousel>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'

const galleryStore = useGalleryStore()

onMounted(() => {
  // Ensure categories are loaded
  if (galleryStore.categories.length === 0) {
    galleryStore.fetchCategories()
  }
})
</script>

<style scoped>
/* Optional: Customize carousel arrow positioning if needed */
:deep(.carousel-arrow-prev) {
  left: -20px;
}
:deep(.carousel-arrow-next) {
  right: -20px;
}
</style>