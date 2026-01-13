<!-- ~/components/sections/TestimonialsSection.vue -->
<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <span class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
        <h2 class="text-4xl font-black text-gray-900 mt-2">What Our Clients Say</h2>
      </div>

      <!-- Loading State -->
      <div v-if="testimonials.loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-kevalgreen-500 animate-spin" />
      </div>

      <!-- Testimonials Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in displayedTestimonials" 
          :key="testimonial.id"
          class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <UIcon 
              v-for="i in 5" 
              :key="i"
              name="i-heroicons-star-solid"
              :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-200'"
              class="w-5 h-5"
            />
          </div>

          <!-- Content -->
          <p class="text-gray-600 mb-6 leading-relaxed">
            "{{ testimonial.content }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-4">
            <UAvatar 
              :src="testimonial.avatar" 
              :text="getInitials(testimonial.client_name)"
              size="md"
              class="bg-kevalgreen-500 text-white"
            />
            <div>
              <p class="font-bold text-gray-900">{{ testimonial.client_name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.position }}, {{ testimonial.company }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- View More -->
      <div class="text-center mt-12">
        <NuxtLink 
          to="/testimonials" 
          class="inline-flex items-center gap-2 text-kevalgreen-600 font-semibold hover:underline"
        >
          View All Reviews
          <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTestimonialsStore } from '~/stores/testimonials'

const testimonials = useTestimonialsStore()

// Fetch on mount
onMounted(() => {
  testimonials.fetchTestimonials()
})

// Show only top 3
const displayedTestimonials = computed(() => 
  testimonials.topRated.slice(0, 3)
)

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>