<!-- ~/pages/dashboard/index.vue -->
<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
    <p class="text-gray-600 mb-8">Welcome back, {{ auth.fullName }}!</p>

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
const auth = useAuthStore()

const quickActions = [
  { label: 'Add Banner', to: '/dashboard/banners', icon: 'i-heroicons-plus', bg: 'bg-blue-100', color: 'text-blue-600' },
  { label: 'Add Client', to: '/dashboard/clients', icon: 'i-heroicons-plus', bg: 'bg-green-100', color: 'text-green-600' },
  { label: 'Add Project', to: '/dashboard/projects', icon: 'i-heroicons-plus', bg: 'bg-purple-100', color: 'text-purple-600' },
  { label: 'Add Team', to: '/dashboard/team', icon: 'i-heroicons-plus', bg: 'bg-orange-100', color: 'text-orange-600' }
]

</script>