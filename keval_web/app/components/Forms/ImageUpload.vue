<!-- ~/components/forms/ImageUpload.vue -->
<template>
  <div class="form-group">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="flex items-center gap-6">
      <!-- Preview -->
      <div 
        class="border-2 border-dashed bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 transition-colors"
        :class="[
          circle ? 'w-24 h-24 rounded-full' : 'w-32 h-32 rounded-lg',
          isDragging ? 'border-kevalgreen-500 bg-kevalgreen-50' : 'border-gray-300'
        ]"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <img 
          v-if="previewUrl || (typeof modelValue === 'string' && modelValue)" 
          :src="previewUrl || (typeof modelValue === 'string' ? modelValue : '')" 
          :alt="label || 'Preview'"
          class="w-full h-full object-cover"
        >
        <div v-else class="text-center p-2">
          <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400 mx-auto mb-1" />
          <span class="text-gray-400 text-xs">No image</span>
        </div>
      </div>

      <!-- Upload Controls -->
      <div class="flex-1">
        <input 
          ref="fileInput"
          type="file" 
          @change="handleFile" 
          :accept="accept"
          class="hidden"
          :id="inputId"
        >
        
        <div class="space-y-2">
          <UButton
            type="button"
            variant="outline"
            size="sm"
            @click="triggerFileInput"
            :disabled="disabled"
          >
            <UIcon name="i-heroicons-arrow-up-tray" class="w-4 h-4 mr-2" />
            {{ previewUrl || modelValue ? 'Change Image' : 'Upload Image' }}
          </UButton>

          <UButton
            v-if="previewUrl || modelValue"
            type="button"
            variant="ghost"
            color="red"
            size="sm"
            @click="clearImage"
            :disabled="disabled"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
            Remove
          </UButton>
        </div>

        <p class="mt-2 text-xs text-gray-500">
          {{ hint || 'JPG, PNG or WEBP. Max 5MB.' }}
        </p>

        <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: File | string | null
  label?: string
  circle?: boolean
  required?: boolean
  accept?: string
  maxSize?: number // in MB
  hint?: string
  disabled?: boolean
}>(), {
  circle: false,
  required: false,
  accept: 'image/*',
  maxSize: 5,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
  (e: 'error', message: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isDragging = ref(false)
const error = ref<string | null>(null)
const inputId = `image-upload-${Math.random().toString(36).slice(2)}`

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFile(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    processFile(files[0])
  }
}

function processFile(file: File) {
  error.value = null

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file'
    emit('error', error.value)
    return
  }

  // Validate file size
  const maxBytes = props.maxSize * 1024 * 1024
  if (file.size > maxBytes) {
    error.value = `File size must be less than ${props.maxSize}MB`
    emit('error', error.value)
    return
  }

  // Create preview
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = URL.createObjectURL(file)
  
  emit('update:modelValue', file)
}

function clearImage() {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = null
  error.value = null

  if (fileInput.value) {
    fileInput.value.value = ''
  }

  emit('update:modelValue', null)
}

// When parent clears modelValue (e.g. form reset), revoke blob URL and clear local state
watch(() => props.modelValue, (v) => {
  if (!v) {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }
    error.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>