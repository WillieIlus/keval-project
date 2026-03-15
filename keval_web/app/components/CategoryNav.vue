<template>
  <nav class="category-nav" aria-label="Filter projects by category">
    <div class="category-nav__list">
      <button
        type="button"
        :class="['category-nav__tab', { 'category-nav__tab--active': isAllSelected }]"
        @click="selectAll"
      >
        All Projects
      </button>
      <button
        v-for="label in gallery.categoryTabs"
        :key="label"
        type="button"
        :class="['category-nav__tab', { 'category-nav__tab--active': gallery.selectedCategoryDisplayName === label }]"
        @click="gallery.setSelectedCategoryByDisplayName(label)"
      >
        {{ label }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'

const gallery = useGalleryStore()

const isAllSelected = computed(() =>
  !gallery.selectedCategoryId && !gallery.selectedCategoryDisplayName
)

function selectAll() {
  gallery.setSelectedCategory(null)
  gallery.setSelectedCategoryByDisplayName(null)
}
</script>

<style scoped>
.category-nav {
  padding: 0.5rem 0;
}

.category-nav__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.category-nav__tab {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 0.25rem;
  transition: background 0.2s ease, color 0.2s ease;
  background: #f3f4f6;
  color: #374151;
}
.category-nav__tab:hover {
  background: #e5e7eb;
}
.category-nav__tab--active {
  background: #111827;
  color: white;
}
</style>
