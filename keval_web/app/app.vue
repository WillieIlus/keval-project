<!-- ~/app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

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