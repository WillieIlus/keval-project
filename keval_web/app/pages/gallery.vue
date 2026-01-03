<template>
  <div>
    <h1>Gallery</h1>

    <div v-if="loading">
      Loading...
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <div v-else>
      <div v-for="project in projects" :key="project.id">
        <p>{{ project.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGalleryStore } from '@/stores/gallery'

const store = useGalleryStore()

const loading = computed(() => store.loading)
const error = computed(() => store.error)
const projects = computed(() => store.allProjects)

onMounted(() => {
  store.fetchCategories()
})
</script>
