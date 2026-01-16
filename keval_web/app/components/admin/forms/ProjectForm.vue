<!-- ~/components/admin/forms/ProjectForm.vue -->
<template>
  <UForm :state="form" :validate="validate" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Project Title" name="title" required>
        <UInput v-model="form.title" placeholder="Project name" size="lg" />
      </UFormGroup>

      <UFormGroup label="Client" name="client">
        <UInput v-model="form.client" placeholder="Client name" size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="form.description" placeholder="Describe the project..." :rows="4" />
    </UFormGroup>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UFormGroup label="Category" name="category">
        <USelectMenu
          v-model="form.category"
          :options="categoryOptions"
          placeholder="Select category"
          size="lg"
          value-attribute="id"
          option-attribute="name"
        />
      </UFormGroup>

      <UFormGroup label="Date Completed" name="date_completed">
        <UInput v-model="form.date_completed" type="date" size="lg" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UFormGroup label="Print Method" name="print_method">
        <UInput v-model="form.print_method" placeholder="Digital, Screen..." size="lg" />
      </UFormGroup>

      <UFormGroup label="Material Used" name="material_used">
        <UInput v-model="form.material_used" placeholder="Vinyl, Canvas..." size="lg" />
      </UFormGroup>

      <UFormGroup label="Finishing" name="finishing">
        <UInput v-model="form.finishing" placeholder="Matte, Gloss..." size="lg" />
      </UFormGroup>
    </div>

    <UFormGroup>
      <UCheckbox v-model="form.is_featured" label="Featured project (shown on homepage)" />
    </UFormGroup>

    <div class="flex justify-end gap-4">
      <UButton type="button" variant="ghost" @click="$emit('cancel')">Cancel</UButton>
      <UButton type="submit" :loading="loading" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
        {{ isEdit ? 'Update Project' : 'Create Project' }}
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { Project, ProjectFormData, ServiceCategory } from '~/types/api'

const props = defineProps<{
  initialData?: Project | null
  categories?: ServiceCategory[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: ProjectFormData): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.initialData?.id)

const categoryOptions = computed(() => 
  props.categories?.map(c => ({ id: c.id, name: c.name })) || []
)

const form = reactive<ProjectFormData>({
  title: props.initialData?.title || '',
  slug: props.initialData?.slug || '',
  client: props.initialData?.client || '',
  description: props.initialData?.description || '',
  print_method: props.initialData?.print_method || '',
  material_used: props.initialData?.material_used || '',
  finishing: props.initialData?.finishing || '',
  date_completed: props.initialData?.date_completed || '',
  is_featured: props.initialData?.is_featured ?? false,
  category: props.initialData?.category || null
})

const validate = (state: ProjectFormData) => {
  const errors = []
  if (!state.title?.trim()) errors.push({ path: 'title', message: 'Title is required' })
  return errors
}

function handleSubmit() {
  // Auto-generate slug if empty
  if (!form.slug) {
    form.slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }
  emit('submit', { ...form })
}

watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(form, {
      title: newData.title || '',
      slug: newData.slug || '',
      client: newData.client || '',
      description: newData.description || '',
      print_method: newData.print_method || '',
      material_used: newData.material_used || '',
      finishing: newData.finishing || '',
      date_completed: newData.date_completed || '',
      is_featured: newData.is_featured ?? false,
      category: newData.category || null
    })
  }
}, { immediate: true })
</script>