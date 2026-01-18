<!-- ~/pages/logout.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Signing out...</h1>
      <p class="text-gray-500">Please wait while we log you out.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  // Perform logout
  await auth.logout()
  
  // Redirect to home after a brief moment
  setTimeout(() => {
    router.push('/')
  }, 500)
})
</script>