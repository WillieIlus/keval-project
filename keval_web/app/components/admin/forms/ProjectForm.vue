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
        <select
          v-model="form.category"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevalgreen-500 focus:border-kevalgreen-500"
        >
          <option :value="null" disabled>Select category</option>
          <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </UFormGroup>

      <UFormGroup label="Date Completed" name="date_completed">
        <UInput v-model="form.date_completed" type="date" size="lg" />
      </UFormGroup>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UFormGroup label="Print Method" name="print_method">
        <select
          v-model="form.print_method"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevalgreen-500 focus:border-kevalgreen-500"
        >
          <option value="">Select method</option>
          <option v-for="method in printMethods" :key="method" :value="method">{{ method }}</option>
        </select>
      </UFormGroup>

      <UFormGroup label="Material Used" name="material_used">
        <select
          v-model="form.material_used"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevalgreen-500 focus:border-kevalgreen-500"
        >
          <option value="">Select material</option>
          <option v-for="material in materials" :key="material" :value="material">{{ material }}</option>
        </select>
      </UFormGroup>

      <UFormGroup label="Finishing" name="finishing">
        <select
          v-model="form.finishing"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevalgreen-500 focus:border-kevalgreen-500"
        >
          <option value="">Select finishing</option>
          <option v-for="finish in finishingOptions" :key="finish" :value="finish">{{ finish }}</option>
        </select>
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

// Print method options
const printMethods = [
  'Digital Printing',
  'Screen Printing',
  'Offset Printing',
  'Large Format Printing',
  'UV Printing',
  'Sublimation',
  'DTG (Direct to Garment)',
  'Heat Transfer',
  'Embroidery',
  'Vinyl Cutting',
  'Laser Engraving'
]

// Material options
const materials = [
  'Paper (Glossy)',
  'Paper (Matte)',
  'Cardstock',
  'Canvas',
  'Vinyl',
  'PVC',
  'Acrylic',
  'Fabric',
  'Cotton',
  'Polyester',
  'Leather',
  'Wood',
  'Metal',
  'Glass',
  'Foam Board',
  'Corrugated Board',
  'Banner Material',
  'Mesh Banner',
  'Sticker Paper',
  'Photo Paper'
]

// Finishing options
const finishingOptions = [
  'Matte Lamination',
  'Gloss Lamination',
  'Soft Touch Lamination',
  'Spot UV',
  'Foil Stamping (Gold)',
  'Foil Stamping (Silver)',
  'Embossing',
  'Debossing',
  'Die Cut',
  'Rounded Corners',
  'Grommets',
  'Hemming',
  'Mounting',
  'Framing',
  'Edge Painting',
  'Perforating',
  'Scoring',
  'Binding (Saddle Stitch)',
  'Binding (Perfect)',
  'Binding (Wire-O)',
  'None'
]

function flattenCategories(categories: ServiceCategory[], prefix = ''): { id: number; name: string }[] {
  const options: { id: number; name: string }[] = []
  for (const category of categories) {
    const name = prefix ? `${prefix} / ${category.name}` : category.name
    options.push({ id: category.id, name })
    if (category.subcategories?.length) {
      options.push(...flattenCategories(category.subcategories, name))
    }
  }
  return options
}

const categoryOptions = computed(() =>
  props.categories?.length ? flattenCategories(props.categories) : []
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
  const slug = form.slug?.trim()
    ? form.slug
    : form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  emit('submit', {
    ...form,
    slug,
    category: form.category
  })
}

const defaultFormState = (): ProjectFormData => ({
  title: '',
  slug: '',
  client: '',
  description: '',
  print_method: '',
  material_used: '',
  finishing: '',
  date_completed: '',
  is_featured: false,
  category: null
})

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
      category: newData.category ?? null
    })
  } else {
    Object.assign(form, defaultFormState())
  }
}, { immediate: true })
</script>