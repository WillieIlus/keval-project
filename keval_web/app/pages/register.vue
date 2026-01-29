<!-- ~/pages/register.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Branding -->
    <div class="hidden lg:flex lg:flex-1 bg-kevalorange-500 relative overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-br from-kevalorange-400 to-kevalorange-600"></div>
      <div class="relative z-10 flex flex-col justify-center px-12 text-white">
        <h1 class="text-4xl font-bold mb-4">Join Keval</h1>
        <p class="text-xl text-orange-100 mb-8">
          Create an account to unlock exclusive features and streamlined ordering.
        </p>

        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <UIcon name="i-heroicons-clock" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Save Time</h3>
            <p class="text-sm text-orange-100">Quick reorders from history</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Exclusive Pricing</h3>
            <p class="text-sm text-orange-100">Member-only discounts</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <UIcon name="i-heroicons-document-text" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Order Tracking</h3>
            <p class="text-sm text-orange-100">Real-time status updates</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Priority Support</h3>
            <p class="text-sm text-orange-100">Direct access to team</p>
          </div>
        </div>

        <div class="flex gap-8 mt-12">
          <div>
            <p class="text-3xl font-bold">500+</p>
            <p class="text-orange-200">Happy Clients</p>
          </div>
          <div>
            <p class="text-3xl font-bold">2000+</p>
            <p class="text-orange-200">Projects Done</p>
          </div>
          <div>
            <p class="text-3xl font-bold">10+</p>
            <p class="text-orange-200">Years Experience</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div class="w-full max-w-md">
        <!-- Logo - FIXED -->
        <NuxtLink to="/" class="flex items-center justify-center mb-8">
          <img src="/logo-white.png" alt="Keval Logo" class="h-12">
        </NuxtLink>

        <div class="bg-white rounded-2xl shadow-xl p-8">
          <FormsRegisterForm />
        </div>

        <p class="text-center mt-8">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 mr-2" />
            Back to Home
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Create Account | Keval',
  description: 'Join Keval to access exclusive features and member discounts.'
})

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.initializeAuth()
  if (auth.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>