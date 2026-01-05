<script setup lang="ts">
import { flattenCategories } from '~/utils/categoryHelpers'

const { $api } = useNuxtApp()
const toast = useToast()

// 1. Data Fetching for Dropdowns
const { data: rawCategories } = await useAsyncData('gallery-cats', () =>
  $api('/api/gallery/categories/')
)

const categories = flattenCategories(rawCategories)
const { data: categories } = await useAsyncData('cats', () => $api('/api/gallery/categories/'))
const { data: clients } = await useAsyncData('clients', () => $api('/api/clients/'))

// 2. State
const categoryOptions = computed(() =>{
  if (!rawCategories.value) return []
  return flattenCategories(rawCategories.value)
})

const step = ref(1) // Step 1: Details, Step 2: Images
const projectId = ref<number | null>(null) // We store ID after step 1
const loading = ref(false)

// Step 1 Form: Project Details
const projectForm = reactive({
  title: '',
  category: '',
  client: '',
  description: '',
  print_method: '',
  date_completed: ''
})

// Step 2 Form: Images
const newImage = ref<File | null>(null)
const newImageCaption = ref('')
const projectImages = ref([]) // List of uploaded images to show user

const form = reactive({
  title: ''
  category: undefined
})
// --- Actions ---

// Step 1: Create the Project Shell
async function createProject() {
  loading.value = true
  try {
    const res = await $api('/api/gallery/projects/', {
      method: 'POST',
      body: projectForm // Just JSON is fine here since there's no main image in Project model
    })
    projectId.value = res.id
    step.value = 2 // Move to "Inline" mode
    toast.add({ title: 'Project Created', description: 'Now add images', color: 'green' })
  } catch (err) {
    toast.add({ title: 'Error', color: 'red' })
  } finally {
    loading.value = false
  }
}

// Step 2: Upload an Image (The "Inline" part)
async function uploadImage() {
  if (!projectId.value || !newImage.value) return

  const formData = new FormData()
  formData.append('project', String(projectId.value)) // Link to parent
  formData.append('image', newImage.value)
  formData.append('caption', newImageCaption.value)
  formData.append('is_cover', 'false') // Default

  try {
    const res = await $api('/api/gallery/images/', { // Assuming this endpoint exists
      method: 'POST',
      body: formData
    })

    // Add to local list for visual feedback
    projectImages.value.push(res)

    // Reset inputs
    newImage.value = null
    newImageCaption.value = ''
    toast.add({ title: 'Image Added', color: 'green' })
  } catch (err) {
    toast.add({ title: 'Upload Failed', color: 'red' })
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div v-if="step === 1" class="bg-white p-6 rounded shadow">
      <h2 class="text-xl font-bold mb-4">Step 1: Project Details</h2>
      <form @submit.prevent="createProject" class="grid grid-cols-2 gap-4">
        <UFormGroup label="Category">
          <USelectMenu
            v-model="form.category"
            :options="categoryOptions"
            option-attribute="label"
            value-attribute="id"
            placeholder="Select a Category..."
            searchable
            searchable-placeholder="Search categories..."
          >
            <template #label>
              <span v-if="form.category">
                {{ categoryOptions.find((c) => c.id === form.category)?.originalName }}
              </span>
              <span v-else class="text-gray-400">Select...</span>
            </template>
          </USelectMenu>
        </UFormGroup>

        <UFormGroup label="Title" class="col-span-2">
          <UInput v-model="projectForm.title" />
        </UFormGroup>

        <UFormGroup label="Category">
          <USelectMenu
            v-model="projectForm.category"
            :options="categories"
            value-attribute="id"
            option-attribute="name"
            searchable
          />
        </UFormGroup>

        <UFormGroup label="Client">
          <USelectMenu
            v-model="projectForm.client"
            :options="clients"
            value-attribute="id"
            option-attribute="name"
            searchable
          />
        </UFormGroup>

        <UFormGroup label="Print Method">
          <UInput v-model="projectForm.print_method" />
        </UFormGroup>

        <UFormGroup label="Description" class="col-span-2">
          <UTextarea v-model="projectForm.description" />
        </UFormGroup>

        <div class="col-span-2 mt-4">
          <UButton type="submit" :loading="loading" block>Create & Add Images</UButton>
        </div>
      </form>
    </div>

    <div v-else class="space-y-6">
      <div class="bg-green-50 p-4 border border-green-200 rounded">
        <p class="text-green-800 font-medium">
          Project "{{ projectForm.title }}" Created!
        </p>
        <p class="text-sm text-green-600">
          Now uploading images linked to ID: #{{ projectId }}
        </p>
      </div>

      <div class="bg-white p-6 rounded shadow border-2 border-dashed border-gray-300">
        <h3 class="font-bold mb-4">Add Project Image</h3>
        <div class="flex gap-4 items-end">
          <div class="flex-1">
            <FormImageUpload label="Image" v-model="newImage" />
          </div>
          <div class="flex-1">
            <UFormGroup label="Caption">
              <UInput v-model="newImageCaption" placeholder="e.g. Front view" />
            </UFormGroup>
          </div>
          <UButton @click="uploadImage" :disabled="!newImage">Upload</UButton>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <div v-for="img in projectImages" :key="img.id" class="relative group">
          <img :src="img.image" class="w-full h-32 object-cover rounded shadow" />
          <div
            class="absolute bottom-0 bg-black/50 text-white text-xs w-full p-1 truncate"
          >
            {{ img.caption }}
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-8">
        <UButton to="/dashboard/projects" color="gray">Finish & Go to List</UButton>
      </div>
    </div>
  </div>
</template>
