<!-- ~/components/sections/WhyChooseUsSection.vue -->
<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm">Why Us</span>
        <h2 class="text-4xl font-black text-gray-900 mt-2">Why Choose Keval?</h2>
        <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
          We combine cutting-edge technology with expert craftsmanship to deliver exceptional results.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="text-center group"
        >
          <div class="w-16 h-16 bg-kevalgreen-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-kevalgreen-500 transition-colors">
            <UIcon :name="feature.icon" class="w-8 h-8 text-kevalgreen-600 group-hover:text-white transition-colors" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: 'i-heroicons-sparkles',
    title: 'Premium Quality',
    description: 'We use only the highest quality materials and latest printing technology.'
  },
  {
    icon: 'i-heroicons-clock',
    title: 'Fast Turnaround',
    description: 'Quick delivery without compromising on quality. Rush orders available.'
  },
  {
    icon: 'i-heroicons-currency-dollar',
    title: 'Competitive Pricing',
    description: 'Best value for your money with transparent pricing and no hidden fees.'
  },
  {
    icon: 'i-heroicons-users',
    title: 'Expert Team',
    description: 'Skilled designers and technicians with years of industry experience.'
  }
]
</script>