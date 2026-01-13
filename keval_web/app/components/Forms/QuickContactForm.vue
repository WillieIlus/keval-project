<!-- ~/components/forms/QuickContactForm.vue -->
<template>
  <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
    <!-- Success -->
    <div v-if="core.contactForm.success" class="text-center py-8">
      <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-gray-900">Thank You!</h3>
      <p class="text-gray-600 mt-2">We'll contact you soon.</p>
    </div>

    <!-- Form -->
    <UForm v-else :state="formData" @submit="handleSubmit" class="space-y-4">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Get a Free Quote</h3>
      
      <UFormGroup>
        <UInput
          v-model="formData.name"
          placeholder="Your Name"
          icon="i-heroicons-user"
          :disabled="core.contactForm.loading"
          required
        />
      </UFormGroup>

      <UFormGroup>
        <UInput
          v-model="formData.email"
          type="email"
          placeholder="Email Address"
          icon="i-heroicons-envelope"
          :disabled="core.contactForm.loading"
          required
        />
      </UFormGroup>

      <UFormGroup>
        <UInput
          v-model="formData.phone"
          type="tel"
          placeholder="Phone (e.g., 0711 635 104)"
          icon="i-heroicons-phone"
          :disabled="core.contactForm.loading"
        />
      </UFormGroup>

      <UFormGroup>
        <UTextarea
          v-model="formData.message"
          placeholder="Brief project description..."
          :rows="3"
          :disabled="core.contactForm.loading"
          required
        />
      </UFormGroup>

      <!-- Hidden field -->
      <input type="hidden" v-model="formData.service_interest">

      <UButton
        type="submit"
        block
        :loading="core.contactForm.loading"
        :disabled="core.contactForm.loading"
        class="bg-kevalorange-500 hover:bg-kevalorange-600"
      >
        Get Free Quote
      </UButton>

      <p v-if="core.contactForm.error" class="text-red-500 text-sm text-center">
        {{ core.contactForm.error }}
      </p>

      <!-- Alternative Contact -->
      <div class="pt-4 border-t border-gray-100 text-center">
        <p class="text-sm text-gray-500 mb-2">Or reach us directly:</p>
        <a 
          href="https://wa.me/254711635104?text=Hello%20Keval,%20I'm%20interested%20in%20a%20quote"
          target="_blank"
          class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
        >
          <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4" />
          WhatsApp: 0711 635 104
        </a>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { useCoreStore } from '~/stores/core'
import type { ContactFormData } from '~/types/api'

const core = useCoreStore()

const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  service_interest: 'general_inquiry',
  message: ''
})

async function handleSubmit() {
  if (!formData.name || !formData.email || !formData.message) return
  await core.submitContactForm(formData)
}

onUnmounted(() => {
  core.resetContactForm()
})
</script>