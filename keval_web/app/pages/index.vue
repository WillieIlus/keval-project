<!-- ~/pages/index.vue -->
<template>
  <main>
    <HeroBanner />

    <ServicesSection />

    <SocialProof />

    <Gallery :limit="5" />

    <WhyChooseUsSection />
    
    <TestimonialsSection />
    
    <CTASection />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Keval | Premium Printing & Branding Solutions",
  description:
    "Nairobi's leading provider of corporate branding, garment printing, and design.",
});
</script>