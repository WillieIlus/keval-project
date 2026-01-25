<template>
  <UButton @click="open = true">Open</UButton>

  <ClientOnly>
    <UModal v-model:open="open">
      <div class="p-6">Modal works 🎉</div>
    </UModal>
  </ClientOnly>
</template>

<script setup>
const open = ref(false)
</script>
