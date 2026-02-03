<!-- ~/components/AppHeader.vue -->
<template>
  <nav class="fixed top-0 left-0 right-0 text-white z-50 bg-kevalgreen-500 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
      
      <!-- Left: Menu Button (Mobile) + Logo (Desktop) -->
      <div class="flex items-center flex-1 lg:flex-none">
        <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden p-2" aria-label="Open Menu">
          <UIcon name="i-heroicons-bars-3" class="w-8 h-8" />
        </button>

        <NuxtLink to="/" class="hidden lg:block">
          <img src="/logo-white.png" alt="Keval Logo" class="h-20 w-auto">
        </NuxtLink>
      </div>

      <!-- Center: Logo (Mobile) + Nav Links (Desktop) -->
      <div class="flex flex-1 justify-center">
        <NuxtLink to="/" class="lg:hidden">
          <img src="/logo-white.png" alt="Keval Logo" class="h-20 w-auto">
        </NuxtLink>

        <ul class="hidden lg:flex items-center gap-8 font-medium">
          <li><NuxtLink to="/" class="hover:text-kevalorange-500 transition">Home</NuxtLink></li>
          <li><NuxtLink to="/portfolio" class="hover:text-kevalorange-500 transition">Our Work</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-kevalorange-500 transition">About Us</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-kevalorange-500 transition">Contact</NuxtLink></li>
        </ul>
      </div>

      <!-- Right: Auth Buttons -->
      <div class="flex flex-1 lg:flex-none justify-end items-center gap-4">
        <!-- Desktop Auth -->
        <div class="hidden lg:flex items-center gap-4">
          <UColorModeButton class="p-2 hover:bg-white/10 rounded-md transition" color="neutral" />
          <!-- Not Logged In -->
          <template v-if="!auth.isAuthenticated">
            <NuxtLink to="/login" class="px-4 py-2 hover:bg-white/10 rounded-md transition">
              Login
            </NuxtLink>
            <NuxtLink to="/register" class="px-4 py-2 bg-kevalorange-500 hover:bg-orange-600 rounded-md font-bold transition">
              Sign Up
            </NuxtLink>
          </template>
          
          <!-- Logged In -->
          <template v-else>
            <NuxtLink to="/dashboard" class="px-4 py-2 hover:bg-white/10 rounded-md transition flex items-center gap-2">
              <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5" />
              Dashboard
            </NuxtLink>
            
            <UDropdown
              :items="userMenuItems"
              :popper="{ placement: 'bottom-end' }"
              :ui="{ content: 'z-[70]' }"
            >
              <button class="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-md transition">
                <UAvatar 
                  :text="auth.userInitials" 
                  size="sm" 
                  class="bg-kevalorange-500 text-white"
                />
                <span class="hidden xl:inline">{{ auth.fullName }}</span>
                <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
              </button>
            </UDropdown>
          </template>
        </div>

        <!-- Mobile Auth Button -->
        <button class="lg:hidden p-2" @click="isAuthOpen = !isAuthOpen">
          <template v-if="auth.isAuthenticated">
            <UAvatar 
              :text="auth.userInitials" 
              size="sm" 
              class="bg-kevalorange-500 text-white"
            />
          </template>
          <template v-else>
            <UIcon name="i-heroicons-user-circle" class="w-8 h-8" />
          </template>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu (Left Slide) -->
    <Transition name="slide-left">
      <div v-if="isMenuOpen" class="fixed inset-0 z-[60] lg:hidden">
        <div class="absolute inset-0 bg-black/50" @click="isMenuOpen = false"></div>
        <div class="absolute inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 flex flex-col transition-colors">
          <div class="flex justify-between items-center mb-10">
            <span class="font-black text-kevalgreen-500">MENU</span>
            <button @click="isMenuOpen = false">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
          <UColorModeButton class="mb-4" />
          <ul class="flex flex-col gap-6 text-lg font-bold">
            <li><NuxtLink to="/" @click="isMenuOpen = false">Home</NuxtLink></li>
            <li><NuxtLink to="/portfolio" @click="isMenuOpen = false">Portfolio</NuxtLink></li>
            <li><NuxtLink to="/about" @click="isMenuOpen = false">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" @click="isMenuOpen = false">Contact Us</NuxtLink></li>
          </ul>
        </div>
      </div>
    </Transition>

    <!-- Mobile Auth Menu (Right Slide) -->
    <Transition name="slide-right">
      <div v-if="isAuthOpen" class="fixed inset-0 z-[60] lg:hidden">
        <div class="absolute inset-0 bg-black/20" @click="isAuthOpen = false"></div>
        <div class="absolute inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors">
          <div class="flex justify-between items-center mb-10">
            <button @click="isAuthOpen = false">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
            <span class="font-black text-kevalorange-500">ACCOUNT</span>
          </div>
          
          <!-- Not Logged In -->
          <template v-if="!auth.isAuthenticated">
            <div class="flex flex-col gap-4">
              <NuxtLink 
                to="/login" 
                @click="isAuthOpen = false" 
                class="w-full py-3 text-center border-2 border-kevalgreen-500 rounded-xl font-semibold"
              >
                Login
              </NuxtLink>
              <NuxtLink 
                to="/register" 
                @click="isAuthOpen = false" 
                class="w-full py-3 text-center bg-kevalgreen-500 text-white rounded-xl font-semibold"
              >
                Sign Up
              </NuxtLink>
            </div>
          </template>
          
          <!-- Logged In -->
          <template v-else>
            <div class="mb-6 text-center">
              <UAvatar 
                :text="auth.userInitials" 
                size="lg" 
                class="bg-kevalgreen-500 text-white mx-auto mb-3"
              />
              <p class="font-bold text-gray-900">{{ auth.fullName }}</p>
              <p class="text-sm text-gray-500">{{ auth.user?.email }}</p>
            </div>
            
            <div class="flex flex-col gap-3">
              <NuxtLink 
                to="/dashboard" 
                @click="isAuthOpen = false" 
                class="w-full py-3 text-center bg-kevalgreen-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5" />
                Dashboard
              </NuxtLink>
              <button 
                @click="handleLogout" 
                class="w-full py-3 text-center border-2 border-red-500 text-red-500 rounded-xl font-semibold"
              >
                Sign Out
              </button>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const isMenuOpen = ref(false)
const isAuthOpen = ref(false)

// User dropdown menu items
const userMenuItems = computed(() => [
  [{
    label: auth.user?.email || '',
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
    click: () => auth.logout()
  }]
])

// Handle logout from mobile menu
function handleLogout() {
  isAuthOpen.value = false
  auth.logout('/')
}


// Close menus when changing routes
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
  isAuthOpen.value = false
})
</script>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>