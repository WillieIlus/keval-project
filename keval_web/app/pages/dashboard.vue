<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const galleryStore = useGalleryStore()

// Fetch data on mount
onMounted(async () => {
  try {
    await galleryStore.fetchCategories()
  } catch (e) {
    console.error('Failed to load data:', e)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p class="text-sm text-gray-600">
              Welcome back, {{ authStore.fullName || authStore.user?.email }}!
            </p>
          </div>

          <div class="flex items-center gap-4">
            <span 
              v-if="authStore.isAdmin" 
              class="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
            >
              Admin
            </span>

            <button
              @click="authStore.logout"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Projects -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Total Projects</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ galleryStore.totalProjects }}
              </p>
            </div>
          </div>
        </div>

        <!-- Featured Projects -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Featured</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ galleryStore.featuredProjects.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-gray-500">Categories</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ galleryStore.categories.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Projects -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Recent Projects</h2>
        </div>

        <div v-if="galleryStore.loading" class="p-6">
          <div class="flex items-center justify-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>

        <div v-else-if="galleryStore.recentProjects.length === 0" class="p-6">
          <p class="text-center text-gray-500 py-12">No projects found</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div 
            v-for="project in galleryStore.recentProjects.slice(0, 5)" 
            :key="project.id"
            class="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ project.client }} • {{ project.category_name }}
                </p>
              </div>
              
              <div class="flex items-center gap-3">
                <span 
                  v-if="project.is_featured"
                  class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded"
                >
                  Featured
                </span>

                <NuxtLink
                  :to="`/portfolio/${project.slug}`"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <NuxtLink
            to="/portfolio"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all projects →
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>