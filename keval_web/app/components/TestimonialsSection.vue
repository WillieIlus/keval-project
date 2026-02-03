<template>
  <section class="py-12 md:py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-center text-kevalgreen-500 mb-8">
        What Our Clients Say
      </h2>
      
      <div v-if="socialStore.loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="bg-gray-50 p-5 rounded-lg animate-pulse h-32"></div>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="testimonial in socialStore.testimonials" 
          :key="testimonial.id"
          class="bg-gray-50 p-5 rounded-lg border border-gray-100"
        >
          <div class="flex items-center gap-3 mb-3">
            <UAvatar 
              :src="testimonial.avatar"
              :text="getInitials(testimonial.client_name)"
              size="sm" 
              class="bg-kevalgreen-500 text-white"
            />
            <div>
              <p class="font-semibold text-gray-900 text-sm">{{ testimonial.client_name }}</p>
              <p class="text-xs text-gray-500">
                {{ testimonial.position }}
                <span v-if="testimonial.company">, {{ testimonial.company }}</span>
              </p>
            </div>
          </div>
          <p class="text-gray-600 text-sm italic">"{{ testimonial.content }}"</p>
          <div class="flex gap-0.5 mt-3">
            <UIcon 
              v-for="star in 5" 
              :key="star"
              name="i-heroicons-star-solid" 
              :class="star <= (testimonial.rating || 5) ? 'text-kevalorange-500' : 'text-gray-200'"
              class="w-4 h-4" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSocialProofStore } from '~/stores/social-proof'

const socialStore = useSocialProofStore()

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}

onMounted(() => {
  if (socialStore.testimonials.length === 0) {
    socialStore.fetchTestimonials()
  }
})
</script>