<!-- ~/components/forms/ContactForm.vue -->
<template>
  <div class="w-full max-w-2xl mx-auto">
    <!-- Success State -->
    <div v-if="core.contactForm.success" class="text-center py-12">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="heroicons:check" class="w-10 h-10 text-green-600" />
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
      <p class="text-gray-600 mb-6">
        Thank you for reaching out. We'll get back to you within 24 hours.
      </p>
      <UButton @click="handleReset" variant="outline" size="lg">
        Send Another Message
      </UButton>
    </div>

    <!-- Form State -->
    <div v-else>
      <!-- Header -->
      <div class="text-center mb-8" v-if="showHeader">
        <h2 class="text-3xl font-bold text-gray-900">Get In Touch</h2>
        <p class="text-gray-500 mt-2">We'd love to hear from you. Send us a message!</p>
      </div>

      <!-- Error Alert -->
      <UAlert
        v-if="core.contactForm.error"
        color="red"
        variant="soft"
        class="mb-6"
        :close-button="{ icon: 'i-heroicons-x-mark', color: 'red', variant: 'link' }"
        @close="core.resetContactForm"
      >
        <template #title>{{ core.contactForm.error }}</template>
      </UAlert>

      <!-- Form -->
      <UForm :state="formData" :validate="validate" @submit="handleSubmit" class="space-y-6">
        <!-- Name & Email Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Your Name" name="name" required>
            <UInput
              v-model="formData.name"
              placeholder="John Doe"
              icon="i-heroicons-user"
              size="lg"
              :disabled="core.contactForm.loading"
            />
          </UFormGroup>

          <UFormGroup label="Email Address" name="email" required>
            <UInput
              v-model="formData.email"
              type="email"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
              size="lg"
              :disabled="core.contactForm.loading"
            />
          </UFormGroup>
        </div>

        <!-- Phone & Service Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormGroup label="Phone Number" name="phone">
            <UInput
              v-model="formData.phone"
              type="tel"
              placeholder="+255 123 456 789"
              icon="i-heroicons-phone"
              size="lg"
              :disabled="core.contactForm.loading"
            />
          </UFormGroup>

          <UFormGroup label="Service Interest" name="service_interest" required>
            <USelectMenu
              v-model="formData.service_interest"
              :options="serviceOptions"
              placeholder="Select a service"
              size="lg"
              :disabled="core.contactForm.loading"
            />
          </UFormGroup>
        </div>

        <!-- Message -->
        <UFormGroup label="Your Message" name="message" required>
          <UTextarea
            v-model="formData.message"
            placeholder="Tell us about your project or inquiry..."
            :rows="5"
            size="lg"
            :disabled="core.contactForm.loading"
          />
          <template #hint>
            <span class="text-xs text-gray-400">{{ formData.message.length }}/1000 characters</span>
          </template>
        </UFormGroup>

        <!-- Submit Button -->
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p class="text-sm text-gray-500">
            <Icon name="heroicons:shield-check" class="w-4 h-4 inline mr-1" />
            Your information is secure and will never be shared.
          </p>
          
          <UButton
            type="submit"
            size="lg"
            :loading="core.contactForm.loading"
            :disabled="core.contactForm.loading"
            class="bg-kevalgreen-500 hover:bg-kevalgreen-600 px-8"
          >
            <Icon name="heroicons:paper-airplane" class="w-5 h-5 mr-2" />
            {{ core.contactForm.loading ? 'Sending...' : 'Send Message' }}
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoreStore } from '~/stores/core'
import type { ContactFormData } from '~/types/api'

// Props
const props = withDefaults(defineProps<{
  showHeader?: boolean
  preselectedService?: string
}>(), {
  showHeader: true,
  preselectedService: ''
})

// Emit for parent components
const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', message: string): void
}>()

const core = useCoreStore()

// Service options (match your Django model choices)
const serviceOptions = [
  { label: 'Large Format Printing', value: 'large_format' },
  { label: 'Vehicle Wraps & Branding', value: 'vehicle_wraps' },
  { label: 'Signage & Displays', value: 'signage' },
  { label: 'Corporate Branding', value: 'corporate' },
  { label: 'Event Materials', value: 'events' },
  { label: 'Custom Packaging', value: 'packaging' },
  { label: 'Other / General Inquiry', value: 'other' }
]

// Form state
const formData = reactive<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  service_interest: props.preselectedService || '',
  message: ''
})

// Validation
const validate = (state: ContactFormData) => {
  const errors = []
  
  if (!state.name?.trim()) {
    errors.push({ path: 'name', message: 'Name is required' })
  } else if (state.name.trim().length < 2) {
    errors.push({ path: 'name', message: 'Name must be at least 2 characters' })
  }
  
  if (!state.email) {
    errors.push({ path: 'email', message: 'Email is required' })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errors.push({ path: 'email', message: 'Please enter a valid email' })
  }
  
  if (state.phone && !/^[\d\s\-+()]+$/.test(state.phone)) {
    errors.push({ path: 'phone', message: 'Please enter a valid phone number' })
  }
  
  if (!state.service_interest) {
    errors.push({ path: 'service_interest', message: 'Please select a service' })
  }
  
  if (!state.message?.trim()) {
    errors.push({ path: 'message', message: 'Message is required' })
  } else if (state.message.trim().length < 10) {
    errors.push({ path: 'message', message: 'Message must be at least 10 characters' })
  } else if (state.message.length > 1000) {
    errors.push({ path: 'message', message: 'Message must be less than 1000 characters' })
  }
  
  return errors
}

// Submit handler
async function handleSubmit() {
  const success = await core.submitContactForm(formData)
  
  if (success) {
    emit('success')
  } else {
    emit('error', core.contactForm.error || 'Submission failed')
  }
}

// Reset form
function handleReset() {
  core.resetContactForm()
  formData.name = ''
  formData.email = ''
  formData.phone = ''
  formData.service_interest = props.preselectedService || ''
  formData.message = ''
}

// Clear state on unmount
onUnmounted(() => {
  core.resetContactForm()
})
</script>