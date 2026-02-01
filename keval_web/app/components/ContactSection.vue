<template>
  <section class="py-24 bg-kevalgreen-500">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-white uppercase mb-4">
          Get In Touch
        </h2>
        <div class="w-20 h-1 bg-white mx-auto"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start">
        
        <!-- Contact Information - Left Side -->
        <div class="lg:col-span-2 space-y-10">
          <div>
            <h3 class="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <p class="text-white/80 leading-relaxed">
              Ready to elevate your brand? Reach out to our team for premium printing and branding solutions.
            </p>
          </div>

          <div class="space-y-6">
            <!-- Location -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wide mb-2">Location</h4>
                <p class="text-white/90 leading-relaxed">
                  Print Hub Building, Ground Floor<br />
                  Room B06, Kweria Road<br />
                  Nairobi, Kenya
                </p>
                <a 
                  href="https://www.google.com/maps/place/Keval+Investments+Ltd/@-1.280437,36.8218615,17z" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-white hover:text-kevalgreen-100 text-sm mt-2 font-medium"
                >
                  <span>View on Google Maps</span>
                  <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wide mb-2">Phone</h4>
                <p class="text-white/90">
                  <a href="tel:+254711635104" class="hover:text-white transition-colors">0711 635 104</a><br />
                  <a href="tel:+254720335863" class="hover:text-white transition-colors">0720 335 863</a>
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wide mb-2">Email</h4>
                <p class="text-white/90">
                  <a href="mailto:info@keval.co.ke" class="hover:text-white transition-colors">info@keval.co.ke</a>
                </p>
              </div>
            </div>

            <!-- Website -->
            <div class="flex gap-4 items-start">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-globe-alt" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white uppercase tracking-wide mb-2">Website</h4>
                <p class="text-white/90">
                  <a href="https://keval.co.ke" target="_blank" class="hover:text-white transition-colors">keval.co.ke</a>
                </p>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 class="text-sm font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white" />
              Business Hours
            </h4>
            <div class="space-y-2 text-white/90">
              <div class="flex justify-between">
                <span>Monday - Friday</span>
                <span class="font-semibold text-white">8:30 AM - 6:30 PM</span>
              </div>
              <div class="flex justify-between">
                <span>Saturday</span>
                <span class="font-semibold text-white">9:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between text-white/60">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <!-- Google Maps Embed -->
          <div class="rounded-xl overflow-hidden border border-white/20 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.4!2d36.8218615!3d-1.280437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11006958cba7%3A0x3bd7792c8d42927a!2sKeval%20Investments%20Ltd!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="250"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full"
            ></iframe>
          </div>
        </div>

        <!-- Contact Form - Right Side -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
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
                    placeholder="+254 7XX XXX XXX" 
                    size="xl"
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
                By submitting this form, you agree to our 
                <NuxtLink to="/privacy" class="text-kevalgreen-500 hover:underline">privacy policy</NuxtLink>.
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useContactStore } from '~/stores/contact'

const contactStore = useContactStore()
const loading = computed(() => contactStore.loading)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service_interest: 'Garment Printing',
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
    const success = await contactStore.submitForm(form)
    
    if (success) {
      alert('Thank you for contacting us! We have received your message and will get back to you within 24 hours.')
      
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        service_interest: 'Garment Printing',
        message: ''
      })
    }
  } catch (error) {
    alert(contactStore.error || 'Something went wrong. Please try again.')
  }
}
</script>