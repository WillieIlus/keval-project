<!-- ~/layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    
    <!-- Main content grows to fill available space -->
    <main class="flex-grow pt-24">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.initializeAuth()
})
</script>

<style>
/* Ensure html and body take full height */
html, body, #__nuxt {
  min-height: 100%;
  height: 100%;
}
</style>