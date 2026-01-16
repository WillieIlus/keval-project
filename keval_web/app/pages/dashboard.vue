<!-- ~/pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="flex items-center">
            <img src="/logo-white.png" alt="Keval" class="h-8">
          </NuxtLink>

          <div class="flex items-center gap-4">
            <UButton to="/" variant="ghost" color="gray">
              <UIcon name="i-heroicons-home" class="w-5 h-5" />
            </UButton>
            
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UButton color="gray" variant="ghost" class="gap-2">
                <UAvatar :text="auth.userInitials" size="sm" class="bg-kevalgreen-500 text-white" />
                <span class="hidden sm:inline">{{ auth.fullName }}</span>
                <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
              </UButton>
            </UDropdown>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- Sidebar Navigation -->
        <aside class="w-64 shrink-0 hidden lg:block">
          <nav class="bg-white rounded-xl shadow-sm p-4 sticky top-24">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Content Management</p>
            <ul class="space-y-1">
              <li v-for="item in menuItems" :key="item.to">
                <NuxtLink 
                  :to="item.to"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  active-class="bg-kevalgreen-50 text-kevalgreen-700"
                >
                  <UIcon :name="item.icon" class="w-5 h-5" />
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
          <NuxtPage />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'auth'
})

const auth = useAuthStore()

const menuItems = [
  { label: 'Overview', to: '/dashboard', icon: 'i-heroicons-squares-2x2' },
  { label: 'Banners', to: '/dashboard/banners', icon: 'i-heroicons-photo' },
  { label: 'Clients', to: '/dashboard/clients', icon: 'i-heroicons-building-office' },
  { label: 'Testimonials', to: '/dashboard/testimonials', icon: 'i-heroicons-chat-bubble-left-right' },
  { label: 'Team', to: '/dashboard/team', icon: 'i-heroicons-users' },
  { label: 'Projects', to: '/dashboard/projects', icon: 'i-heroicons-rectangle-stack' },
  { label: 'Core Values', to: '/dashboard/values', icon: 'i-heroicons-heart' },
  { label: 'Why Choose Us', to: '/dashboard/why-choose-us', icon: 'i-heroicons-star' }
]

const userMenuItems = computed(() => [
  [{ label: auth.user?.email || 'User', disabled: true }],
  [{ label: 'Sign Out', icon: 'i-heroicons-arrow-right-on-rectangle', click: () => auth.logout('/') }]
])

onMounted(() => {
  auth.initializeAuth()
})
</script>