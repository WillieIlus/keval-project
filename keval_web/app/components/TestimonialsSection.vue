<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-kevalgreen-500 mb-12">
        What Our Clients Say
      </h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="bg-gray-50 p-6 rounded-xl"
        >
          <div class="flex items-center gap-4 mb-4">
            <UAvatar 
              :text="testimonial.initials" 
              size="md" 
              class="bg-kevalgreen-500 text-white"
            />
            <div>
              <p class="font-bold text-gray-900">{{ testimonial.name }}</p>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonial.quote }}"</p>
          <div class="flex gap-1 mt-4">
            <UIcon 
              v-for="star in 5" 
              :key="star"
              name="i-heroicons-star-solid" 
              class="w-5 h-5 text-kevalorange-500" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'John Smith',
    initials: 'JS',
    role: 'Homeowner',
    quote: 'Absolutely fantastic work! They transformed our kitchen beyond our expectations.'
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    role: 'Business Owner',
    quote: 'Professional, reliable, and excellent craftsmanship. Highly recommended!'
  },
  {
    name: 'Mike Williams',
    initials: 'MW',
    role: 'Property Manager',
    quote: 'We use them for all our properties. Consistent quality every time.'
  }
]
</script>