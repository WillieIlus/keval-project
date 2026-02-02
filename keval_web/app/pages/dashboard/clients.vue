<!-- ~/pages/dashboard/clients.vue -->
<template>
  <div>
    <!-- Permission Warning -->
    <UAlert v-if="!auth.isSuperuser" color="warning" variant="soft" class="mb-6">
      <template #title>View Only</template>
      <template #description>You don't have permission to add or edit clients. Contact an administrator.</template>
    </UAlert>

    <AdminFormWrapper
      title="Clients"
      subtitle="Manage client logos and information"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template v-if="auth.isSuperuser" #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Client
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-building-office" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No clients yet</p>
        <UButton v-if="auth.isSuperuser" @click="openModal()" variant="soft" class="mt-4">Add your first client</UButton>
      </div>

      <!-- Clients Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="group relative bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all"
        >
          <!-- Logo -->
          <div class="aspect-video flex items-center justify-center mb-3 bg-gray-50 rounded-lg p-4">
            <img 
              v-if="item.logo" 
              :src="item.logo" 
              :alt="item.name"
              class="max-h-full max-w-full object-contain"
            >
            <UIcon v-else name="i-heroicons-building-office" class="w-12 h-12 text-gray-300" />
          </div>

          <!-- Info -->
          <h3 class="font-semibold text-gray-900 text-sm truncate">{{ item.name }}</h3>
          
          <div class="flex items-center gap-2 mt-2">
            <UBadge v-if="item.is_featured" color="warning" variant="soft" size="xs">Featured</UBadge>
            <span class="text-xs text-gray-400">Order: {{ item.order }}</span>
          </div>

          <!-- Actions Overlay -->
          <div v-if="auth.isSuperuser" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
            <UButton size="sm" color="neutral" @click="openModal(item)">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </UButton>
            <UButton size="sm" color="error" @click="confirmDelete(item)">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model:open="modalOpen">
      <template #content>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {{ editingItem ? 'Edit Client' : 'Add Client' }}
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

          <AdminFormsClientForm
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
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete Client?</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">This will remove "{{ deletingItem?.name }}" from your client list.</p>
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
import { useAuthStore } from '~/stores/auth'
import type { Client } from '~/types/api'

const admin = useAdminStore()
const auth = useAuthStore()

const items = ref<Client[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<Client | null>(null)
const deletingItem = ref<Client | null>(null)

const ENDPOINT = '/api/clients/'

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<Client>(ENDPOINT)
  loading.value = false
}

function openModal(item?: Client) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: Client) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(formData: FormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<Client>(ENDPOINT, editingItem.value.id, formData)
  } else {
    result = await admin.create<Client>(ENDPOINT, formData)
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