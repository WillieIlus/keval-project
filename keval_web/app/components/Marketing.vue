<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-black text-gray-900 uppercase">Our Core Values</h2>
        <div class="w-20 h-1 bg-kevalgreen-500 mx-auto mt-4"></div>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="value in marketing.values" 
          :key="value.id" 
          class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center md:text-left"
        >
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-kevalgreen-50 text-kevalgreen-500 mb-6">
            <UIcon :name="value.icon || 'i-heroicons-check-circle'" class="w-8 h-8" />
          </div>
          <h3 class="font-bold text-xl text-gray-900 mb-3">{{ value.title }}</h3>
          <p class="text-kevalgray-500 leading-relaxed">{{ value.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMarketingStore } from '~/stores/marketing'
const marketing = useMarketingStore()

onMounted(() => {
  marketing.fetchAllCoreContent()
})
</script>