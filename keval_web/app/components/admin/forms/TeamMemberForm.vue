<!-- ~/components/admin/forms/TeamMemberForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Full Name" name="name" required>
        <UInput v-model="form.name" placeholder="John Doe" size="lg" />
      </UFormGroup>

      <UFormGroup label="Job Title" name="title" required>
        <UInput v-model="form.title" placeholder="Creative Director" size="lg" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Department" name="department">
        <USelectMenu
          v-model="form.department"
          :options="departmentOptions"
          placeholder="Select department"
          size="lg"
        />
      </UFormGroup>

      <UFormGroup label="Order" name="order">
        <UInput v-model.number="form.order" type="number" placeholder="0" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Bio" name="bio">
      <UTextarea v-model="form.bio" placeholder="Short biography..." :rows="3" />
    </UFormGroup>

    <UFormGroup label="Photo" name="image">
      <FormsImageUpload
        v-model="form.image"
        label=""
        circle
        hint="Square photo recommended"
      />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UFormGroup label="Email" name="email">
        <UInput v-model="form.email" type="email" placeholder="john@keval.co.ke" size="lg" />
      </UFormGroup>

      <UFormGroup label="LinkedIn" name="linkedin">
        <UInput v-model="form.linkedin" placeholder="https://linkedin.com/in/..." size="lg" />
      </UFormGroup>

      <UFormGroup label="Twitter" name="twitter">
        <UInput v-model="form.twitter" placeholder="https://twitter.com/..." size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup>
      <UCheckbox v-model="form.is_active" label="Active (visible on site)" />
    </UFormGroup>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update Team Member' : 'Add Team Member' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { TeamMember, TeamMemberFormData } from '~/types/api'

const props = defineProps<{
  initialData?: TeamMember | null
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const departmentOptions = [
  { label: 'Management', value: 'Management' },
  { label: 'Design', value: 'Design' },
  { label: 'Production', value: 'Production' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Support', value: 'Support' }
]

const form = reactive<TeamMemberFormData>({
  name: props.initialData?.name || '',
  title: props.initialData?.title || '',
  bio: props.initialData?.bio || '',
  image: props.initialData?.image || null,
  department: props.initialData?.department || '',
  linkedin: props.initialData?.linkedin || '',
  twitter: props.initialData?.twitter || '',
  email: props.initialData?.email || '',
  order: props.initialData?.order || 0,
  is_active: props.initialData?.is_active ?? true
})

const validate = (state: TeamMemberFormData) => {
  const errors = []
  if (!state.name?.trim()) errors.push({ path: 'name', message: 'Name is required' })
  if (!state.title?.trim()) errors.push({ path: 'title', message: 'Title is required' })
  return errors
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('title', form.title)
  formData.append('bio', form.bio || '')
  formData.append('department', form.department || '')
  formData.append('linkedin', form.linkedin || '')
  formData.append('twitter', form.twitter || '')
  formData.append('email', form.email || '')
  formData.append('order', String(form.order))
  formData.append('is_active', String(form.is_active))
  
  if (form.image instanceof File) {
    formData.append('image', form.image)
  }
  
  emit('submit', formData)
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(form, {
      name: newData.name || '',
      title: newData.title || '',
      bio: newData.bio || '',
      image: newData.image || null,
      department: newData.department || '',
      linkedin: newData.linkedin || '',
      twitter: newData.twitter || '',
      email: newData.email || '',
      order: newData.order || 0,
      is_active: newData.is_active ?? true
    })
  }
}, { immediate: true })
</script>