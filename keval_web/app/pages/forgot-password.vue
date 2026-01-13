<!-- ~/pages/forgot-password.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center mb-8">
        <img src="/logo-white.png" alt="Keval Logo" class="h-12">
      </NuxtLink>

      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Icon -->
        <div class="w-16 h-16 bg-kevalgreen-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-heroicons-key" class="w-8 h-8 text-kevalgreen-600" />
        </div>

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p class="text-gray-500 mt-2">No worries, we'll help you reset it.</p>
        </div>

        <!-- Coming Soon Notice -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-amber-800">Feature Coming Soon</p>
              <p class="text-sm text-amber-700 mt-1">
                Password reset is currently being implemented. Please contact us directly for assistance.
              </p>
            </div>
          </div>
        </div>

        <!-- Placeholder Form (Disabled) -->
        <form class="space-y-6" @submit.prevent>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <UInput
              type="email"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
              size="lg"
              disabled
            />
          </div>

          <UButton
            type="submit"
            block
            size="lg"
            disabled
            class="bg-gray-300 cursor-not-allowed"
          >
            Send Reset Link
          </UButton>
        </form>

        <!-- Contact Alternative -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <p class="text-sm text-gray-600 text-center mb-4">
            Need immediate assistance? Contact us directly:
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a 
              href="tel:+254711635104"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-kevalgreen-50 hover:bg-kevalgreen-100 text-kevalgreen-700 rounded-xl font-medium transition-colors"
            >
              <UIcon name="i-heroicons-phone" class="w-5 h-5" />
              Call Us
            </a>
            <a 
              href="mailto:info@keval.co.ke"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-kevalorange-50 hover:bg-kevalorange-100 text-kevalorange-700 rounded-xl font-medium transition-colors"
            >
              <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>

        <!-- Back to Login -->
        <p class="text-center mt-8">
          <NuxtLink to="/login" class="text-kevalgreen-600 font-semibold hover:underline inline-flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
            Back to Login
          </NuxtLink>
        </p>
      </div>

      <!-- Back to Home -->
      <p class="text-center mt-8">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 text-sm inline-flex items-center">
          <UIcon name="i-heroicons-home" class="w-4 h-4 mr-2" />
          Back to Home
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useSeoMeta({
  title: 'Forgot Password | Keval',
  description: 'Reset your Keval account password.'
})
</script>