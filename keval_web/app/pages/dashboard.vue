<!-- ~/pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center">
            <img src="/logo.png" alt="Keval Print" class="h-8">
          </NuxtLink>

          <!-- User Menu -->
          <div class="flex items-center gap-4">
            <UButton to="/" variant="ghost" color="gray">
              <Icon name="heroicons:home" class="w-5 h-5" />
            </UButton>
            
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UButton color="gray" variant="ghost" class="gap-2">
                <UAvatar :text="auth.userInitials" size="sm" class="bg-kevalgreen-500 text-white" />
                <span class="hidden sm:inline">{{ auth.fullName }}</span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </UButton>
            </UDropdown>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Welcome back, {{ auth.user?.first_name || 'there' }}!
        </h1>
        <p class="text-gray-600 mt-1">Here's what's happening with your account.</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Active Projects</p>
              <p class="text-2xl font-bold text-gray-900">3</p>
            </div>
            <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center">
              <Icon name="heroicons:folder-open" class="w-6 h-6 text-kevalgreen-600" />
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
              <Icon name="heroicons:clock" class="w-6 h-6 text-orange-600" />
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
              <Icon name="heroicons:check-circle" class="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Total Spent</p>
              <p class="text-2xl font-bold text-gray-900">TZS 2.4M</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon name="heroicons:currency-dollar" class="w-6 h-6 text-blue-600" />
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
              <Icon name="heroicons:inbox" class="w-12 h-12 mx-auto mb-4 text-gray-300" />
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
              <Icon name="heroicons:plus-circle" class="w-5 h-5 mr-3" />
              New Quote Request
            </UButton>
            <UButton to="/portfolio" block variant="soft" color="gray" class="justify-start">
              <Icon name="heroicons:photo" class="w-5 h-5 mr-3" />
              Browse Portfolio
            </UButton>
            <UButton block variant="soft" color="gray" class="justify-start" disabled>
              <Icon name="heroicons:document-text" class="w-5 h-5 mr-3" />
              View Invoices
            </UButton>
            <UButton block variant="soft" color="gray" class="justify-start" disabled>
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 mr-3" />
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
  title: 'Dashboard | Keval Print'
})

const auth = useAuthStore()

// User menu items
const userMenuItems = computed(() => [
  [{
    label: auth.user?.email || 'User',
    slot: 'account',
    disabled: true
  }],
  [{
    label: 'Profile Settings',
    icon: 'i-heroicons-user-circle',
    disabled: true
  },
  {
    label: 'Order History',
    icon: 'i-heroicons-document-text',
    disabled: true
  }],
  [{
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    click: () => auth.logout('/')
  }]
])

// Initialize auth on mount
onMounted(() => {
  auth.initializeAuth()
})
</script>