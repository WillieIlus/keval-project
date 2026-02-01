<!-- ~/components/admin/DashboardStats.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Total Banners</p>
          <p class="text-2xl font-bold text-gray-900">{{ stats.banners }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Total Clients</p>
          <p class="text-2xl font-bold text-gray-900">{{ stats.clients }}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-building-office" class="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Testimonials</p>
          <p class="text-2xl font-bold text-gray-900">{{ stats.testimonials }}</p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6 text-yellow-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">Projects</p>
          <p class="text-2xl font-bold text-gray-900">{{ stats.projects }}</p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <UIcon name="i-heroicons-rectangle-stack" class="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'
import { useClientsStore } from '~/stores/clients'
import { useTestimonialsStore } from '~/stores/testimonials'
import { useCoreStore } from '~/stores/core'

const gallery = useGalleryStore()
const clients = useClientsStore()
const testimonials = useTestimonialsStore()
const core = useCoreStore()

const stats = computed(() => ({
  banners: core.banners.length,
  clients: clients.clients.length,
  testimonials: testimonials.testimonials.length,
  projects: gallery.totalProjects
}))

onMounted(async () => {
  await Promise.all([
    core.fetchBanners(),
    clients.fetchClients(),
    testimonials.fetchTestimonials(),
    gallery.fetchCategories()
  ])
})
</script>
