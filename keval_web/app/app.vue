<!-- ~/app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Wrap in ClientOnly to avoid hydration mismatch -->
    <ClientOnly>
      <UNotifications />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

// Only initialize on client
onMounted(() => {
  auth.initializeAuth()
})

// Default meta moved to nuxt.config.ts to avoid useHead recursion with Nuxt UI
</script>