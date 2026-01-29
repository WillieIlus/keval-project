<!-- ~/components/admin/AdminFormWrapper.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm">
    <!-- Header -->
    <div class="p-6 border-b border-gray-100 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <slot name="actions" />
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Error Alert -->
      <UAlert
        v-if="error"
        color="red"
        variant="soft"
        class="mb-6"
        :close-button="{ icon: 'i-heroicons-x-mark' }"
        @close="$emit('clear-error')"
      >
        <template #title>{{ error }}</template>
      </UAlert>

      <!-- Success Alert -->
      <UAlert
        v-if="success"
        color="green"
        variant="soft"
        class="mb-6"
        :close-button="{ icon: 'i-heroicons-x-mark' }"
        @close="$emit('clear-success')"
      >
        <template #title>{{ success }}</template>
      </UAlert>

      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  error?: string | null
  success?: string | null
}>()

defineEmits<{
  (e: 'clear-error'): void
  (e: 'clear-success'): void
}>()
</script>