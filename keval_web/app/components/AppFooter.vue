<template>
  <footer class="bg-gray-100 text-gray-700 pt-16">
    <div class="max-w-7xl mx-auto px-6 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        <!-- Brand Section -->
        <div class="space-y-6">
          <NuxtLink to="/">
            <img src="/logo-white.png" alt="Keval Logo" class="h-10 w-auto" />
          </NuxtLink>
          <p class="text-gray-600 text-sm leading-relaxed">
            Premium printing and branding solutions for businesses across Kenya.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-gray-500 hover:text-kevalgreen-500 transition-colors">
              <UIcon name="i-simple-icons-facebook" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-500 hover:text-kevalgreen-500 transition-colors">
              <UIcon name="i-simple-icons-instagram" class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-500 hover:text-kevalgreen-500 transition-colors">
              <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Navigation</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <NuxtLink to="/" class="text-gray-600 hover:text-kevalgreen-500 transition-colors">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/portfolio" class="text-gray-600 hover:text-kevalgreen-500 transition-colors">
                Our Work
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/team" class="text-gray-600 hover:text-kevalgreen-500 transition-colors">
                Meet Team
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-600 hover:text-kevalgreen-500 transition-colors">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Services</h4>
          <ul class="space-y-3 text-sm text-gray-600">
            <li>Garment Printing</li>
            <li>Corporate Branding</li>
            <li>Graphic Design</li>
            <li>Embroidery</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-4">Contact</h4>
          <div class="space-y-4 text-sm">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <p class="text-gray-600">
                Print Hub Building, Ground Floor<br />
                Room B06, Kweria Road<br />
                Nairobi, Kenya
              </p>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div class="text-gray-600">
                <a href="tel:+254720335863" class="hover:text-kevalgreen-500 transition-colors block">
                  0711 635 104
                </a>
                <a href="tel:+254711635104" class="hover:text-kevalgreen-500 transition-colors block">
                  0720 335 863
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div class="text-gray-600">
                <a href="mailto:admin@keval.co.ke" class="hover:text-kevalgreen-500 transition-colors block">
                  info@keval.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bg-gray-200 py-4 border-t border-gray-300">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs text-gray-500">
          &copy; {{ new Date().getFullYear() }} Keval Investments Ltd. All rights reserved.
        </p>
        
        <button 
          @click="scrollToTop" 
          class="flex items-center gap-2 text-xs text-gray-500 hover:text-kevalgreen-500 transition-colors group"
        >
          Back to Top
          <UIcon name="i-heroicons-arrow-up" class="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>