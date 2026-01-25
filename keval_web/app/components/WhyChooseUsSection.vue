<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-kevalgreen-500 mb-12">
        Why Choose Us
      </h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(item, index) in features" 
          :key="index"
          class="bg-white p-6 rounded-xl shadow-lg text-center"
        >
          <div class="w-16 h-16 bg-kevalgreen-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon :name="item.icon" class="w-8 h-8 text-kevalgreen-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ item.title }}</h3>
          <p class="text-gray-600">{{ item.description }}</p>
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