<!-- ~/pages/register.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:flex-1 bg-kevalorange-500 relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-kevalorange-400 to-kevalorange-600"></div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center px-12 text-white">
        <h1 class="text-4xl font-bold mb-4">Join Keval Print</h1>
        <p class="text-xl text-orange-100 mb-8">
          Create an account to unlock exclusive features and streamlined ordering.
        </p>

        <!-- Benefits Grid -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <Icon name="heroicons:clock" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Save Time</h3>
            <p class="text-sm text-orange-100">Quick reorders from your history</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <Icon name="heroicons:currency-dollar" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Exclusive Pricing</h3>
            <p class="text-sm text-orange-100">Member-only discounts</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <Icon name="heroicons:document-text" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Order Tracking</h3>
            <p class="text-sm text-orange-100">Real-time status updates</p>
          </div>
          <div class="bg-white/10 rounded-xl p-5 backdrop-blur-sm">
            <Icon name="heroicons:chat-bubble-left-right" class="w-8 h-8 mb-3" />
            <h3 class="font-semibold mb-1">Priority Support</h3>
            <p class="text-sm text-orange-100">Direct access to our team</p>
          </div>
        </div>

        <!-- Stats -->
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
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Keval Print" class="h-12">
        </NuxtLink>

        <!-- Register Form Component -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <RegisterForm />
        </div>

        <!-- Back to Home -->
        <p class="text-center mt-8">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
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
  title: 'Create Account | Keval Print',
  description: 'Join Keval Print to access exclusive features, track orders, and get member discounts.'
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