<!-- ~/components/admin/forms/TestimonialForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Client Name" name="client_name" required>
        <UInput v-model="form.client_name" placeholder="John Doe" size="lg" />
      </UFormGroup>

      <UFormGroup label="Position" name="position">
        <UInput v-model="form.position" placeholder="CEO" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Company" name="company">
      <UInput v-model="form.company" placeholder="Company Name" size="lg" />
    </UFormGroup>

    <UFormGroup label="Testimonial Content" name="content" required>
      <UTextarea v-model="form.content" placeholder="What did they say about your service?" :rows="4" />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Rating" name="rating">
        <div class="flex gap-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="form.rating = star"
            class="p-1"
          >
            <UIcon 
              name="i-heroicons-star-solid" 
              :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-300'"
              class="w-8 h-8"
            />
          </button>
        </div>
      </UFormGroup>

      <UFormGroup label="Avatar" name="avatar">
        <FormsImageUpload
          v-model="form.avatar"
          label=""
          circle
          hint="Square image recommended"
        />
      </UFormGroup>
    </div>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update Testimonial' : 'Add Testimonial' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { Testimonial, TestimonialFormData } from '~/types/api'

const props = defineProps<{
  initialData?: Testimonial | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const form = reactive<TestimonialFormData>({
  client_name: props.initialData?.client_name || '',
  company: props.initialData?.company || '',
  position: props.initialData?.position || '',
  avatar: props.initialData?.avatar || null,
  content: props.initialData?.content || '',
  rating: props.initialData?.rating || 5
})

const validate = (state: TestimonialFormData) => {
  const errors = []
  if (!state.client_name?.trim()) errors.push({ path: 'client_name', message: 'Client name is required' })
  if (!state.content?.trim()) errors.push({ path: 'content', message: 'Content is required' })
  return errors
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('client_name', form.client_name)
  formData.append('company', form.company || '')
  formData.append('position', form.position || '')
  formData.append('content', form.content)
  formData.append('rating', String(Math.min(5, Math.max(1, Number(form.rating) || 5))))

  if (form.avatar instanceof File) {
    formData.append('avatar', form.avatar, form.avatar.name)
  }

  emit('submit', formData)
}

const defaultFormState = (): TestimonialFormData => ({
  client_name: '',
  company: '',
  position: '',
  avatar: null,
  content: '',
  rating: 5
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.client_name = newData.client_name || ''
    form.company = newData.company || ''
    form.position = newData.position || ''
    form.avatar = newData.avatar || null
    form.content = newData.content || ''
    form.rating = newData.rating ?? 5
  } else {
    Object.assign(form, defaultFormState())
  }
}, { immediate: true })
</script>