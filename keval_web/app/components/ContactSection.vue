<template>
  <section class="py-24 bg-gradient-to-b from-white to-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 uppercase mb-4">
          Get In Touch
        </h2>
        <div class="w-20 h-1 bg-kevalgreen-500 mx-auto"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start">
        
        <!-- Contact Information - Left Side -->
        <div class="lg:col-span-2 space-y-10">
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <p class="text-gray-600 leading-relaxed">
              Ready to elevate your brand? Reach out to our team for premium printing and branding solutions.
            </p>
          </div>

          <div class="space-y-6">
            <!-- Location -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-kevalgreen-500 rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Location</h4>
                <p class="text-gray-700 leading-relaxed">
                  Print Hub Building, Ground Floor<br />
                  Room No: B06, Kweria Road<br />
                  Industrial Area, Nairobi
                </p>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-kevalgreen-500 rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Phone</h4>
                <p class="text-gray-700">
                  <a href="tel:+254720335863" class="hover:text-kevalgreen-500 transition-colors">0720 335 863</a><br />
                  <a href="tel:+254711635104" class="hover:text-kevalgreen-500 transition-colors">0711 635 104</a>
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-kevalgreen-500 rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Email</h4>
                <p class="text-gray-700">
                  <a href="mailto:admin@keval.co.ke" class="hover:text-kevalgreen-500 transition-colors">admin@keval.co.ke</a><br />
                  <a href="mailto:kevalinvestmentsltd@gmail.com" class="hover:text-kevalgreen-500 transition-colors text-sm">kevalinvestmentsltd@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="bg-gray-100 rounded-xl p-6 border border-gray-200">
            <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Business Hours</h4>
            <div class="space-y-2 text-gray-700">
              <div class="flex justify-between">
                <span>Monday - Friday</span>
                <span class="font-semibold">8:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span>Saturday</span>
                <span class="font-semibold">9:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form - Right Side -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
            <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name and Email Row -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <UInput 
                    v-model="form.name" 
                    placeholder="John Doe" 
                    size="xl" 
                    required
                    :ui="{ 
                      base: 'border-gray-300 focus:border-kevalgreen-500 focus:ring-kevalgreen-500' 
                    }"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <UInput 
                    v-model="form.email" 
                    type="email" 
                    placeholder="john@example.com" 
                    size="xl" 
                    required
                    :ui="{ 
                      base: 'border-gray-300 focus:border-kevalgreen-500 focus:ring-kevalgreen-500' 
                    }"
                  />
                </div>
              </div>

              <!-- Phone and Service Row -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <UInput 
                    v-model="form.phone" 
                    type="tel" 
                    placeholder="+254 700 000 000" 
                    size="xl"
                    :ui="{ 
                      base: 'border-gray-300 focus:border-kevalgreen-500 focus:ring-kevalgreen-500' 
                    }"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Service Needed <span class="text-red-500">*</span>
                  </label>
                  <USelectMenu 
                    v-model="form.service_interest" 
                    :options="serviceOptions" 
                    size="xl"
                    :ui="{ 
                      base: 'border-gray-300 focus:border-kevalgreen-500 focus:ring-kevalgreen-500' 
                    }"
                  />
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span class="text-red-500">*</span>
                </label>
                <UTextarea 
                  v-model="form.message" 
                  placeholder="Please provide details about your project requirements..." 
                  :rows="5"
                  required
                  :ui="{ 
                    base: 'border-gray-300 focus:border-kevalgreen-500 focus:ring-kevalgreen-500' 
                  }"
                />
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <UButton 
                  type="submit" 
                  size="xl" 
                  block 
                  :loading="loading"
                  :disabled="loading"
                  class="bg-kevalgreen-500 hover:bg-kevalgreen-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span v-if="!loading">Send Message</span>
                  <span v-else>Sending...</span>
                </UButton>
              </div>

              <p class="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useContactStore } from '~/stores/contact' // Import the store

const contactStore = useContactStore()
const loading = computed(() => contactStore.loading) // Use store's loading state

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service_interest: 'Garment Printing', // Changed key to 'service_interest' to match Django
  message: ''
})

const serviceOptions = [
  'Garment Printing',
  'Corporate Branding',
  'Graphic Design',
  'Embroidery',
  'Large Format Printing',
  'Other'
]

const handleSubmit = async () => {
  try {
    // 1. Call the store's submit function
    const success = await contactStore.submitForm(form)
    
    if (success) {
      alert('Thank you for contacting us! We have received your message and will get back to you within 24 hours.')
      
      // 2. Reset form
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        service_interest: 'Garment Printing',
        message: ''
      })
    }
  } catch (error) {
    // Error is already handled/logged in the store, but you can add local alerts here
    alert(contactStore.error || 'Something went wrong. Please try again.')
  }
}
</script>