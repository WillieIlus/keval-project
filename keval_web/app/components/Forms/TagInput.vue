<!-- ~/components/forms/TagInput.vue -->
<template>
  <UFormGroup :label="label" :required="required" :error="error">
    <div 
      class="min-h-[42px] p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-kevalgreen-500 focus-within:border-kevalgreen-500 bg-white"
    >
      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in modelValue"
          :key="index"
          class="inline-flex items-center gap-1 px-2 py-1 bg-kevalgreen-100 text-kevalgreen-700 rounded-full text-sm"
        >
          {{ tag }}
          <button
            type="button"
            @click="removeTag(index)"
            class="hover:text-kevalgreen-900"
          >
            <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
          </button>
        </span>
        
        <!-- Input -->
        <input
          v-model="inputValue"
          type="text"
          :placeholder="modelValue.length === 0 ? placeholder : ''"
          class="flex-1 min-w-[120px] outline-none text-sm"
          @keydown.enter.prevent="addTag"
          @keydown.backspace="handleBackspace"
          @blur="addTag"
        >
      </div>
    </div>
    
    <p v-if="hint" class="mt-1 text-xs text-gray-500">{{ hint }}</p>
  </UFormGroup>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string[]
  label?: string
  required?: boolean
  error?: string
  placeholder?: string
  hint?: string
  maxTags?: number
}>(), {
  modelValue: () => [],
  placeholder: 'Type and press Enter',
  maxTags: 10
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const inputValue = ref('')

function addTag() {
  const tag = inputValue.value.trim()
  
  if (
    tag && 
    !props.modelValue.includes(tag) && 
    props.modelValue.length < props.maxTags
  ) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
  
  inputValue.value = ''
}

function removeTag(index: number) {
  emit('update:modelValue', props.modelValue.filter((_, i) => i !== index))
}

function handleBackspace() {
  if (inputValue.value === '' && props.modelValue.length > 0) {
    removeTag(props.modelValue.length - 1)
  }
}
</script>