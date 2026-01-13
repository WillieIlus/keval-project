// <script setup lang="ts">
// definePageMeta({
//   layout: 'auth',
//   middleware: 'guest' // Create this middleware to redirect if already logged in
// })

// const authStore = useAuthStore()
// const router = useRouter()

// // Form state
// const form = reactive({
//   email: '',
//   password: ''
// })

// const localError = ref('')
// const isSubmitting = ref(false)

// // Handle login
// const handleLogin = async () => {
//   if (isSubmitting.value) return
  
//   // Clear previous errors
//   localError.value = ''
//   authStore.clearError()
  
//   // Basic validation
//   if (!form.email || !form.password) {
//     localError.value = 'Please fill in all fields'
//     return
//   }
  
//   isSubmitting.value = true
  
//   try {
//     await authStore.login({
//       email: form.email.trim(),
//       password: form.password
//     })
    
//     // Redirect to dashboard on success
//     await router.push('/dashboard')
//   } catch (e) {
//     localError.value = authStore.error || 'Login failed. Please try again.'
//   } finally {
//     isSubmitting.value = false
//   }
// }

// // Handle Enter key
// const handleKeyPress = (e: KeyboardEvent) => {
//   if (e.key === 'Enter') {
//     handleLogin()
//   }
// }
// </script>

// <template>
//   <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//     <div class="max-w-md w-full space-y-8">
//       <!-- Header -->
//       <div>
//         <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Sign in to your account
//         </h2>
//         <p class="mt-2 text-center text-sm text-gray-600">
//           Welcome back! Please enter your details.
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

//       <!-- Login Form -->
//       <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
//         <div class="space-y-4">
//           <!-- Email Field -->
//           <div>
//             <label for="email" class="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               id="email"
//               v-model="form.email"
//               name="email"
//               type="email"
//               autocomplete="email"
//               required
//               :disabled="isSubmitting"
//               class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
//               placeholder="you@example.com"
//               @keypress="handleKeyPress"
//             >
//           </div>

//           <!-- Password Field -->
//           <div>
//             <label for="password" class="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               v-model="form.password"
//               name="password"
//               type="password"
//               autocomplete="current-password"
//               required
//               :disabled="isSubmitting"
//               class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
//               placeholder="••••••••"
//               @keypress="handleKeyPress"
//             >
//           </div>
//         </div>

//         <!-- Remember Me & Forgot Password -->
//         <div class="flex items-center justify-between">
//           <div class="flex items-center">
//             <input
//               id="remember-me"
//               name="remember-me"
//               type="checkbox"
//               class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             >
//             <label for="remember-me" class="ml-2 block text-sm text-gray-900">
//               Remember me
//             </label>
//           </div>

//           <div class="text-sm">
//             <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
//               Forgot password?
//             </a>
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
//               Signing in...
//             </span>
//             <span v-else>Sign in</span>
//           </button>
//         </div>

//         <!-- Register Link -->
//         <div class="text-center">
//           <p class="text-sm text-gray-600">
//             Don't have an account?
//             <NuxtLink 
//               to="/register" 
//               class="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Create one now
//             </NuxtLink>
//           </p>
//         </div>
//       </form>
//     </div>
//   </div>
// </template>
<!-- ~/pages/login.vue -->
<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Form -->
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Keval Print" class="h-12" />
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

    <!-- Right Side - Image/Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:flex-1 bg-kevalgreen-600 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

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

// Page config
definePageMeta({
  layout: false // No default layout - custom full-page design
})

useSeoMeta({
  title: 'Login | Keval Print',
  description: 'Sign in to your Keval Print account to manage orders and projects.'
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