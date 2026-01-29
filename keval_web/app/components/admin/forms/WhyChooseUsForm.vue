<!-- ~/components/admin/forms/WhyChooseUsForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <UFormGroup label="Title" name="title" required>
      <UInput v-model="form.title" placeholder="Fast Turnaround" size="lg" />
    </UFormGroup>

    <UFormGroup label="Description" name="description" required>
      <UTextarea v-model="form.description" placeholder="Explain this benefit..." :rows="3" />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Icon" name="icon">
        <UInput v-model="form.icon" placeholder="i-heroicons-clock" size="lg" />
        <template #hint>
          <a href="https://heroicons.com" target="_blank" class="text-kevalgreen-600 hover:underline">
            Browse icons
          </a>
        </template>
      </UFormGroup>

      <UFormGroup label="Order" name="order">
        <UInput v-model.number="form.order" type="number" placeholder="0" size="lg" />
      </UFormGroup>
    </div>

    <div v-if="form.icon" class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <UIcon :name="form.icon" class="w-8 h-8 text-kevalorange-600" />
      <span class="text-sm text-gray-600">Icon preview</span>
    </div>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update' : 'Add' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { WhyChooseUs, WhyChooseUsFormData } from '~/types/api'

const props = defineProps<{
  initialData?: WhyChooseUs | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: WhyChooseUsFormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const form = reactive<WhyChooseUsFormData>({
  title: props.initialData?.title || '',
  description: props.initialData?.description || '',
  icon: props.initialData?.icon || '',
  order: props.initialData?.order || 0
})

const validate = (state: WhyChooseUsFormData) => {
  const errors = []
  if (!state.title?.trim()) errors.push({ path: 'title', message: 'Title is required' })
  if (!state.description?.trim()) errors.push({ path: 'description', message: 'Description is required' })
  return errors
}

function handleSubmit() {
  emit('submit', {
    ...form,
    order: Number(form.order) || 0
  })
}

const defaultFormState = (): WhyChooseUsFormData => ({
  title: '',
  description: '',
  icon: '',
  order: 0
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.title = newData.title || ''
    form.description = newData.description || ''
    form.icon = newData.icon || ''
    form.order = newData.order || 0
  } else {
    Object.assign(form, defaultFormState())
  }
}, { immediate: true })
</script>