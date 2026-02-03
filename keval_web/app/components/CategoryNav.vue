<template>
  <div class="category-nav py-4">
    <div class="flex flex-wrap justify-center gap-2">
      <button 
        @click="gallery.setSelectedCategory(null)"
        :class="[!gallery.selectedCategoryId ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        class="px-4 py-1.5 rounded text-sm font-medium transition-colors"
      >
        All Projects
      </button>

      <button 
        v-for="cat in gallery.categories" 
        :key="cat.id"
        @click="gallery.setSelectedCategory(cat.id)"
        :class="[gallery.selectedCategoryId === cat.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
        class="px-4 py-1.5 rounded text-sm font-medium transition-colors"
      >
        {{ cat.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'

const gallery = useGalleryStore()
</script>