<!-- ~/pages/login.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center justify-center mb-8">
          <img src="/logo-white.png" alt="Keval Print" class="h-12">
        </NuxtLink>

        <!-- Login Form Component -->
        <LoginForm />

        <!-- Back to Home -->
        <p class="text-center mt-8">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2" />
            Back to Home
          </NuxtLink>
        </p>
      </div>
    </div>

    <!-- Right Side - Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:flex-1 bg-kevalgreen-600 relative overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-kevalgreen-500 to-kevalgreen-700"></div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center px-12 text-white">
        <h1 class="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p class="text-xl text-kevalgreen-100 mb-8">
          Access your dashboard to manage projects and track orders.
        </p>

        <!-- Features List -->
        <ul class="space-y-4">
          <li class="flex items-center">
            <Icon name="heroicons:check-circle" class="w-6 h-6 mr-3 text-kevalorange-400" />
            <span>Track your print orders in real-time</span>
          </li>
          <li class="flex items-center">
            <Icon name="heroicons:check-circle" class="w-6 h-6 mr-3 text-kevalorange-400" />
            <span>Access project history and invoices</span>
          </li>
          <li class="flex items-center">
            <Icon name="heroicons:check-circle" class="w-6 h-6 mr-3 text-kevalorange-400" />
            <span>Direct communication with our team</span>
          </li>
        </ul>

        <!-- Testimonial -->
        <div class="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
          <p class="italic text-kevalgreen-100">
            "Keval Print has been our go-to for all branding needs. Exceptional quality and service!"
          </p>
          <div class="flex items-center mt-4">
            <div class="w-10 h-10 bg-kevalorange-400 rounded-full flex items-center justify-center font-bold">
              JM
            </div>
            <div class="ml-3">
              <p class="font-semibold">John Mwangi</p>
              <p class="text-sm text-kevalgreen-200">CEO, TechCorp Ltd</p>
            </div>
          </div>
        </div>
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
  title: 'Login | Keval Print',
  description: 'Sign in to your Keval Print account to manage orders and projects.'
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