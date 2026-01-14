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

useSeoMeta({
  title: 'Keval',
  description: "Nairobi's leading provider of corporate branding, garment printing, and design.",
  ogTitle: 'Keval',
  ogImage: 'https://keval.co.ke/logo-white.png',
  twitterCard: 'summary_large_image',
})
</script>