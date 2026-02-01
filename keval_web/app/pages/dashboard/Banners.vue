<!-- ~/pages/dashboard/banners.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Banners"
      subtitle="Manage homepage hero banners"
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
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No banners yet</p>
        <UButton @click="openModal()" variant="soft" class="mt-4">Add your first banner</UButton>
      </div>

      <!-- Banners List -->
      <div v-else class="space-y-4">
        <div 
          v-for="item in sortedItems" 
          :key="item.id"
          class="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
        >
          <!-- Thumbnail -->
          <div class="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 truncate">{{ item.title }}</h3>
            <p class="text-sm text-gray-500 truncate">{{ item.subtitle || 'No subtitle' }}</p>
            <div class="flex items-center gap-3 mt-1">
              <span v-if="item.cta_text" class="text-xs text-kevalgreen-600">
                CTA: {{ item.cta_text }}
              </span>
            </div>
          </div>

          <!-- Status & Order -->
          <div class="flex items-center gap-4 shrink-0">
            <span class="text-sm text-gray-400">{{ item.order }}</span>
            <UBadge :color="item.is_active ? 'success' : 'neutral'" variant="soft">
              {{ item.is_active ? 'Active' : 'Inactive' }}
            </UBadge>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 shrink-0">
            <UButton variant="ghost" size="sm" @click="openModal(item)">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </UButton>
            <UButton variant="ghost" color="error" size="sm" @click="confirmDelete(item)">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model:open="modalOpen" :ui="{ wrapper: 'sm:max-w-2xl' }">
      <template #content>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {{ editingItem ? 'Edit Banner' : 'New Banner' }}
          </h2>
          <UAlert
            v-if="admin.error"
            color="error"
            variant="soft"
            class="mb-6"
            :close-button="{ icon: 'i-heroicons-x-mark' }"
            @close="admin.clearMessages"
          >
            <template #title>{{ admin.error }}</template>
          </UAlert>

          <UAlert
            v-if="admin.success"
            color="success"
            variant="soft"
            class="mb-6"
            :close-button="{ icon: 'i-heroicons-x-mark' }"
            @close="admin.clearMessages"
          >
            <template #title>{{ admin.success }}</template>
          </UAlert>

          <AdminFormsBannerForm
            :initial-data="editingItem"
            :loading="admin.loading"
            @submit="handleSubmit"
            @cancel="modalOpen = false"
          />
        </div>
      </template>
    </UModal>

    <!-- Delete Confirmation -->
    <UModal v-model:open="deleteModalOpen">
      <template #content>
        <div class="p-6 text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Banner?</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">This will permanently delete "{{ deletingItem?.title }}".</p>
          <div class="flex gap-4 justify-center">
            <UButton variant="ghost" @click="deleteModalOpen = false">Cancel</UButton>
            <UButton color="error" :loading="admin.loading" @click="handleDelete">Delete</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import type { Banner } from '~/types/api'

const admin = useAdminStore()

const items = ref<Banner[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<Banner | null>(null)
const deletingItem = ref<Banner | null>(null)

const ENDPOINT = '/api/banners/'

const sortedItems = computed(() => 
  [...items.value].sort((a, b) => a.order - b.order)
)

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<Banner>(ENDPOINT)
  loading.value = false
}

function openModal(item?: Banner) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: Banner) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(formData: FormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<Banner>(ENDPOINT, editingItem.value.id, formData)
  } else {
    result = await admin.create<Banner>(ENDPOINT, formData)
  }

  if (result) {
    setTimeout(async () => {
      modalOpen.value = false
      admin.clearMessages()
      await loadItems()
    }, 1500)
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

onMounted(() => {
  loadItems()
})
</script>