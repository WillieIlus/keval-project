<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-kevalgreen-500 mb-12">
        What Our Clients Say
      </h2>
      
      <div v-if="socialStore.loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 3" :key="n" class="bg-gray-50 p-6 rounded-xl animate-pulse h-40"></div>
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="testimonial in socialStore.testimonials" 
          :key="testimonial.id"
          class="bg-gray-50 p-6 rounded-xl"
        >
          <div class="flex items-center gap-4 mb-4">
            <UAvatar 
              :src="testimonial.avatar"
              :text="getInitials(testimonial.client_name)"
              size="md" 
              class="bg-kevalgreen-500 text-white"
            />
            <div>
              <p class="font-bold text-gray-900">{{ testimonial.client_name }}</p>
              <p class="text-sm text-gray-500">
                {{ testimonial.position }}
                <span v-if="testimonial.company">, {{ testimonial.company }}</span>
              </p>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonial.content }}"</p>
          <div class="flex gap-1 mt-4">
            <UIcon 
              v-for="star in 5" 
              :key="star"
              name="i-heroicons-star-solid" 
              :class="star <= (testimonial.rating || 5) ? 'text-kevalorange-500' : 'text-gray-200'"
              class="w-5 h-5" 
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