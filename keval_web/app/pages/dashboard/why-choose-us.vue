<!-- ~/pages/dashboard/why-choose-us.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Why Choose Us"
      subtitle="Manage reasons why customers should choose you"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Reason
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-star" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No reasons added yet</p>
        <UButton @click="openModal()" variant="soft" class="mt-4">Add your first reason</UButton>
      </div>

      <!-- Items List -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="item in sortedItems" 
          :key="item.id"
          class="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 bg-kevalorange-100 rounded-xl flex items-center justify-center shrink-0">
              <UIcon :name="item.icon || 'i-heroicons-star'" class="w-6 h-6 text-kevalorange-600" />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
                <span class="text-xs text-gray-400 shrink-0">{{ item.order }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ item.description }}</p>

              <!-- Actions -->
              <div class="flex gap-2 mt-4">
                <UButton variant="ghost" size="xs" @click="openModal(item)">
                  <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
                  Edit
                </UButton>
                <UButton variant="ghost" color="error" size="xs" @click="confirmDelete(item)">
                  <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
                  Delete
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {{ editingItem ? 'Edit Reason' : 'Add Reason' }}
          </h2>
          <AdminFormsWhyChooseUsForm
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
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete This Reason?</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">This will remove "{{ deletingItem?.title }}" from the list.</p>
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
import type { WhyChooseUs, WhyChooseUsFormData } from '~/types/api'

const admin = useAdminStore()

const items = ref<WhyChooseUs[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<WhyChooseUs | null>(null)
const deletingItem = ref<WhyChooseUs | null>(null)

const ENDPOINT = '/api/why-choose-us/'

const sortedItems = computed(() => 
  [...items.value].sort((a, b) => a.order - b.order)
)

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<WhyChooseUs>(ENDPOINT)
  loading.value = false
}

function openModal(item?: WhyChooseUs) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: WhyChooseUs) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(data: WhyChooseUsFormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<WhyChooseUs>(ENDPOINT, editingItem.value.id, data)
  } else {
    result = await admin.create<WhyChooseUs>(ENDPOINT, data)
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