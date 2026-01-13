<!-- ~/components/AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-white pt-16">
    <div class="max-w-7xl mx-auto px-6 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        <!-- Brand Section -->
        <div class="space-y-6">
          <NuxtLink to="/">
            <img src="/logo-white.png" alt="Keval Logo" class="h-10 w-auto">
          </NuxtLink>
          <p class="text-gray-400 text-sm leading-relaxed">
            Premium printing and branding solutions for businesses across Kenya. Quality you can trust since 2014.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-kevalgreen-500 rounded-lg flex items-center justify-center transition-colors">
              <UIcon name="i-simple-icons-facebook" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-kevalgreen-500 rounded-lg flex items-center justify-center transition-colors">
              <UIcon name="i-simple-icons-instagram" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-kevalgreen-500 rounded-lg flex items-center justify-center transition-colors">
              <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/254711635104" 
              target="_blank"
              class="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
            >
              <UIcon name="i-simple-icons-whatsapp" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold text-white mb-6">Quick Links</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio" class="text-gray-400 hover:text-white transition-colors">
                Our Work
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/login" class="text-gray-400 hover:text-white transition-colors">
                Client Login
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-white mb-6">Services</h4>
          <ul class="space-y-3 text-sm text-gray-400">
            <li>Garment Printing</li>
            <li>Corporate Branding</li>
            <li>Graphic Design</li>
            <li>Embroidery</li>
            <li>Large Format Printing</li>
            <li>Vehicle Branding</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-6">Contact Us</h4>
          <div class="space-y-4 text-sm">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-kevalgreen-400 shrink-0 mt-0.5" />
              <div class="text-gray-400">
                <p>Print Hub Building, Ground Floor</p>
                <p>Room B06, Kweria Road</p>
                <p>Nairobi, Kenya</p>
                <a 
                  href="https://maps.app.goo.gl/w5WqA2cfVrFRKBve6"
                  target="_blank"
                  class="text-kevalgreen-400 hover:underline inline-flex items-center mt-1"
                >
                  Get Directions
                  <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-kevalgreen-400 shrink-0 mt-0.5" />
              <div class="text-gray-400">
                <a href="tel:+254711635104" class="hover:text-white transition-colors block">
                  0711 635 104
                </a>
                <a href="tel:+254720335863" class="hover:text-white transition-colors block">
                  0720 335 863
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-kevalgreen-400 shrink-0 mt-0.5" />
              <div class="text-gray-400">
                <a href="mailto:info@keval.co.ke" class="hover:text-white transition-colors block">
                  info@keval.co.ke
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-kevalgreen-400 shrink-0 mt-0.5" />
              <div class="text-gray-400">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bg-gray-950 py-6 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }} Keval Investments Ltd. All rights reserved.
        </p>
        
        <div class="flex items-center gap-6">
          <NuxtLink to="/privacy" class="text-xs text-gray-500 hover:text-white transition-colors">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-gray-500 hover:text-white transition-colors">
            Terms of Service
          </NuxtLink>
          <button 
            @click="scrollToTop" 
            class="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors group"
          >
            Back to Top
            <UIcon name="i-heroicons-arrow-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>