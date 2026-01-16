<!-- ~/pages/dashboard/projects.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Projects"
      subtitle="Manage your portfolio projects"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Project
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-rectangle-stack" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No projects yet</p>
        <UButton @click="openModal()" variant="soft" class="mt-4">Add your first project</UButton>
      </div>

      <!-- Projects Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Project</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Client</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Category</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Date</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
              <th class="text-right py-3 px-4 font-semibold text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in items" 
              :key="item.id"
              class="border-b border-gray-100 hover:bg-gray-50"
            >
              <td class="py-4 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img 
                      v-if="item.images?.[0]?.image" 
                      :src="item.images[0].image" 
                      :alt="item.title"
                      class="w-full h-full object-cover"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <UIcon name="i-heroicons-photo" class="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ item.title }}</p>
                    <p class="text-xs text-gray-500">{{ item.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-gray-600">{{ item.client || '-' }}</td>
              <td class="py-4 px-4">
                <UBadge v-if="item.category_name" variant="soft">{{ item.category_name }}</UBadge>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="py-4 px-4 text-gray-600 text-sm">
                {{ item.date_completed ? new Date(item.date_completed).toLocaleDateString() : '-' }}
              </td>
              <td class="py-4 px-4">
                <UBadge :color="item.is_featured ? 'yellow' : 'gray'" variant="soft">
                  {{ item.is_featured ? 'Featured' : 'Standard' }}
                </UBadge>
              </td>
              <td class="py-4 px-4">
                <div class="flex justify-end gap-2">
                  <UButton variant="ghost" size="xs" @click="openModal(item)">
                    <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="xs" @click="openImagesModal(item)">
                    <UIcon name="i-heroicons-photo" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" color="red" size="xs" @click="confirmDelete(item)">
                    <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model="modalOpen" :ui="{ width: 'sm:max-w-2xl' }">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ editingItem ? 'Edit Project' : 'New Project' }}
        </h2>
        <AdminFormsProjectForm
          :initial-data="editingItem"
          :categories="categories"
          :loading="admin.loading"
          @submit="handleSubmit"
          @cancel="modalOpen = false"
        />
      </div>
    </UModal>

    <!-- Images Modal -->
    <UModal v-model="imagesModalOpen" :ui="{ width: 'sm:max-w-3xl' }">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          Manage Images - {{ editingItem?.title }}
        </h2>
        
        <!-- Current Images -->
        <div v-if="editingItem?.images?.length" class="grid grid-cols-3 gap-4 mb-6">
          <div 
            v-for="(img, index) in editingItem.images" 
            :key="img.id"
            class="relative aspect-square rounded-lg overflow-hidden group"
          >
            <img :src="img.image" :alt="img.caption" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <UButton size="xs" color="red" @click="deleteImage(img.id)">
                <UIcon name="i-heroicons-trash" class="w-4 h-4" />
              </UButton>
            </div>
            <UBadge v-if="img.is_cover" class="absolute top-2 left-2" color="yellow">Cover</UBadge>
          </div>
        </div>

        <p v-else class="text-gray-500 text-center py-8">No images yet</p>

        <!-- Upload New -->
        <div class="border-t pt-6">
          <FormsMultiImageUpload
            v-model="newImages"
            label="Add New Images"
            :max-images="10"
          />
        </div>

        <div class="flex justify-end gap-4 mt-6">
          <UButton variant="ghost" @click="imagesModalOpen = false">Close</UButton>
          <UButton 
            v-if="newImages.length > 0"
            :loading="admin.loading" 
            class="bg-kevalgreen-500 hover:bg-kevalgreen-600"
            @click="uploadImages"
          >
            Upload {{ newImages.length }} Image(s)
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation -->
    <UModal v-model="deleteModalOpen">
      <div class="p-6 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Project?</h3>
        <p class="text-gray-600 mb-6">This will permanently delete "{{ deletingItem?.title }}" and all its images.</p>
        <div class="flex gap-4 justify-center">
          <UButton variant="ghost" @click="deleteModalOpen = false">Cancel</UButton>
          <UButton color="red" :loading="admin.loading" @click="handleDelete">Delete</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import { useGalleryStore } from '~/stores/gallery'
import type { Project, ServiceCategory, ProjectFormData } from '~/types/api'

const admin = useAdminStore()
const gallery = useGalleryStore()

const items = ref<Project[]>([])
const categories = ref<ServiceCategory[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const imagesModalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<Project | null>(null)
const deletingItem = ref<Project | null>(null)
const newImages = ref<any[]>([])

const ENDPOINT = '/api/portfolio/projects/'

async function loadItems() {
  loading.value = true
  
  // Load projects and categories
  const [projectsData, categoriesData] = await Promise.all([
    admin.fetchAll<Project>(ENDPOINT),
    admin.fetchAll<ServiceCategory>('/api/portfolio/categories/')
  ])
  
  items.value = projectsData
  categories.value = categoriesData
  loading.value = false
}

function openModal(item?: Project) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function openImagesModal(item: Project) {
  editingItem.value = item
  newImages.value = []
  imagesModalOpen.value = true
}

function confirmDelete(item: Project) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(data: ProjectFormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<Project>(ENDPOINT, editingItem.value.id, data)
  } else {
    result = await admin.create<Project>(ENDPOINT, data)
  }

  if (result) {
    modalOpen.value = false
    await loadItems()
  }
}

async function handleDelete() {
  if (!deletingItem.value) return
  
  const success = await admin.remove(ENDPOINT, deletingItem.value.id)
  if (success) {
    deleteModalOpen.value = false
    deletingItem.value = null
    await loadItems()
  }
}

async function uploadImages() {
  if (!editingItem.value?.id || newImages.value.length === 0) return

  for (const img of newImages.value) {
    if (img.file) {
      const formData = new FormData()
      formData.append('project', String(editingItem.value.id))
      formData.append('image', img.file)
      formData.append('is_cover', String(img.isCover || false))
      formData.append('order', '0')
      
      await admin.create('/api/portfolio/project-images/', formData)
    }
  }

  newImages.value = []
  await loadItems()
  
  // Refresh the editing item
  const updated = items.value.find(p => p.id === editingItem.value?.id)
  if (updated) editingItem.value = updated
}

async function deleteImage(imageId: number) {
  await admin.remove('/api/portfolio/project-images/', imageId)
  await loadItems()
  
  // Refresh the editing item
  const updated = items.value.find(p => p.id === editingItem.value?.id)
  if (updated) editingItem.value = updated
}

onMounted(() => {
  loadItems()
})
</script>