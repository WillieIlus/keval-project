<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-8">Privacy Policy</h1>
    
    <div class="prose prose-lg max-w-none">
      <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
      <p>
        When you contact us through our website, we may collect personal information such as 
        your name, email address, phone number, and any other information you choose to provide.
      </p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>Respond to your inquiries and provide customer service</li>
        <li>Send you information about our services</li>
        <li>Improve our website and services</li>
      </ul>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at 
        <a href="mailto:info@kevalconstruction.com" class="text-primary hover:underline">
          info@kevalconstruction.com
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Keval Construction - Learn how we collect, use, and protect your information.',
})
</script>