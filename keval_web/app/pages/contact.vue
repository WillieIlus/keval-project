<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p class="text-xl text-kevalgreen-100 max-w-2xl mx-auto">
            Have a project in mind? We would love to hear from you.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <!-- Contact Info Cards -->
          <div class="space-y-6">
            <!-- Address Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-kevalgreen-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p class="text-gray-600">
                Print Hub Building, Ground Floor
              </p>
              <p class="text-gray-600">
                Room B06, Kweria Road
              </p>
              <p class="text-gray-600">
                Nairobi, Kenya
              </p>
              <a 
                href="https://maps.app.goo.gl/w5WqA2cfVrFRKBve6" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-kevalgreen-600 hover:underline mt-3 text-sm font-medium"
              >
                Get Directions
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 ml-1" />
              </a>
            </div>

            <!-- Phone Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-kevalorange-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-kevalorange-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Call Us</h3>
              <p class="text-gray-600">
                <a href="tel:+254711635104" class="hover:text-kevalgreen-600">0711 635 104</a>
              </p>
              <p class="text-gray-600">
                <a href="tel:+254720335863" class="hover:text-kevalgreen-600">0720 335 863</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">Mon - Fri: 8:00 AM - 6:00 PM</p>
            </div>

            <!-- Email Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Email Us</h3>
              <p class="text-gray-600">
                <a href="mailto:info@keval.co.ke" class="hover:text-kevalgreen-600">info@keval.co.ke</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
            </div>

            <!-- WhatsApp Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p class="text-gray-600 mb-3">Quick responses via WhatsApp</p>
              <a 
                href="https://wa.me/254711635104"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
                Chat Now
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p class="text-gray-600 mb-8">Fill out the form below and we will get back to you within 24 hours.</p>
              <FormsContactForm :show-header="false" @success="handleSuccess" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        
        <div class="space-y-4">
          <div 
            v-for="(item, index) in faqItems" 
            :key="index" 
            class="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button 
              type="button"
              class="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              @click="toggleFaq(index)"
            >
              <span class="font-semibold text-gray-900">{{ item.question }}</span>
              <UIcon 
                :name="openFaq === index ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
                class="w-5 h-5 text-gray-500 flex-shrink-0"
              />
            </button>
            <div v-show="openFaq === index" class="px-5 pb-5 border-t border-gray-100">
              <p class="text-gray-600 pt-4">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-kevalgreen-600 py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
        <p class="text-kevalgreen-100 text-lg mb-8">
          Get a free quote today and lets bring your vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+254711635104" 
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kevalgreen-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            Call: 0711 635 104
          </a>
          <a 
            href="https://wa.me/254711635104"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
          >
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

useSeoMeta({
  title: 'Contact Us | Keval',
  description: 'Get in touch with Keval for all your printing and branding needs. Call 0711 635 104 or email info@keval.co.ke'
})

const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

const faqItems = [
  {
    question: 'What are your turnaround times?',
    answer: 'Standard turnaround is 3-5 business days. Rush orders can be completed in 24-48 hours for an additional fee.'
  },
  {
    question: 'Do you offer design services?',
    answer: 'Yes! Our in-house design team can help bring your vision to life. Design consultations are free.'
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF, AI, EPS, PSD, and high-resolution JPEG/PNG files. Vector files are preferred.'
  },
  {
    question: 'Do you deliver across Kenya?',
    answer: 'Yes! We deliver to all major towns in Kenya. Delivery within Nairobi is available same-day or next-day.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, bank transfers, and cash payments. A 50% deposit is required for new orders.'
  }
]

function handleSuccess() {
  toast.add({
    title: 'Message Sent!',
    description: 'We will get back to you within 24 hours.',
    color: 'success'
  })
}
</script>