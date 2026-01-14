<!-- ~/components/forms/RichTextEditor.vue -->
<template>
  <div class="form-group">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-2 bg-gray-100 border border-gray-300 rounded-t-lg">
      <button
        v-for="action in toolbarActions"
        :key="action.command"
        type="button"
        @click="execCommand(action.command, action.value)"
        class="p-2 hover:bg-gray-200 rounded transition-colors"
        :title="action.title"
      >
        <UIcon :name="action.icon" class="w-4 h-4" />
      </button>
    </div>

    <!-- Editor -->
    <div
      ref="editorRef"
      contenteditable
      class="min-h-[200px] p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-kevalgreen-500 bg-white prose prose-sm max-w-none"
      :class="{ 'border-red-500': error }"
      @input="handleInput"
      @paste="handlePaste"
    ></div>

    <p v-if="hint" class="mt-1 text-xs text-gray-500">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  required?: boolean
  hint?: string
  error?: string
}>(), {
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)

const toolbarActions = [
  { command: 'bold', icon: 'i-heroicons-bold', title: 'Bold' },
  { command: 'italic', icon: 'i-heroicons-italic', title: 'Italic' },
  { command: 'underline', icon: 'i-heroicons-underline', title: 'Underline' },
  { command: 'insertUnorderedList', icon: 'i-heroicons-list-bullet', title: 'Bullet List' },
  { command: 'insertOrderedList', icon: 'i-heroicons-numbered-list', title: 'Numbered List' },
  { command: 'formatBlock', value: 'h3', icon: 'i-heroicons-h3', title: 'Heading' },
  { command: 'removeFormat', icon: 'i-heroicons-x-mark', title: 'Clear Formatting' }
]

function execCommand(command: string, value?: string) {
  document.execCommand(command, false, value)
  editorRef.value?.focus()
  handleInput()
}

function handleInput() {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const text = event.clipboardData?.getData('text/plain') || ''
  document.execCommand('insertText', false, text)
}

// Set initial content
onMounted(() => {
  if (editorRef.value && props.modelValue) {
    editorRef.value.innerHTML = props.modelValue
  }
})

// Update content when modelValue changes externally
watch(() => props.modelValue, (newValue) => {
  if (editorRef.value && editorRef.value.innerHTML !== newValue) {
    editorRef.value.innerHTML = newValue || ''
  }
})
</script>