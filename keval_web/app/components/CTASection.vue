<!-- ~/components/sections/CTASection.vue -->
<template>
  <section class="py-20 bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-700 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-6 text-center text-white">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
        <span class="w-2 h-2 bg-kevalorange-400 rounded-full animate-pulse"></span>
        <span class="text-sm font-medium">Ready to get started?</span>
      </div>

      <h2 class="text-4xl md:text-5xl font-black mb-6">
        Let's Bring Your<br>
        <span class="text-kevalorange-400">Vision to Life</span>
      </h2>
      
      <p class="text-xl text-kevalgreen-100 mb-10 max-w-2xl mx-auto">
        Get a free consultation and quote for your next project. Our team is ready to help you create something amazing.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <NuxtLink 
          to="/contact"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kevalgreen-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
        >
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
          Get Free Quote
        </NuxtLink>
        <a 
          href="tel:+254711635104"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          <UIcon name="i-heroicons-phone" class="w-5 h-5" />
          Call Us Now
        </a>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p class="text-4xl font-black text-kevalorange-400">500+</p>
          <p class="text-kevalgreen-200 text-sm">Happy Clients</p>
        </div>
        <div>
          <p class="text-4xl font-black text-kevalorange-400">2K+</p>
          <p class="text-kevalgreen-200 text-sm">Projects Done</p>
        </div>
        <div>
          <p class="text-4xl font-black text-kevalorange-400">10+</p>
          <p class="text-kevalgreen-200 text-sm">Years Experience</p>
        </div>
        <div>
          <p class="text-4xl font-black text-kevalorange-400">24h</p>
          <p class="text-kevalgreen-200 text-sm">Quick Turnaround</p>
        </div>
      </div>
    </div>
  </section>
</template>