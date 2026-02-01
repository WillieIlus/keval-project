<!-- ~/components/forms/LoginForm.vue -->
<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
      <p class="text-gray-500 mt-2">Sign in to your account</p>
    </div>

    <!-- Success Message (brief flash before redirect) -->
    <div v-if="loginSuccess" class="text-center py-8">
      <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
      <p class="text-lg font-medium text-gray-900">Login successful!</p>
      <p class="text-gray-500">Redirecting to dashboard...</p>
    </div>

    <template v-else>
      <!-- Error Alert -->
      <UAlert
        v-if="auth.error"
        color="error"
        variant="soft"
        class="mb-6"
        :close-button="{ icon: 'i-heroicons-x-mark', color: 'red', variant: 'link' }"
        @close="auth.clearError"
      >
        <template #title>{{ auth.error }}</template>
      </UAlert>

      <!-- Form -->
      <UForm :state="formData" :validate="validate" @submit="handleSubmit" class="space-y-6">
        <!-- Email -->
        <UFormGroup label="Email" name="email" required>
          <UInput
            v-model="formData.email"
            type="email"
            placeholder="you@example.com"
            icon="i-heroicons-envelope"
            size="lg"
            :disabled="auth.loading"
          />
        </UFormGroup>

        <!-- Password -->
        <UFormGroup label="Password" name="password" required>
          <UInput
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            icon="i-heroicons-lock-closed"
            size="lg"
            :disabled="auth.loading"
          >
            <template #trailing>
              <UButton
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                color="neutral"
                variant="link"
                :padded="false"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between">
          <UCheckbox v-model="rememberMe" label="Remember me" />
          <NuxtLink to="/forgot-password" class="text-sm text-kevalgreen-600 hover:underline">
            Forgot password?
          </NuxtLink>
        </div>

        <!-- Submit Button -->
        <UButton
          type="submit"
          block
          size="lg"
          :loading="auth.loading"
          :disabled="auth.loading"
          class="bg-kevalgreen-500 hover:bg-kevalgreen-600"
        >
          {{ auth.loading ? 'Signing in...' : 'Sign In' }}
        </UButton>
      </UForm>

      <!-- Register Link -->
      <p class="text-center mt-6 text-gray-600">
        Don't have an account?
        <NuxtLink to="/register" class="text-kevalgreen-600 font-semibold hover:underline">
          Create one
        </NuxtLink>
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type { LoginFormData } from '~/types/api'

const auth = useAuthStore()
const loginSuccess = ref(false)

// Form state
const formData = reactive<LoginFormData>({
  email: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)

// Validation
const validate = (state: LoginFormData) => {
  const errors = []
  
  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ path: 'email', message: 'Please enter a valid email' })
  }
  
  if (!state.password) {
    errors.push({ path: 'password', message: 'Password is required' })
  } else if (state.password.length < 6) {
    errors.push({ path: 'password', message: 'Password must be at least 6 characters' })
  }
  
  return errors
}

// Submit handler
async function handleSubmit() {
  try {
    await auth.login(formData)
    loginSuccess.value = true
    // Router push happens in the store
  } catch (e) {
    console.error('Login failed:', e)
    // Error is already set in the store
  }
}

// Clear errors when component mounts
onMounted(() => {
  auth.clearError()
})
</script>