<script setup lang="ts">
import type { Client } from '~/types/api'

defineProps<{
  clients: Client[]
}>()
</script>

<template>
  <section v-if="clients.length > 0" class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Trusted By</h2>
        <p class="mt-4 text-gray-600">
          We work with businesses of all sizes to bring their vision to print.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
        <div 
          v-for="client in clients" 
          :key="client.id"
          class="group flex justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-32 items-center"
        >
          <a 
            v-if="client.website" 
            :href="client.website" 
            target="_blank" 
            :title="client.name"
            class="w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
          >
            <img 
              :src="client.logo" 
              :alt="client.name" 
              class="max-w-full max-h-20 object-contain"
            />
          </a>
          
          <div 
            v-else 
            :title="client.name"
            class="w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
          >
            <img 
              :src="client.logo" 
              :alt="client.name" 
              class="max-w-full max-h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>