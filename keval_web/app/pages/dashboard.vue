<!-- ~/pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo - FIXED -->
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

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Welcome back, {{ auth.user?.first_name || 'there' }}!
        </h1>
        <p class="text-gray-600 mt-1">Here's what's happening with your account.</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Active Projects</p>
              <p class="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-folder-open" class="w-6 h-6 text-kevalgreen-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Pending Orders</p>
              <p class="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-clock" class="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Completed</p>
              <p class="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Total Spent</p>
              <p class="text-2xl font-bold text-gray-900">KES 240K</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Orders -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div class="p-6">
            <div class="text-center py-12 text-gray-500">
              <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No orders yet</p>
              <UButton to="/contact" class="mt-4" variant="outline">
                Start a Project
              </UButton>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div class="p-6 space-y-4">
            <UButton to="/contact" block variant="soft" class="justify-start">
              <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 mr-3" />
              New Quote Request
            </UButton>
            <UButton to="/portfolio" block variant="soft" color="gray" class="justify-start">
              <UIcon name="i-heroicons-photo" class="w-5 h-5 mr-3" />
              Browse Portfolio
            </UButton>
            <UButton block variant="soft" color="gray" class="justify-start" disabled>
              <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-3" />
              View Invoices
            </UButton>
            <UButton block variant="soft" color="gray" class="justify-start" disabled>
              <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 mr-3" />
              Account Settings
            </UButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  middleware: 'auth'
})

useSeoMeta({
  title: 'Dashboard | Keval'
})

const auth = useAuthStore()

const userMenuItems = computed(() => [
  [{
    label: auth.user?.email || 'User',
    disabled: true,
    class: 'text-gray-500 text-sm'
  }],
  [{
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/dashboard'
  }],
  [{
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    class: 'text-red-500',
    click: () => auth.logout('/')
  }]
])

onMounted(() => {
  auth.initializeAuth()
})
</script>