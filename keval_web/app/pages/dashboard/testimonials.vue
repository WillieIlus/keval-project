<!-- ~/pages/dashboard/testimonials.vue -->
<template>
  <div>
    <AdminFormWrapper
      title="Testimonials"
      subtitle="Manage customer reviews and feedback"
      :error="admin.error"
      :success="admin.success"
      @clear-error="admin.clearMessages"
      @clear-success="admin.clearMessages"
    >
      <template #actions>
        <UButton @click="openModal()" class="bg-kevalgreen-500 hover:bg-kevalgreen-600">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add Testimonial
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="text-center py-12">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-500">No testimonials yet</p>
        <UButton @click="openModal()" variant="soft" class="mt-4">Add your first testimonial</UButton>
      </div>

      <!-- Testimonials List -->
      <div v-else class="space-y-4">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors"
        >
          <div class="flex items-start gap-4">
            <!-- Avatar -->
            <div class="shrink-0">
              <img 
                v-if="item.avatar" 
                :src="item.avatar" 
                :alt="item.client_name"
                class="w-14 h-14 rounded-full object-cover"
              >
              <div v-else class="w-14 h-14 bg-kevalgreen-100 rounded-full flex items-center justify-center">
                <span class="text-kevalgreen-600 font-bold text-lg">
                  {{ item.client_name?.charAt(0) || 'C' }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="font-semibold text-gray-900">{{ item.client_name }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ item.position }}
                    <span v-if="item.company">, {{ item.company }}</span>
                  </p>
                </div>

                <!-- Rating -->
                <div class="flex gap-0.5">
                  <UIcon 
                    v-for="star in 5" 
                    :key="star"
                    name="i-heroicons-star-solid"
                    :class="star <= item.rating ? 'text-yellow-400' : 'text-gray-200'"
                    class="w-4 h-4"
                  />
                </div>
              </div>

              <p class="mt-3 text-gray-600 line-clamp-3">{{ item.content }}</p>

              <!-- Actions -->
              <div class="flex items-center gap-2 mt-4">
                <UButton variant="ghost" size="xs" @click="openModal(item)">
                  <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
                  Edit
                </UButton>
                <UButton variant="ghost" color="red" size="xs" @click="confirmDelete(item)">
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
    <UModal v-model="modalOpen">
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">
          {{ editingItem ? 'Edit Testimonial' : 'Add Testimonial' }}
        </h2>
        <AdminFormsTestimonialForm
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
        <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Testimonial?</h3>
        <p class="text-gray-600 mb-6">This will remove the testimonial from {{ deletingItem?.client_name }}.</p>
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
import type { Testimonial } from '~/types/api'

const admin = useAdminStore()

const items = ref<Testimonial[]>([])
const loading = ref(false)
const modalOpen = ref(false)
const deleteModalOpen = ref(false)
const editingItem = ref<Testimonial | null>(null)
const deletingItem = ref<Testimonial | null>(null)

const ENDPOINT = '/api/testimonials/'

async function loadItems() {
  loading.value = true
  items.value = await admin.fetchAll<Testimonial>(ENDPOINT)
  loading.value = false
}

function openModal(item?: Testimonial) {
  editingItem.value = item || null
  admin.clearMessages()
  modalOpen.value = true
}

function confirmDelete(item: Testimonial) {
  deletingItem.value = item
  deleteModalOpen.value = true
}

async function handleSubmit(formData: FormData) {
  let result
  if (editingItem.value?.id) {
    result = await admin.update<Testimonial>(ENDPOINT, editingItem.value.id, formData)
  } else {
    result = await admin.create<Testimonial>(ENDPOINT, formData)
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