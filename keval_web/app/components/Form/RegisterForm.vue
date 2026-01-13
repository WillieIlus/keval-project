<!-- ~/components/forms/RegisterForm.vue -->
<template>
  <div class="w-full max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
      <p class="text-gray-500 mt-2">Join us to get started</p>
    </div>

    <!-- Error Alert -->
    <UAlert
      v-if="auth.error"
      color="red"
      variant="soft"
      class="mb-6"
      :close-button="{ icon: 'i-heroicons-x-mark', color: 'red', variant: 'link' }"
      @close="auth.clearError"
    >
      <template #title>{{ auth.error }}</template>
    </UAlert>

    <!-- Form -->
    <UForm :state="formData" :validate="validate" @submit="handleSubmit" class="space-y-5">
      <!-- Name Row -->
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="First Name" name="first_name" required>
          <UInput
            v-model="formData.first_name"
            placeholder="John"
            icon="i-heroicons-user"
            size="lg"
            :disabled="auth.loading"
          />
        </UFormGroup>

        <UFormGroup label="Last Name" name="last_name" required>
          <UInput
            v-model="formData.last_name"
            placeholder="Doe"
            size="lg"
            :disabled="auth.loading"
          />
        </UFormGroup>
      </div>

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
          placeholder="••••••••"
          icon="i-heroicons-lock-closed"
          size="lg"
          :disabled="auth.loading"
        >
          <template #trailing>
            <UButton
              :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              color="gray"
              variant="link"
              :padded="false"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
        <!-- Password Strength Indicator -->
        <div class="mt-2">
          <div class="flex gap-1">
            <div
              v-for="i in 4"
              :key="i"
              class="h-1 flex-1 rounded-full transition-colors"
              :class="i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'"
            />
          </div>
          <p class="text-xs mt-1" :class="strengthTextColors[passwordStrength]">
            {{ strengthLabels[passwordStrength] }}
          </p>
        </div>
      </UFormGroup>

      <!-- Confirm Password -->
      <UFormGroup label="Confirm Password" name="password_confirm" required>
        <UInput
          v-model="formData.password_confirm"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          icon="i-heroicons-lock-closed"
          size="lg"
          :disabled="auth.loading"
        />
      </UFormGroup>

      <!-- Terms -->
      <UFormGroup name="terms">
        <UCheckbox v-model="acceptTerms" :disabled="auth.loading">
          <template #label>
            <span class="text-sm text-gray-600">
              I agree to the
              <NuxtLink to="/terms" class="text-kevalgreen-600 hover:underline">Terms of Service</NuxtLink>
              and
              <NuxtLink to="/privacy" class="text-kevalgreen-600 hover:underline">Privacy Policy</NuxtLink>
            </span>
          </template>
        </UCheckbox>
      </UFormGroup>

      <!-- Submit Button -->
      <UButton
        type="submit"
        block
        size="lg"
        :loading="auth.loading"
        :disabled="auth.loading || !acceptTerms"
        class="bg-kevalgreen-500 hover:bg-kevalgreen-600"
      >
        {{ auth.loading ? 'Creating account...' : 'Create Account' }}
      </UButton>
    </UForm>

    <!-- Login Link -->
    <p class="text-center mt-6 text-gray-600">
      Already have an account?
      <NuxtLink to="/login" class="text-kevalgreen-600 font-semibold hover:underline">
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import type { RegisterFormData } from '~/types/api'

const auth = useAuthStore()
const router = useRouter()

// Form state
const formData = reactive<RegisterFormData>({
  email: '',
  password: '',
  password_confirm: '',
  first_name: '',
  last_name: ''
})

const showPassword = ref(false)
const acceptTerms = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  const pwd = formData.password
  if (!pwd) return 0
  
  let strength = 0
  if (pwd.length >= 6) strength++
  if (pwd.length >= 10) strength++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength++
  if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) strength++
  
  return strength
})

const strengthColors: Record<number, string> = {
  0: 'bg-gray-200',
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-green-500'
}

const strengthTextColors: Record<number, string> = {
  0: 'text-gray-400',
  1: 'text-red-500',
  2: 'text-orange-500',
  3: 'text-yellow-600',
  4: 'text-green-600'
}

const strengthLabels: Record<number, string> = {
  0: 'Enter a password',
  1: 'Weak',
  2: 'Fair',
  3: 'Good',
  4: 'Strong'
}

// Validation
const validate = (state: RegisterFormData) => {
  const errors = []
  
  if (!state.first_name?.trim()) {
    errors.push({ path: 'first_name', message: 'First name is required' })
  }
  
  if (!state.last_name?.trim()) {
    errors.push({ path: 'last_name', message: 'Last name is required' })
  }
  
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
  
  if (!state.password_confirm) {
    errors.push({ path: 'password_confirm', message: 'Please confirm your password' })
  } else if (state.password !== state.password_confirm) {
    errors.push({ path: 'password_confirm', message: 'Passwords do not match' })
  }
  
  if (!acceptTerms.value) {
    errors.push({ path: 'terms', message: 'You must accept the terms' })
  }
  
  return errors
}

// Submit handler
async function handleSubmit() {
  try {
    await auth.register(formData)
    router.push('/dashboard')
  } catch (e) {
    console.error('Registration failed:', e)
  }
}

// Clear errors on mount
onMounted(() => {
  auth.clearError()
})
</script>