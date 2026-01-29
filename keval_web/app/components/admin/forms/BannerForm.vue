<!-- ~/components/admin/forms/BannerForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Title" name="title" required>
        <UInput v-model="form.title" placeholder="Banner title" size="lg" />
      </UFormGroup>

      <UFormGroup label="Order" name="order">
        <UInput v-model.number="form.order" type="number" placeholder="0" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Subtitle" name="subtitle">
      <UTextarea v-model="form.subtitle" placeholder="Banner subtitle" :rows="2" />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="CTA Text" name="cta_text">
        <UInput v-model="form.cta_text" placeholder="Learn More" size="lg" />
      </UFormGroup>

      <UFormGroup label="CTA Link" name="cta_link">
        <UInput v-model="form.cta_link" placeholder="/contact" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Banner Image" name="image">
      <FormsImageUpload
        v-model="form.image"
        label=""
        hint="Recommended: 1920x600px"
      />
    </UFormGroup>

    <UFormGroup>
      <UCheckbox v-model="form.is_active" label="Active (visible on site)" />
    </UFormGroup>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">
        Cancel
      </UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update Banner' : 'Create Banner' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { Banner, BannerFormData } from '~/types/api'

const props = defineProps<{
  initialData?: Banner | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const form = reactive<BannerFormData>({
  title: props.initialData?.title || '',
  subtitle: props.initialData?.subtitle || '',
  image: props.initialData?.image || null,
  cta_text: props.initialData?.cta_text || '',
  cta_link: props.initialData?.cta_link || '',
  order: props.initialData?.order || 0,
  is_active: props.initialData?.is_active ?? true
})

const validate = (state: BannerFormData) => {
  const errors = []
  if (!state.title?.trim()) errors.push({ path: 'title', message: 'Title is required' })
  return errors
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('subtitle', form.subtitle)
  formData.append('cta_text', form.cta_text)
  formData.append('cta_link', form.cta_link)
  formData.append('order', String(Number(form.order) || 0))
  formData.append('is_active', String(form.is_active))

  if (form.image instanceof File) {
    formData.append('image', form.image, form.image.name)
  }

  emit('submit', formData)
}

const defaultFormState = (): BannerFormData => ({
  title: '',
  subtitle: '',
  image: null,
  cta_text: '',
  cta_link: '',
  order: 0,
  is_active: true
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.title = newData.title || ''
    form.subtitle = newData.subtitle || ''
    form.image = newData.image || null
    form.cta_text = newData.cta_text || ''
    form.cta_link = newData.cta_link || ''
    form.order = newData.order || 0
    form.is_active = newData.is_active ?? true
  } else {
    Object.assign(form, defaultFormState())
  }
}, { immediate: true })
</script>