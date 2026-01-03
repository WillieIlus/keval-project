<template>
  <section class="py-20 bg-gray-50 overflow-hidden" aria-label="Our Services">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="text-center mb-16">
        <h2 class="text-4xl font-black text-gray-900 uppercase">Our Services</h2>
        <p class="text-kevalgray-500 mt-4 max-w-2xl mx-auto">
          Comprehensive branding and printing solutions tailored to your needs.
        </p>
      </div>

      <div v-if="galleryStore.loading" class="flex gap-6 overflow-hidden">
        <div v-for="n in 4" :key="n" class="min-w-[300px] h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
      </div>

      <UCarousel
        v-else
        v-slot="{ item }"
        :items="galleryStore.categories"
        :ui="{ 
          item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-6', 
          container: '-ml-6 py-10' // Negative margin compensates for item padding
        }"
        indicators
        arrows
        class="w-full"
      >
        <div class="h-full">
          <div 
            class="group h-full  rounded-2xl p-8 hover:shadow-xl hover:border-kevalgreen-500/30 transition-all duration-300 hover:scale-[1.03] flex flex-col items-center text-center"
          >
            <div class="mb-6 p-4 bg-kevalgreen-50 rounded-full group-hover:bg-kevalgreen-500 transition-colors duration-300">
              <UIcon 
                :name="item.icon || 'i-heroicons-swatch'" 
                class="w-10 h-10 text-kevalgreen-500 group-hover:text-white transition-colors duration-300" 
                :alt="item.name"
              />
            </div>

            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-1" :title="item.name">
              {{ item.name }}
            </h3>

            <p class="text-kevalgray-500 text-sm leading-relaxed mb-8 line-clamp-2 flex-grow">
              {{ item.description || 'Premium quality services designed to elevate your brand identity.' }}
            </p>

            <NuxtLink 
              :to="`/portfolio?category=${item.id}`"
              class="mt-auto px-6 py-2 bg-kevalgreen-500 text-white text-sm font-bold uppercase tracking-wide rounded-lg hover:bg-kevalgreen-600 focus:ring-4 focus:ring-kevalgreen-500/30 transition-all duration-200 outline-none"
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