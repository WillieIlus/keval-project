<!-- ~/pages/dashboard/banners.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Banners"
      subtitle="Manage homepage banners"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Banner
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="banners.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No banners yet</p>
      </div>

      <!-- Banners List -->
      <div v-else class="space-y-4">
        <div 
          v-for="banner in banners" 
          :key="banner.id"
          class="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
        >
          <img 
            v-if="banner.image" 
            :src="banner.image" 
            :alt="banner.title"
            class="w-24 h-16 object-cover rounded-lg bg-gray-100"
          >
          <div class="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center" v-else>
            <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400" />
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 truncate">{{ banner.title }}</h3>
            <p class="text-sm text-gray-500 truncate">{{ banner.subtitle }}</p>
          </div>

          <UBadge :color="banner.is_active ? 'green' : 'gray'" variant="soft">
            {{ banner.is_active ? 'Active' : 'Inactive' }}
          </UBadge>

          <div class="flex gap-2">
            <UButton variant="ghost" size="sm" @click="openModal(banner)">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </UButton>
            <UButton variant="ghost" color="red" size="sm" @click="confirmDelete(banner)">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model="modalOpen">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ editingBanner ? 'Edit Banner' : 'New Banner' }}
        </h2>
        <AdminFormsBannerForm
          :initial-data="editingBanner"
          :loading="admin.loading"
          @submit="handleSubmit"
          @cancel="modalOpen = false"
        />
      </div>
    </UModal>

    <!-- Delete Confirmation -->
    <UModal v-model="deleteModalOpen">
      <div class="p-6 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Banner?</h3>
        <p class="text-gray-600 mb-6">This action cannot be undone.</p>
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
import type { Banner } from '~/types/api'

const admin = useAdminStore()

const banners = ref<Banner[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingBanner = ref<Banner | null>(null)
const deletingBanner = ref<Banner | null>(null)

async function loadBanners() {
  loading.value = true
  banners.value = await admin.fetchAll<Banner>('/api/banners/')
  loading.value = false
}

function openModal(banner?: Banner) {
  editingBanner.value = banner || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(banner: Banner) {
  deletingBanner.value = banner
  deleteModalOpen.value = true
}

async function handleSubmit(formData: FormData) {
  let result
  if (editingBanner.value?.id) {
    result = await admin.update<Banner>('/api/banners/', editingBanner.value.id, formData)
  } else {
    result = await admin.create<Banner>('/api/banners/', formData)
  }

  if (result) {
    modalOpen.value = false
    await loadBanners()
  }
}

async function handleDelete() {
  if (!deletingBanner.value) return
  
  const success = await admin.remove('/api/banners/', deletingBanner.value.id)
  if (success) {
    deleteModalOpen.value = false
    await loadBanners()
  }
}

onMounted(() => {
  loadBanners()
})
</script>