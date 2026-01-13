<script setup lang="ts">
const props = defineProps({
  modelValue: [File, String, null], // Can be a File (new) or URL (existing)
  label: String,
  circle: Boolean // Option for Team avatars (circular)
})

const emit = defineEmits(['update:modelValue'])
const previewUrl = ref<string | null>(null)

// Create a preview whenever the file changes
function handleFile(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    previewUrl.value = URL.createObjectURL(file)
    emit('update:modelValue', file) // Send the File object up
  }
}
</script>

<template>
  <div class="form-group">
    <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    
    <div class="flex items-center gap-6">
      <div 
        class="border-2 border-gray-300 border-dashed bg-gray-50 flex items-center justify-center overflow-hidden shrink-0"
        :class="[circle ? 'w-24 h-24 rounded-full' : 'w-32 h-32 rounded-lg']"
      >
        <img 
          v-if="previewUrl || (typeof modelValue === 'string')" 
          :src="previewUrl || modelValue" 
          class="w-full h-full object-cover"
        />
        <span v-else class="text-gray-400 text-xs text-center px-2">No image</span>
      </div>

      <div>
        <input 
          type="file" 
          @change="handleFile" 
          accept="image/*"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <p class="mt-1 text-xs text-gray-500">JPG, PNG or WEBP.</p>
      </div>
    </div>
  </div>
</template>