<template #default="{ item }">
  <div class="h-full">
  <section class="py-20 bg-gray-50 overflow-hidden" aria-labelledby="testimonials-title">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="text-center mb-16">
        <h2 id="testimonials-title" class="text-4xl font-black text-gray-900 uppercase">
          Client Stories
        </h2>
        <div class="w-16 h-1 bg-kevalgreen-500 mx-auto mt-4"></div>
      </div>

      <div v-if="socialStore.loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="n in 2" :key="n" class="h-64 bg-white animate-pulse rounded-[2rem]"></div>
      </div>

      <UCarousel
        v-else
        v-slot="{ item }"
        :items="socialStore.testimonials"
        :ui="{ 
          item: 'basis-full lg:basis-1/2 px-4',
          container: '-mx-4 py-6',
          prev: 'absolute -left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-kevalgreen-500 disabled:opacity-0',
          next: 'absolute -right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 text-kevalgreen-500 disabled:opacity-0'
        }"
        arrows
        class="w-full"
      >
        <div class="h-full">
          <div class="h-full bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col hover:border-kevalgreen-500/50 transition-all duration-300">
            
            <div class="flex items-center gap-5 mb-6">
              <UAvatar
                :src="item.avatar || '/default-avatar.png'"
                :alt="`${item.client_name} avatar`"
                size="xl"
                class="ring-4 ring-kevalgreen-50 transition-transform group-hover:scale-110"
              />
              <div>
                <h4 class="font-bold text-gray-900 text-lg leading-tight">{{ item.client_name }}</h4>
                <p class="text-kevalgreen-500 text-xs font-black uppercase mt-1 tracking-widest">
                  {{ item.position || 'Verified Client' }}
                </p>
              </div>
            </div>

            <blockquote class="text-kevalgray-500 italic leading-relaxed mb-8 flex-grow text-lg">
              "{{ item.content }}"
            </blockquote>

            <div class="flex items-center justify-between pt-6 border-t border-gray-50">
              <div class="flex gap-1" :aria-label="`Rating: ${item.rating} out of 5 stars`">
                <UIcon 
                  v-for="star in 5" 
                  :key="star"
                  name="i-heroicons-star-solid" 
                  class="w-5 h-5 transition-colors"
                  :class="star <= (item.rating || 5) ? 'text-kevalorange-500' : 'text-gray-200'"
                />
              </div>
              
              <span v-if="item.company" class="text-sm text-gray-400">{{ item.company }}</span>
            </div>

          </div>
        </div>
      </UCarousel>

    </div>
  </section>
  </div>
</template>

<script setup lang="ts">
import { useSocialProofStore } from '~/stores/social-proof'

const socialStore = useSocialProofStore()

onMounted(() => {
  if (socialStore.testimonials.length === 0) {
    socialStore.initSocialProof()
  }
})
</script>