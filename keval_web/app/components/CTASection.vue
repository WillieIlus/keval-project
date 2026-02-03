<!-- ~/components/sections/CTASection.vue -->
<template>
  <section
    class="relative overflow-hidden py-12 md:py-16 transition-colors
           bg-gradient-to-br from-kevalgreen-50 to-kevalgreen-100
           dark:from-kevalgreen-900 dark:to-gray-900"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5">
      <div
        class="absolute top-0 left-0 w-64 h-64 bg-white rounded-full
               -translate-x-1/2 -translate-y-1/2"
      />
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full
               translate-x-1/3 translate-y-1/3"
      />
    </div>

    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <!-- Badge -->
      <div
        class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full
               bg-kevalgreen-200/60 text-kevalgreen-900
               dark:bg-white/10 dark:text-white/90
               backdrop-blur-sm"
      >
        <span class="w-2 h-2 rounded-full bg-kevalorange-500 animate-pulse" />
        <span class="text-sm font-medium">
          Ready to get started?
        </span>
      </div>

      <!-- Heading -->
      <h2
        class="mb-4 text-2xl md:text-3xl font-bold leading-tight
               text-gray-900 dark:text-white"
      >
        Let’s Bring Your<br />
        <span class="text-kevalorange-500 dark:text-kevalorange-300">
          Vision to Life
        </span>
      </h2>

      <!-- Description -->
      <p
        class="mx-auto mb-8 max-w-xl text-sm md:text-base
               text-gray-700 dark:text-gray-300"
      >
        Get a free consultation and quote for your next project.
        Our team is ready to help you create something amazing.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row justify-center gap-3 mb-8">
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center gap-2
                 px-5 py-2.5 rounded font-semibold text-sm
                 bg-kevalgreen-600 text-white
                 hover:bg-kevalgreen-700
                 dark:bg-white dark:text-gray-900
                 dark:hover:bg-gray-200
                 transition-colors"
        >
          <UIcon
            name="i-heroicons-chat-bubble-left-right"
            class="w-5 h-5"
          />
          Get Free Quote
        </NuxtLink>

        <a
          href="tel:+254711635104"
          class="inline-flex items-center justify-center gap-2
                 px-5 py-2.5 rounded font-semibold text-sm
                 border border-kevalgreen-600
                 text-kevalgreen-700
                 hover:bg-kevalgreen-600 hover:text-white
                 dark:border-white/70
                 dark:text-white
                 dark:hover:bg-white/20
                 transition-colors"
        >
          <UIcon name="i-heroicons-phone" class="w-5 h-5" />
          Call Us Now
        </a>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat value="500+" label="Happy Clients" />
        <Stat value="2K+" label="Projects Done" />
        <Stat value="10+" label="Years Experience" />
        <Stat value="24h" label="Quick Turnaround" />
      </div>
    </div>
  </section>
</template>

<script setup>
const Stat = defineComponent({
  props: {
    value: String,
    label: String,
  },
  template: `
    <div>
        <p
        class="text-2xl font-bold
               text-kevalorange-500 dark:text-kevalorange-300"
      >
        {{ value }}
      </p>
      <p
        class="mt-1 text-sm
               text-gray-700 dark:text-gray-400"
      >
        {{ label }}
      </p>
    </div>
  `,
})
</script>
