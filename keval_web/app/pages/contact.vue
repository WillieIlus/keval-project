<!-- ~/pages/contact.vue -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p class="text-xl text-kevalgreen-100 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Let's create something amazing together.
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
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-kevalgreen-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Visit Us</h3>
              <p class="text-gray-600">
                Print Hub Building, Ground Floor<br>
                Room B06, Kweria Road<br>
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

            <!-- Phone -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-kevalorange-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-kevalorange-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Call Us</h3>
              <p class="text-gray-600">
                <a href="tel:+254711635104" class="hover:text-kevalgreen-600 block">0711 635 104</a>
                <a href="tel:+254720335863" class="hover:text-kevalgreen-600 block">0720 335 863</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p class="text-sm text-gray-500">Sat: 9:00 AM - 2:00 PM</p>
            </div>

            <!-- Email -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">Email Us</h3>
              <p class="text-gray-600">
                <a href="mailto:info@keval.co.ke" class="hover:text-kevalgreen-600">info@keval.co.ke</a>
              </p>
              <p class="text-sm text-gray-500 mt-2">We respond within 24 hours</p>
            </div>

            <!-- WhatsApp -->
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p class="text-gray-600 mb-3">Quick responses via WhatsApp</p>
              <a 
                href="https://wa.me/254711635104?text=Hello%20Keval,%20I'm%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
                Chat Now
              </a>
            </div>

            <!-- Social Media -->
            <div class="bg-white rounded-2xl p-6 shadow-sm">
              <h3 class="font-bold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex gap-3">
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <UIcon name="i-simple-icons-facebook" class="w-5 h-5 text-blue-600" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-pink-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <UIcon name="i-simple-icons-instagram" class="w-5 h-5 text-pink-600" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <UIcon name="i-simple-icons-linkedin" class="w-5 h-5 text-blue-700" />
                </a>
                <a 
                  href="#" 
                  class="w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <UIcon name="i-simple-icons-tiktok" class="w-5 h-5 text-gray-900" />
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p class="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
              <FormsContactForm :show-header="false" @success="handleSuccess" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="h-96 bg-gray-200 relative">
      <!-- Google Maps Embed -->
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819081049286!2d36.82194!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba71e5b%3A0x5a5a5a5a5a5a5a5a!2sPrint%20Hub%20Building!5e0!3m2!1sen!2ske!4v1234567890"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="absolute inset-0"
        title="Keval Location Map"
      ></iframe>
      
      <!-- Map Overlay Card -->
      <div class="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-kevalgreen-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900">Keval Investments</h3>
            <p class="text-sm text-gray-600">Print Hub Building, Kweria Road</p>
            <a 
              href="https://maps.app.goo.gl/w5WqA2cfVrFRKBve6"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-kevalgreen-600 hover:underline font-medium inline-flex items-center mt-1"
            >
              Open in Google Maps
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" class="border border-gray-200 rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(index)"
              class="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
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
          Get a free quote today and let's bring your vision to life.
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
            href="https://wa.me/254711635104?text=Hello%20Keval,%20I'm%20interested%20in%20your%20services"
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
  title: 'Contact Us | Keval - 