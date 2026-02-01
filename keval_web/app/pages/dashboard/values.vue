<!-- ~/pages/dashboard/values.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Core Values"
      subtitle="Manage your company core values"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Value
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-heart" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No core values yet</p>
        <UButton @click="openModal()" variant="soft" class="mt-4">Add your first value</UButton>
      </div>

      <!-- Values List -->
      <div v-else class="space-y-4">
        <div 
          v-for="item in sortedItems" 
          :key="item.id"
          class="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
        >
          <!-- Icon -->
          <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center shrink-0">
            <UIcon :name="item.icon || 'i-heroicons-heart'" class="w-6 h-6 text-kevalgreen-600" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 line-clamp-1">{{ item.description }}</p>
          </div>

          <!-- Order -->
          <span class="text-sm text-gray-400 shrink-0">Order: {{ item.order }}</span>

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
    <UModal v-model="modalOpen">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ editingItem ? 'Edit Core Value' : 'Add Core Value' }}
        </h2>
        <AdminFormsCoreValueForm
          :initial-data="editingItem"
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
        <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Core Value?</h3>
        <p class="text-gray-600 mb-6">This will remove "{{ deletingItem?.title }}" from your values.</p>
        <div class="flex gap-4 justify-center">
          <UButton variant="ghost" @click="deleteModalOpen = false">Cancel</UButton>
          <UButton color="error" :loading="admin.loading" @click="handleDelete">Delete</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import type { CoreValue, CoreValueFormData } from '~/types/api'

const admin = useAdminStore()

const items = ref<CoreValue[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<CoreValue | null>(null)
const deletingItem = ref<CoreValue | null>(null)

const ENDPOINT = '/api/values/'

const sortedItems = computed(() => 
  [...items.value].sort((a, b) => a.order - b.order)
)

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<CoreValue>(ENDPOINT)
  loading.value = false
}

function openModal(item?: CoreValue) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: CoreValue) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(data: CoreValueFormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<CoreValue>(ENDPOINT, editingItem.value.id, data)
  } else {
    result = await admin.create<CoreValue>(ENDPOINT, data)
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

onMounted(() => {
  loadItems()
})
</script>