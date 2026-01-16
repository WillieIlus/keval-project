<!-- ~/pages/dashboard/index.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
    <p class="text-gray-600 mb-8">Welcome back, {{ auth.fullName }}!</p>

    <!-- Stats Grid -->
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

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NuxtLink 
          v-for="action in quickActions" 
          :key="action.to"
          :to="action.to"
          class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', action.bg]">
            <UIcon :name="action.icon" :class="['w-6 h-6', action.color]" />
          </div>
          <span class="text-sm font-medium text-gray-700">{{ action.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useGalleryStore } from '~/stores/gallery'
import { useClientsStore } from '~/stores/clients'
import { useTestimonialsStore } from '~/stores/testimonials'
import { useCoreStore } from '~/stores/core'

const auth = useAuthStore()
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

const quickActions = [
  { label: 'Add Banner', to: '/dashboard/banners', icon: 'i-heroicons-plus', bg: 'bg-blue-100', color: 'text-blue-600' },
  { label: 'Add Client', to: '/dashboard/clients', icon: 'i-heroicons-plus', bg: 'bg-green-100', color: 'text-green-600' },
  { label: 'Add Project', to: '/dashboard/projects', icon: 'i-heroicons-plus', bg: 'bg-purple-100', color: 'text-purple-600' },
  { label: 'Add Team', to: '/dashboard/team', icon: 'i-heroicons-plus', bg: 'bg-orange-100', color: 'text-orange-600' }
]

onMounted(async () => {
  await Promise.all([
    core.fetchBanners(),
    clients.fetchClients(),
    testimonials.fetchTestimonials(),
    gallery.fetchCategories()
  ])
})
</script>