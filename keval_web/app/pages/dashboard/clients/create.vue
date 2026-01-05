<script setup lang="ts">
const { $api } = useNuxtApp()
const toast = useToast()
const router = useRouter()

const form = reactive({
  name: '',
  website: '',
  is_featured: false,
  order: 0,
  logo: null // This will hold the File
})

const loading = ref(false)

async function submit() {
  loading.value = true
  
  // 1. Convert to FormData (Required for images)
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('website', form.website)
  formData.append('is_featured', String(form.is_featured)) // Convert boolean to string
  formData.append('order', String(form.order))
  
  if (form.logo) {
    formData.append('logo', form.logo)
  }

  try {
    await $api('/api/clients/', { method: 'POST', body: formData })
    toast.add({ title: 'Success', description: 'Client created!', color: 'green' })
    router.push('/dashboard/clients')
  } catch (err) {
    toast.add({ title: 'Error', description: 'Failed to create client', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-6">Add New Client</h1>

    <form @submit.prevent="submit" class="space-y-5">
      <UFormGroup label="Company Name">
        <UInput v-model="form.name" />
      </UFormGroup>

      <UFormGroup label="Website">
        <UInput v-model="form.website" placeholder="https://" />
      </UFormGroup>

      <FormImageUpload label="Company Logo" v-model="form.logo" />

      <div class="flex gap-4">
        <UFormGroup label="Order Priority">
          <UInput type="number" v-model="form.order" />
        </UFormGroup>
        
        <UCheckbox v-model="form.is_featured" label="Feature on Homepage?" class="mt-8" />
      </div>

      <UButton type="submit" :loading="loading" block>Save Client</UButton>
    </form>
  </div>
</template>