<!-- ~/pages/dashboard/team.vue -->
<template>
  <div>
    <!-- Permission Warning -->
    <UAlert v-if="!auth.isSuperuser" color="warning" variant="soft" class="mb-6">
      <template #title>View Only</template>
      <template #description>You don't have permission to add or edit team members. Contact an administrator.</template>
    </UAlert>

    <AdminFormWrapper
      title="Team Members"
      subtitle="Manage your team profiles"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template v-if="auth.isSuperuser" #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Team Member
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-users" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No team members yet</p>
        <UButton v-if="auth.isSuperuser" @click="openModal()" variant="soft" class="mt-4">Add your first team member</UButton>
      </div>

      <!-- Team Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
        >
          <!-- Image -->
          <div class="aspect-square bg-gray-100 relative">
            <img 
              v-if="item.image" 
              :src="item.image" 
              :alt="item.name"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-user" class="w-20 h-20 text-gray-300" />
            </div>

            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <UBadge :color="item.is_active ? 'success' : 'neutral'" variant="solid">
                {{ item.is_active ? 'Active' : 'Inactive' }}
              </UBadge>
            </div>
          </div>

          <!-- Info -->
          <div class="p-4">
            <h3 class="font-bold text-gray-900">{{ item.name }}</h3>
            <p class="text-sm text-kevalgreen-600">{{ item.title }}</p>
            <p v-if="item.department" class="text-xs text-gray-500 mt-1">{{ item.department }}</p>

            <!-- Social Links -->
            <div class="flex gap-2 mt-3">
              <a 
                v-if="item.email" 
                :href="`mailto:${item.email}`"
                class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-gray-600" />
              </a>
              <a 
                v-if="item.linkedin" 
                :href="item.linkedin"
                target="_blank"
                class="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center"
              >
                <UIcon name="i-simple-icons-linkedin" class="w-4 h-4 text-blue-600" />
              </a>
              <a 
                v-if="item.twitter" 
                :href="item.twitter"
                target="_blank"
                class="w-8 h-8 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center"
              >
                <UIcon name="i-simple-icons-twitter" class="w-4 h-4 text-blue-400" />
              </a>
            </div>

            <!-- Actions -->
            <div v-if="auth.isSuperuser" class="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <UButton variant="ghost" size="xs" class="flex-1" @click="openModal(item)">
                <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
                Edit
              </UButton>
              <UButton variant="ghost" color="error" size="xs" class="flex-1" @click="confirmDelete(item)">
                <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-1" />
                Delete
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </AdminFormWrapper>

    <!-- Create/Edit Modal -->
    <UModal v-model:open="modalOpen" :ui="{ wrapper: 'sm:max-w-2xl' }">
      <template #content>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {{ editingItem ? 'Edit Team Member' : 'Add Team Member' }}
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

          <AdminFormsTeamMemberForm
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
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Remove Team Member?</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">This will remove {{ deletingItem?.name }} from your team.</p>
          <div class="flex gap-4 justify-center">
            <UButton variant="ghost" @click="deleteModalOpen = false">Cancel</UButton>
            <UButton color="error" :loading="admin.loading" @click="handleDelete">Remove</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from '~/stores/admin'
import { useAuthStore } from '~/stores/auth'
import type { TeamMember } from '~/types/api'

const admin = useAdminStore()
const auth = useAuthStore()

const items = ref<TeamMember[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<TeamMember | null>(null)
const deletingItem = ref<TeamMember | null>(null)

const ENDPOINT = '/api/team/'

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<TeamMember>(ENDPOINT)
  loading.value = false
}

function openModal(item?: TeamMember) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: TeamMember) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(formData: FormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<TeamMember>(ENDPOINT, editingItem.value.id, formData)
  } else {
    result = await admin.create<TeamMember>(ENDPOINT, formData)
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