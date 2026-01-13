<template>
  <main>
    <HeroBanner />

    <ServicesSection />

    <SocialProof />

    <Gallery :limit="5" />

    <!-- <TeamSection /> -->
  </main>
</template>

<script setup lang="ts">
// Nuxt auto-imports these, so no extra script needed unless you're adding SEO tags
useSeoMeta({
  title: "Keval | Premium Printing & Branding Solutions",
  description:
    "Nairobi's leading provider of corporate branding, garment printing, and design.",
});
</script>
