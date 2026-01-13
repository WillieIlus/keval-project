<!-- ~/pages/about.vue -->
<template>
      <BreadcrumbBanner />

  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-800 text-white py-24 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-20 w-96 h-96 bg-kevalorange-400 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Crafting Brands<br>
              <span class="text-kevalorange-400">Since 2014</span>
            </h1>
            <p class="text-xl text-kevalgreen-100 leading-relaxed">
              From a small printing shop in Nairobi to becoming Kenya's trusted partner 
              for corporate branding and premium print solutions. Our journey is built 
              on quality, innovation, and unwavering commitment to our clients.
            </p>
          </div>
          <div class="relative hidden lg:block">
            <div class="absolute -top-8 -right-8 w-64 h-64 bg-kevalorange-400/30 rounded-3xl rotate-12"></div>
            <div class="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center">
                  <p class="text-5xl font-black text-kevalorange-400">10+</p>
                  <p class="text-kevalgreen-200 mt-2">Years Experience</p>
                </div>
                <div class="text-center">
                  <p class="text-5xl font-black text-kevalorange-400">500+</p>
                  <p class="text-kevalgreen-200 mt-2">Happy Clients</p>
                </div>
                <div class="text-center">
                  <p class="text-5xl font-black text-kevalorange-400">2K+</p>
                  <p class="text-kevalgreen-200 mt-2">Projects Done</p>
                </div>
                <div class="text-center">
                  <p class="text-5xl font-black text-kevalorange-400">24h</p>
                  <p class="text-kevalgreen-200 mt-2">Fast Turnaround</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm">What Drives Us</span>
          <h2 class="text-4xl font-black text-gray-900 mt-2">Our Foundation</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Mission -->
          <div class="group bg-gray-50 rounded-3xl p-8 hover:bg-kevalgreen-500 transition-all duration-300">
            <div class="w-16 h-16 bg-kevalgreen-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-kevalgreen-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Our Mission</h3>
            <p class="text-gray-600 group-hover:text-kevalgreen-100 leading-relaxed transition-colors">
              To empower businesses with exceptional branding and printing solutions that 
              elevate their identity, enhance their visibility, and drive their success 
              in the marketplace.
            </p>
          </div>

          <!-- Vision -->
          <div class="group bg-gray-50 rounded-3xl p-8 hover:bg-kevalorange-500 transition-all duration-300">
            <div class="w-16 h-16 bg-kevalorange-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <UIcon name="i-heroicons-eye" class="w-8 h-8 text-kevalorange-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Our Vision</h3>
            <p class="text-gray-600 group-hover:text-orange-100 leading-relaxed transition-colors">
              To be East Africa's most trusted and innovative branding partner, known for 
              transforming ideas into impactful visual experiences that leave lasting 
              impressions.
            </p>
          </div>

          <!-- Values -->
          <div class="group bg-gray-50 rounded-3xl p-8 hover:bg-blue-600 transition-all duration-300">
            <div class="w-16 h-16 bg-blue-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <UIcon name="i-heroicons-heart" class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Our Values</h3>
            <p class="text-gray-600 group-hover:text-blue-100 leading-relaxed transition-colors">
              Quality without compromise. Innovation in everything. Customer satisfaction 
              always. Integrity in every interaction. These principles guide every project 
              we undertake.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Timeline -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm">Our Journey</span>
          <h2 class="text-4xl font-black text-gray-900 mt-2">The Keval Story</h2>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-kevalgreen-200"></div>

          <!-- Timeline Items -->
          <div class="space-y-12">
            <!-- 2014 -->
            <div class="relative flex flex-col md:flex-row items-center">
              <div class="flex-1 md:text-right md:pr-12">
                <div class="bg-white rounded-2xl p-6 shadow-sm inline-block">
                  <span class="text-kevalorange-500 font-bold text-lg">2014</span>
                  <h3 class="text-xl font-bold text-gray-900 mt-2">The Beginning</h3>
                  <p class="text-gray-600 mt-2">
                    Started as a small print shop with a single machine and a big dream 
                    to serve local businesses in Nairobi.
                  </p>
                </div>
              </div>
              <div class="hidden md:flex w-12 h-12 bg-kevalgreen-500 rounded-full items-center justify-center z-10 my-4 md:my-0">
                <UIcon name="i-heroicons-flag" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1 md:pl-12"></div>
            </div>

            <!-- 2016 -->
            <div class="relative flex flex-col md:flex-row items-center">
              <div class="flex-1 md:pr-12"></div>
              <div class="hidden md:flex w-12 h-12 bg-kevalorange-500 rounded-full items-center justify-center z-10 my-4 md:my-0">
                <UIcon name="i-heroicons-arrow-trending-up" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1 md:pl-12">
                <div class="bg-white rounded-2xl p-6 shadow-sm inline-block">
                  <span class="text-kevalorange-500 font-bold text-lg">2016</span>
                  <h3 class="text-xl font-bold text-gray-900 mt-2">Expansion</h3>
                  <p class="text-gray-600 mt-2">
                    Moved to a larger facility and invested in state-of-the-art 
                    printing equipment. Added garment printing services.
                  </p>
                </div>
              </div>
            </div>

            <!-- 2018 -->
            <div class="relative flex flex-col md:flex-row items-center">
              <div class="flex-1 md:text-right md:pr-12">
                <div class="bg-white rounded-2xl p-6 shadow-sm inline-block">
                  <span class="text-kevalorange-500 font-bold text-lg">2018</span>
                  <h3 class="text-xl font-bold text-gray-900 mt-2">Corporate Clients</h3>
                  <p class="text-gray-600 mt-2">
                    Partnered with major corporations for their branding needs. 
                    Launched our in-house design studio.
                  </p>
                </div>
              </div>
              <div class="hidden md:flex w-12 h-12 bg-kevalgreen-500 rounded-full items-center justify-center z-10 my-4 md:my-0">
                <UIcon name="i-heroicons-building-office" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1 md:pl-12"></div>
            </div>

            <!-- 2021 -->
            <div class="relative flex flex-col md:flex-row items-center">
              <div class="flex-1 md:pr-12"></div>
              <div class="hidden md:flex w-12 h-12 bg-kevalorange-500 rounded-full items-center justify-center z-10 my-4 md:my-0">
                <UIcon name="i-heroicons-globe-alt" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1 md:pl-12">
                <div class="bg-white rounded-2xl p-6 shadow-sm inline-block">
                  <span class="text-kevalorange-500 font-bold text-lg">2021</span>
                  <h3 class="text-xl font-bold text-gray-900 mt-2">Digital Transformation</h3>
                  <p class="text-gray-600 mt-2">
                    Launched online ordering platform. Expanded services to include 
                    vehicle branding and large format printing.
                  </p>
                </div>
              </div>
            </div>

            <!-- Today -->
            <div class="relative flex flex-col md:flex-row items-center">
              <div class="flex-1 md:text-right md:pr-12">
                <div class="bg-kevalgreen-500 rounded-2xl p-6 shadow-lg inline-block text-white">
                  <span class="text-kevalorange-400 font-bold text-lg">Today</span>
                  <h3 class="text-xl font-bold mt-2">Industry Leaders</h3>
                  <p class="text-kevalgreen-100 mt-2">
                    Proudly serving 500+ clients across Kenya with a full suite 
                    of branding, printing, and design services.
                  </p>
                </div>
              </div>
              <div class="hidden md:flex w-12 h-12 bg-kevalgreen-600 rounded-full items-center justify-center z-10 my-4 md:my-0 ring-4 ring-kevalgreen-200">
                <UIcon name="i-heroicons-star" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1 md:pl-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Sets Us Apart -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm">Why Choose Us</span>
            <h2 class="text-4xl font-black text-gray-900 mt-2 mb-6">What Sets Keval Apart</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              We don't just print—we partner with you to create lasting impressions. 
              Our commitment to quality, innovation, and customer satisfaction has made 
              us the preferred choice for businesses across Kenya.
            </p>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-kevalgreen-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-check-badge" class="w-6 h-6 text-kevalgreen-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Premium Quality Materials</h3>
                  <p class="text-gray-600">We use only the highest quality materials and inks to ensure your prints last longer and look better.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-kevalorange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-clock" class="w-6 h-6 text-kevalorange-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Fast Turnaround Times</h3>
                  <p class="text-gray-600">Need it urgently? We offer 24-hour rush services without compromising on quality.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-paint-brush" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">In-House Design Team</h3>
                  <p class="text-gray-600">Our creative experts can bring your vision to life or help you develop your brand from scratch.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">Satisfaction Guaranteed</h3>
                  <p class="text-gray-600">We stand behind our work. If you're not satisfied, we'll make it right—no questions asked.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <!-- Decorative Elements -->
            <div class="absolute -top-4 -left-4 w-72 h-72 bg-kevalgreen-100 rounded-3xl"></div>
            <div class="absolute -bottom-4 -right-4 w-72 h-72 bg-kevalorange-100 rounded-3xl"></div>
            
            <!-- Image Grid -->
            <div class="relative grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center">
                  <UIcon name="i-heroicons-printer" class="w-16 h-16 text-gray-400" />
                </div>
                <div class="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
                  <UIcon name="i-heroicons-scissors" class="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div class="space-y-4 pt-8">
                <div class="bg-gray-200 rounded-2xl aspect-video flex items-center justify-center">
                  <UIcon name="i-heroicons-paint-brush" class="w-12 h-12 text-gray-400" />
                </div>
                <div class="bg-gray-200 rounded-2xl aspect-square flex items-center justify-center">
                  <UIcon name="i-heroicons-truck" class="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Services Overview -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-kevalorange-400 font-semibold uppercase tracking-wider text-sm">What We Do</span>
          <h2 class="text-4xl font-black mt-2">Our Expertise</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-white/10 group-hover:bg-kevalgreen-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
              <UIcon name="i-heroicons-document-text" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-bold mb-3">Corporate Branding</h3>
            <p class="text-gray-400">Business cards, letterheads, envelopes, and complete corporate identity packages.</p>
          </div>

          <div class="text-center group">
            <div class="w-20 h-20 bg-white/10 group-hover:bg-kevalorange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
              <UIcon name="i-heroicons-sparkles" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-bold mb-3">Garment Printing</h3>
            <p class="text-gray-400">T-shirts, uniforms, caps, and promotional wear with various printing techniques.</p>
          </div>

          <div class="text-center group">
            <div class="w-20 h-20 bg-white/10 group-hover:bg-kevalgreen-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
              <UIcon name="i-heroicons-rectangle-group" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-bold mb-3">Signage & Displays</h3>
            <p class="text-gray-400">Banners, rollups, billboards, and indoor/outdoor signage solutions.</p>
          </div>

          <div class="text-center group">
            <div class="w-20 h-20 bg-white/10 group-hover:bg-kevalorange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
              <UIcon name="i-heroicons-truck" class="w-10 h-10" />
            </div>
            <h3 class="text-xl font-bold mb-3">Vehicle Branding</h3>
            <p class="text-gray-400">Full wraps, partial wraps, and fleet branding for maximum visibility.</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/portfolio" 
            class="inline-flex items-center gap-2 px-8 py-4 bg-kevalorange-500 hover:bg-kevalorange-600 rounded-xl font-bold transition-colors"
          >
            View Our Portfolio
            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonial Highlight -->
    <section class="py-20 bg-kevalgreen-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-16 h-16 text-kevalgreen-300 mx-auto mb-8" />
        <blockquote class="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-8">
          "Keval has been our printing partner for over 5 years. Their attention to detail, 
          quality of work, and reliable service has made them an invaluable part of our 
          marketing efforts. Highly recommended!"
        </blockquote>
        <div class="flex items-center justify-center gap-4">
          <div class="w-14 h-14 bg-kevalgreen-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            SM
          </div>
          <div class="text-left">
            <p class="font-bold text-gray-900">Sarah Muthoni</p>
            <p class="text-gray-600">Marketing Director, TechStart Kenya</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-kevalorange-500 to-kevalorange-600">
      <div class="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 class="text-4xl font-black mb-4">Let's Create Something Amazing</h2>
        <p class="text-xl text-orange-100 mb-10">
          Ready to elevate your brand? Get in touch with our team today for a free consultation.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/contact"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-kevalorange-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
          >
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
            Start a Project
          </NuxtLink>
          <a 
            href="tel:+254711635104"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors"
          >
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            Call: 0711 635 104
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About Us | Keval - Premium Printing & Branding',
  description: 'Learn about Keval\'s journey from a small print shop to Kenya\'s trusted branding partner. 10+ years of quality, innovation, and customer satisfaction.',
  ogTitle: 'About Keval - Our Story',
  ogDescription: 'Discover our mission, values, and the story behind Keval\'s success in the printing and branding industry.'
})
</script>