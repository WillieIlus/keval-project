<template>
  <nav class="border-t border-gray-100 bg-white" aria-label="Project navigation">
    <div class="max-w-7xl mx-auto flex divide-x divide-gray-100">
      
      <NuxtLink 
        v-if="prevProject" 
        :to="`/portfolio/${prevProject.slug}`"
        class="group flex-1 py-12 px-6 flex items-center justify-start gap-4 hover:bg-gray-50 transition-all duration-300"
      >
        <UIcon name="i-heroicons-arrow-left-solid" class="w-8 h-8 text-gray-300 group-hover:text-kevalgreen-500 transition-colors" />
        <div class="text-left">
          <span class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Previous</span>
          <span class="block text-lg font-bold text-gray-900 group-hover:text-kevalgreen-500 uppercase transition-colors">{{ prevProject.title }}</span>
        </div>
      </NuxtLink>

      <NuxtLink 
        v-if="nextProject" 
        :to="`/portfolio/${nextProject.slug}`"
        class="group flex-1 py-12 px-6 flex items-center justify-end gap-4 hover:bg-gray-50 transition-all duration-300"
      >
        <div class="text-right">
          <span class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Next</span>
          <span class="block text-lg font-bold text-gray-900 group-hover:text-kevalgreen-500 uppercase transition-colors">{{ nextProject.title }}</span>
        </div>
        <UIcon name="i-heroicons-arrow-right-solid" class="w-8 h-8 text-gray-300 group-hover:text-kevalgreen-500 transition-colors" />
      </NuxtLink>

    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  prevProject: any
  nextProject: any
}>()
</script>