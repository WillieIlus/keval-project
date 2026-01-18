<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-8">Terms of Service</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by the terms 
        and provisions of this agreement.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
      <p>
        Keval Construction provides construction and renovation services. All services are 
        subject to availability and may vary based on location and project requirements.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, logos, and images, is the 
        property of Keval Construction and is protected by copyright laws.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
      <p>
        Keval Construction shall not be liable for any indirect, incidental, special, or 
        consequential damages arising from the use of this website.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Contact</h2>
      <p>
        For questions about these Terms, contact us at 
        <a href="mailto:info@kevalconstruction.com" class="text-primary hover:underline">
          info@kevalconstruction.com
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for Keval Construction website.',
})
</script>