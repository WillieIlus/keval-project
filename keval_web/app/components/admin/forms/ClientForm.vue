<!-- ~/components/admin/forms/ClientForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <UFormGroup label="Client Name" name="name" required>
      <UInput v-model="form.name" placeholder="Company name" size="lg" />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Website" name="website">
        <UInput v-model="form.website" placeholder="https://example.com" size="lg" />
      </UFormGroup>

      <UFormGroup label="Order" name="order">
        <UInput v-model.number="form.order" type="number" placeholder="0" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Logo" name="logo">
      <FormsImageUpload
        v-model="form.logo"
        label=""
        hint="PNG or SVG recommended"
      />
    </UFormGroup>

    <UFormGroup>
      <UCheckbox v-model="form.is_featured" label="Featured client (shown on homepage)" />
    </UFormGroup>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update Client' : 'Add Client' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { Client, ClientFormData } from '~/types/api'

const props = defineProps<{
  initialData?: Client | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const form = reactive<ClientFormData>({
  name: props.initialData?.name || '',
  logo: props.initialData?.logo || null,
  website: props.initialData?.website || '',
  is_featured: props.initialData?.is_featured ?? false,
  order: props.initialData?.order || 0
})

const validate = (state: ClientFormData) => {
  const errors = []
  if (!state.name?.trim()) errors.push({ path: 'name', message: 'Name is required' })
  return errors
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('website', form.website || '')
  formData.append('order', String(Number(form.order) || 0))
  formData.append('is_featured', String(form.is_featured))

  if (form.logo instanceof File) {
    formData.append('logo', form.logo, form.logo.name)
  }

  emit('submit', formData)
}

const defaultFormState = (): ClientFormData => ({
  name: '',
  logo: null,
  website: '',
  is_featured: false,
  order: 0
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.name = newData.name || ''
    form.logo = newData.logo || null
    form.website = newData.website || ''
    form.is_featured = newData.is_featured ?? false
    form.order = newData.order || 0
  } else {
    Object.assign(form, defaultFormState())
  }
}, { immediate: true })
</script>