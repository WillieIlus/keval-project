<!-- ~/pages/contact.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p class="text-xl text-kevalgreen-100 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
            <!-- Address -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="heroicons:map-pin" class="w-6 h-6 text-kevalgreen-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p class="text-gray-600">
                123 Industrial Area<br>
                Dar es Salaam, Tanzania
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank"
                class="inline-flex items-center text-kevalgreen-600 hover:underline mt-3 text-sm font-medium"
              >
                Get Directions
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4 ml-1" />
              </a>
            </div>

            <!-- Phone -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-kevalorange-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="heroicons:phone" class="w-6 h-6 text-kevalorange-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Call Us</h3>
              <p class="text-gray-600">
                <a href="tel:+255123456789" class="hover:text-kevalgreen-600">+255 123 456 789</a><br>
                <a href="tel:+255987654321" class="hover:text-kevalgreen-600">+255 987 654 321</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">Mon - Fri: 8:00 AM - 6:00 PM</p>
            </div>

            <!-- Email -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="heroicons:envelope" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Email Us</h3>
              <p class="text-gray-600">
                <a href="mailto:info@kevalprint.com" class="hover:text-kevalgreen-600">info@kevalprint.com</a><br>
                <a href="mailto:sales@kevalprint.com" class="hover:text-kevalgreen-600">sales@kevalprint.com</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
            </div>

            <!-- Social Media -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h3 class="font-bold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex gap-3">
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-kevalgreen-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Icon name="heroicons:globe-alt" class="w-5 h-5 text-blue-600" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-kevalgreen-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Icon name="heroicons:camera" class="w-5 h-5 text-pink-600" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-kevalgreen-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icon name="heroicons:briefcase" class="w-5 h-5 text-blue-700" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-kevalgreen-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5 text-green-600" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm p-8">
              <ContactForm :show-header="false" @success="handleSuccess" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="h-96 bg-gray-200 relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932537!2d39.1037!3d-6.7924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4bae169bd6f1%3A0x940f6b26a086a1dd!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1234567890"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="absolute inset-0"
        title="Map"
      ></iframe>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" class="border border-gray-200 rounded-xl">
            <button 
              @click="toggleFaq(index)"
              class="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
            >
              <span class="font-semibold text-gray-900">{{ item.question }}</span>
              <Icon 
                :name="openFaq === index ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
                class="w-5 h-5 text-gray-500"
              />
            </button>
            <div v-show="openFaq === index" class="px-5 pb-5">
              <p class="text-gray-600">{{ item.answer }}</p>
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
          Get a free quote today and let's bring your vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="xl" class="bg-white text-kevalgreen-600 hover:bg-gray-100">
            <Icon name="heroicons:phone" class="w-5 h-5 mr-2" />
            Call Now
          </UButton>
          <UButton size="xl" variant="outline" class="border-white text-white hover:bg-white/10">
            <Icon name="heroicons:calendar" class="w-5 h-5 mr-2" />
            Schedule a Visit
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

useSeoMeta({
  title: 'Contact Us | Keval Print',
  description: 'Get in touch with Keval Print for all your printing and branding needs. We respond within 24 hours.',
  ogTitle: 'Contact Keval Print',
  ogDescription: 'Have a project in mind? Contact us today for a free quote.'
})

// FAQ State
const openFaq = ref<number | null>(null)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

// FAQ Items
const faqItems = [
  {
    question: 'What are your turnaround times?',
    answer: 'Standard turnaround is 3-5 business days. Rush orders can be completed in 24-48 hours for an additional fee. Large format projects may require additional time depending on complexity.'
  },
  {
    question: 'Do you offer design services?',
    answer: 'Yes! Our in-house design team can help bring your vision to life. We offer logo design, brand identity, and print-ready artwork preparation. Design consultations are free.'
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF, AI, EPS, PSD, and high-resolution JPEG/PNG files. For best results, please provide vector files (AI, EPS, PDF) with fonts outlined and images at 300 DPI or higher.'
  },
  {
    question: 'Do you offer installation services?',
    answer: 'Yes, we provide professional installation for vehicle wraps, signage, wall graphics, and window films. Our certified installers ensure perfect application every time.'
  },
  {
    question: 'What is your minimum order quantity?',
    answer: 'There is no minimum order for most products. However, bulk orders receive significant discounts. Contact us for a custom quote based on your specific needs.'
  }
]

// Handle form success
function handleSuccess() {
  toast.add({
    title: 'Message Sent!',
    description: 'We will get back to you within 24 hours.',
    icon: 'i-heroicons-check-circle',
    color: 'green'
  })
}
</script>