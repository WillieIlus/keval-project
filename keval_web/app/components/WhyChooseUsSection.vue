<template>
  <section class="py-12 md:py-16 bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-center text-kevalgreen-500 mb-8">
        Why Choose Us
      </h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div 
          v-for="(item, index) in features" 
          :key="index"
          class="bg-white p-5 rounded-lg border border-gray-100 text-center"
        >
          <div class="w-12 h-12 bg-kevalgreen-100 rounded-md flex items-center justify-center mx-auto mb-3">
            <UIcon :name="item.icon" class="w-6 h-6 text-kevalgreen-500" />
          </div>
          <h3 class="text-base font-semibold text-gray-900 mb-1">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-heroicons-star',
    title: 'Quality Work',
    description: 'We deliver exceptional quality in every project we undertake.'
  },
  {
    icon: 'i-heroicons-clock',
    title: 'On-Time Delivery',
    description: 'Your projects are completed on schedule, every time.'
  },
  {
    icon: 'i-heroicons-users',
    title: 'Expert Team',
    description: 'Our skilled professionals bring years of experience.'
  }
]
</script>