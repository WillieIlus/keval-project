<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold mb-8">Terms of Service</h1>

    <div class="prose prose-lg max-w-none">
      <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
      <p>
        By accessing and using this website, you accept and agree to be bound by these terms.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
      <p>
        Keval Investments Limited provides graphic design, printing and branding services, including brand identity, marketing collateral, packaging, large-format printing, promotional products, vehicle branding, signage and event branding. Services are subject to availability, confirmed specifications and agreed timelines.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Client Materials and Approvals</h2>
      <p>
        Clients are responsible for providing accurate artwork, copy, specifications and approvals. Production begins after the agreed design, proof or order details have been confirmed.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
      <p>
        Website content, graphics, logos and images are owned by or licensed to Keval Investments Limited unless otherwise stated. Client-provided brand assets remain the property of the client.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
      <p>
        Keval Investments Limited shall not be liable for indirect, incidental, special or consequential damages arising from use of this website or reliance on website information.
      </p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">6. Contact</h2>
      <p>
        For questions about these Terms, contact us at
        <a href="mailto:kevalinvestmentsltd@gmail.com" class="text-primary hover:underline">
          kevalinvestmentsltd@gmail.com
        </a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Terms of Service | Keval Investments Limited',
  description: 'Terms of Service for Keval Investments Limited design, printing and branding services.'
})
</script>
