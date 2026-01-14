<!-- ~/components/forms/MultiImageUpload.vue -->
<template>
  <div class="form-group">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
      <span class="text-gray-400 font-normal ml-2">({{ images.length }}/{{ maxImages }})</span>
    </label>

    <div 
      class="border-2 border-dashed rounded-xl p-6 transition-colors"
      :class="isDragging ? 'border-kevalgreen-500 bg-kevalgreen-50' : 'border-gray-300 bg-gray-50'"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <!-- Image Grid -->
      <div v-if="images.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="relative aspect-square group"
        >
          <img 
            :src="getImageSrc(image)" 
            :alt="`Image ${index + 1}`"
            class="w-full h-full object-cover rounded-lg"
          >
          
          <!-- Overlay Controls -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <UButton
              type="button"
              size="xs"
              color="white"
              variant="solid"
              @click="setAsCover(index)"
              :disabled="image.isCover"
            >
              <UIcon name="i-heroicons-star" :class="image.isCover ? 'text-yellow-500' : ''" class="w-4 h-4" />
            </UButton>
            <UButton
              type="button"
              size="xs"
              color="red"
              variant="solid"
              @click="removeImage(index)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>

          <!-- Cover Badge -->
          <span 
            v-if="image.isCover" 
            class="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-medium"
          >
            Cover
          </span>
        </div>
      </div>

      <!-- Upload Area -->
      <div v-if="images.length < maxImages" class="text-center">
        <input 
          ref="fileInput"
          type="file" 
          @change="handleFiles" 
          accept="image/*"
          multiple
          class="hidden"
        >
        
        <UIcon name="i-heroicons-cloud-arrow-up" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
        
        <p class="text-gray-600 mb-2">
          <button 
            type="button"
            @click="fileInput?.click()"
            class="text-kevalgreen-600 hover:underline font-medium"
          >
            Click to upload
          </button>
          or drag and drop
        </p>
        
        <p class="text-xs text-gray-500">
          {{ hint || `PNG, JPG up to ${maxSize}MB each. Max ${maxImages} images.` }}
        </p>
      </div>

      <p v-else class="text-center text-sm text-amber-600">
        Maximum {{ maxImages }} images reached. Remove some to add more.
      </p>
    </div>

    <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface ImageItem {
  file?: File
  url?: string
  isCover: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: ImageItem[]
  label?: string
  required?: boolean
  maxImages?: number
  maxSize?: number
  hint?: string
}>(), {
  modelValue: () => [],
  maxImages: 10,
  maxSize: 5
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ImageItem[]): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref<string | null>(null)

const images = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function getImageSrc(image: ImageItem): string {
  if (image.file) {
    return URL.createObjectURL(image.file)
  }
  return image.url || ''
}

function handleFiles(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    processFiles(Array.from(input.files))
  }
}

function handleDrop(event: DragEvent) {
  isDragging.value = false
  const files = event.dataTransfer?.files
  if (files) {
    processFiles(Array.from(files))
  }
}

function processFiles(files: File[]) {
  error.value = null
  const maxBytes = props.maxSize * 1024 * 1024
  const newImages: ImageItem[] = []

  for (const file of files) {
    if (images.value.length + newImages.length >= props.maxImages) {
      error.value = `Maximum ${props.maxImages} images allowed`
      break
    }

    if (!file.type.startsWith('image/')) {
      continue
    }

    if (file.size > maxBytes) {
      error.value = `Some files exceed ${props.maxSize}MB limit`
      continue
    }

    newImages.push({
      file,
      isCover: images.value.length === 0 && newImages.length === 0
    })
  }

  if (newImages.length > 0) {
    images.value = [...images.value, ...newImages]
  }
}

function removeImage(index: number) {
  const wasCover = images.value[index].isCover
  const updated = images.value.filter((_, i) => i !== index)
  
  // If removed image was cover, set first image as cover
  if (wasCover && updated.length > 0) {
    updated[0].isCover = true
  }
  
  images.value = updated
}

function setAsCover(index: number) {
  images.value = images.value.map((img, i) => ({
    ...img,
    isCover: i === index
  }))
}
</script>