<template>
  <section class="py-16 bg-white border-y border-gray-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="text-center mb-10">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
          Trusted by Industry Leaders
        </h3>
      </div>

      <div class="relative px-12">
        <UCarousel
          :items="socialStore.clients"
          :ui="{ 
            item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 justify-center',
            container: 'items-center'
          }"
          arrows
          class="w-full"
        >
          <template #default="{ item }">
            <div class="px-6 select-none">
              <img
                :src="item.logo"
                :alt="item.name"
                class="h-10 md:h-12 w-auto object-contain transition-all duration-300 filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transform hover:scale-110"
                draggable="false"
              />
            </div>
          </template>

          <template #prev="{ onClick, disabled }">
            <button 
              :disabled="disabled" 
              @click="onClick" 
              class="absolute -left-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-kevalgreen-500 disabled:opacity-20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kevalgreen-500 rounded-full"
              aria-label="Previous clients"
            >
              <UIcon name="i-heroicons-chevron-left-20-solid" class="w-8 h-8" />
            </button>
          </template>

          <template #next="{ onClick, disabled }">
            <button 
              :disabled="disabled" 
              @click="onClick" 
              class="absolute -right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-kevalgreen-500 disabled:opacity-20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kevalgreen-500 rounded-full"
              aria-label="Next clients"
            >
              <UIcon name="i-heroicons-chevron-right-20-solid" class="w-8 h-8" />
            </button>
          </template>
        </UCarousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSocialProofStore } from '~/stores/social-proof'

const socialStore = useSocialProofStore()

onMounted(() => {
  // Check if data is already loaded to avoid redundant calls
  if (socialStore.clients.length === 0) {
    socialStore.fetchClients()
  }
})
</script>