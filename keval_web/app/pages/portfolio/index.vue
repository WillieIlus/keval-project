<template>
  <div>
    <BreadcrumbBanner />

    <Gallery />
    
    <section class="py-12 text-center">
      <h3 class="text-lg font-semibold mb-4">Have a specific project in mind?</h3>
      <UButton 
        to="/contact" 
        size="sm" 
        class="bg-kevalorange-500 hover:bg-kevalgreen-500 rounded px-6 py-2 font-semibold text-sm"
      >
        Get a Quote
      </UButton>
    </section>
  </div>
</template>