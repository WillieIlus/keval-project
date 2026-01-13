// <script setup lang="ts">
// definePageMeta({
//   layout: 'auth',
//   middleware: 'guest'
// })

// const authStore = useAuthStore()

// // Form state
// const form = reactive({
//   email: '',
//   password: '',
//   confirmPassword: '',
//   first_name: '',
//   last_name: ''
// })

// const localError = ref('')
// const validationErrors = ref<Record<string, string>>({})
// const isSubmitting = ref(false)

// // Validate form
// const validateForm = () => {
//   validationErrors.value = {}
  
//   if (!form.first_name.trim()) {
//     validationErrors.value.first_name = 'First name is required'
//   }
  
//   if (!form.last_name.trim()) {
//     validationErrors.value.last_name = 'Last name is required'
//   }
  
//   if (!form.email.trim()) {
//     validationErrors.value.email = 'Email is required'
//   } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//     validationErrors.value.email = 'Email is invalid'
//   }
  
//   if (!form.password) {
//     validationErrors.value.password = 'Password is required'
//   } else if (form.password.length < 8) {
//     validationErrors.value.password = 'Password must be at least 8 characters'
//   }
  
//   if (form.password !== form.confirmPassword) {
//     validationErrors.value.confirmPassword = 'Passwords do not match'
//   }
  
//   return Object.keys(validationErrors.value).length === 0
// }

// // Handle registration
// const handleRegister = async () => {
//   if (isSubmitting.value) return
  
//   // Clear previous errors
//   localError.value = ''
//   authStore.clearError()
  
//   // Validate form
//   if (!validateForm()) {
//     localError.value = 'Please fix the errors below'
//     return
//   }
  
//   isSubmitting.value = true
  
//   try {
//     await authStore.register({
//       email: form.email.trim().toLowerCase(),
//       password: form.password,
//       first_name: form.first_name.trim(),
//       last_name: form.last_name.trim()
//     })
    
//     // Navigation is handled in the store
//   } catch (e) {
//     localError.value = authStore.error || 'Registration failed. Please try again.'
//   } finally {
//     isSubmitting.value = false
//   }
// }

// // Password strength indicator
// const passwordStrength = computed(() => {
//   const password = form.password
//   if (!password) return { label: '', strength: 0, color: '' }
  
//   let strength = 0
//   if (password.length >= 8) strength++
//   if (password.length >= 12) strength++
//   if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
//   if (/\d/.test(password)) strength++
//   if (/[^a-zA-Z\d]/.test(password)) strength++
  
//   if (strength <= 2) return { label: 'Weak', strength, color: 'bg-red-500' }
//   if (strength <= 3) return { label: 'Medium', strength, color: 'bg-yellow-500' }
//   return { label: 'Strong', strength, color: 'bg-green-500' }
// })
// </script>

// <template>
//   <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//     <div class="max-w-md w-full space-y-8">
//       <!-- Header -->
//       <div>
//         <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p class="mt-2 text-center text-sm text-gray-600">
//           Join us today and get started
//         </p>
//       </div>
      
//       <!-- Error Alert -->
//       <div 
//         v-if="localError || authStore.error" 
//         class="rounded-md bg-red-50 p-4"
//       >
//         <div class="flex">
//           <div class="flex-shrink-0">
//             <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//               <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
//             </svg>
//           </div>
//           <div class="ml-3">
//             <p class="text-sm font-medium text-red-800">
//               {{ localError || authStore.error }}
//             </p>
//           </div>
//         </div>
//       </div>

//       <!-- Registration Form -->
//       <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
//         <div class="space-y-4">
//           <!-- Name Fields -->
//           <div class="grid grid-cols-2 gap-4">
//             <div>
//               <label for="first_name" class="block text-sm font-medium text-gray-700">
//                 First Name *
//               </label>
//               <input
//                 id="first_name"
//                 v-model="form.first_name"
//                 name="first_name"
//                 type="text"
//                 autocomplete="given-name"
//                 required
//                 :disabled="isSubmitting"
//                 :class="[
//                   'mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed',
//                   validationErrors.first_name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
//                 ]"
//                 placeholder="John"
//               >
//               <p v-if="validationErrors.first_name" class="mt-1 text-xs text-red-600">
//                 {{ validationErrors.first_name }}
//               </p>
//             </div>

//             <div>
//               <label for="last_name" class="block text-sm font-medium text-gray-700">
//                 Last Name *
//               </label>
//               <input
//                 id="last_name"
//                 v-model="form.last_name"
//                 name="last_name"
//                 type="text"
//                 autocomplete="family-name"
//                 required
//                 :disabled="isSubmitting"
//                 :class="[
//                   'mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed',
//                   validationErrors.last_name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
//                 ]"
//                 placeholder="Doe"
//               >
//               <p v-if="validationErrors.last_name" class="mt-1 text-xs text-red-600">
//                 {{ validationErrors.last_name }}
//               </p>
//             </div>
//           </div>

//           <!-- Email Field -->
//           <div>
//             <label for="email" class="block text-sm font-medium text-gray-700">
//               Email address *
//             </label>
//             <input
//               id="email"
//               v-model="form.email"
//               name="email"
//               type="email"
//               autocomplete="email"
//               required
//               :disabled="isSubmitting"
//               :class="[
//                 'mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed',
//                 validationErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
//               ]"
//               placeholder="you@example.com"
//             >
//             <p v-if="validationErrors.email" class="mt-1 text-xs text-red-600">
//               {{ validationErrors.email }}
//             </p>
//           </div>

//           <!-- Password Field -->
//           <div>
//             <label for="password" class="block text-sm font-medium text-gray-700">
//               Password *
//             </label>
//             <input
//               id="password"
//               v-model="form.password"
//               name="password"
//               type="password"
//               autocomplete="new-password"
//               required
//               :disabled="isSubmitting"
//               :class="[
//                 'mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed',
//                 validationErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
//               ]"
//               placeholder="••••••••"
//             >
            
//             <!-- Password Strength Indicator -->
//             <div v-if="form.password" class="mt-2">
//               <div class="flex items-center gap-2">
//                 <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     :class="[passwordStrength.color, 'h-full transition-all duration-300']"
//                     :style="{ width: `${(passwordStrength.strength / 5) * 100}%` }"
//                   ></div>
//                 </div>
//                 <span class="text-xs font-medium text-gray-600">
//                   {{ passwordStrength.label }}
//                 </span>
//               </div>
//             </div>
            
//             <p v-if="validationErrors.password" class="mt-1 text-xs text-red-600">
//               {{ validationErrors.password }}
//             </p>
//             <p v-else class="mt-1 text-xs text-gray-500">
//               Must be at least 8 characters
//             </p>
//           </div>

//           <!-- Confirm Password Field -->
//           <div>
//             <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
//               Confirm Password *
//             </label>
//             <input
//               id="confirmPassword"
//               v-model="form.confirmPassword"
//               name="confirmPassword"
//               type="password"
//               autocomplete="new-password"
//               required
//               :disabled="isSubmitting"
//               :class="[
//                 'mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed',
//                 validationErrors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
//               ]"
//               placeholder="••••••••"
//             >
//             <p v-if="validationErrors.confirmPassword" class="mt-1 text-xs text-red-600">
//               {{ validationErrors.confirmPassword }}
//             </p>
//           </div>
//         </div>

//         <!-- Terms & Conditions -->
//         <div class="flex items-start">
//           <div class="flex items-center h-5">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             >
//           </div>
//           <div class="ml-3 text-sm">
//             <label for="terms" class="font-medium text-gray-700">
//               I agree to the 
//               <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms</a>
//               and
//               <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
//             </label>
//           </div>
//         </div>

//         <!-- Submit Button -->
//         <div>
//           <button
//             type="submit"
//             :disabled="isSubmitting || authStore.loading"
//             class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <span v-if="isSubmitting || authStore.loading" class="flex items-center">
//               <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
//                 <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Creating account...
//             </span>
//             <span v-else>Create account</span>
//           </button>
//         </div>

//         <!-- Login Link -->
//         <div class="text-center">
//           <p class="text-sm text-gray-600">
//             Already have an account?
//             <NuxtLink 
//               to="/login" 
//               class="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Sign in
//             </NuxtLink>
//           </p>
//         </div>
//       </form>
//     </div>
//   </div>
// </template>

<!-- ~/pages/register.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Image/Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:flex-1 bg-kevalorange-500 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="0.5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="0.5"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="0.5"/>
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center px-12 text-white">
        <h1 class="text-4xl font-bold mb-4">Join Keval Print</h1>
        <p class="text-xl text-orange-100 mb-8">
          Create an account to unlock exclusive features and streamlined ordering.
        </p>

        <!-- Benefits -->
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
          <img src="/logo.png" alt="Keval Print" class="h-12" />
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

// Redirect if already logged in
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.initializeAuth()
  if (auth.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>