<template>
  <section class="clients" aria-label="Trusted Clients">
    <div class="clients__container">
      <header class="clients__header">
        <p class="clients__eyebrow">Social Proof</p>
        <h2 class="clients__title">Trusted by Brands and Businesses</h2>
        <p class="clients__subtitle">
          We've helped organizations deliver professional print materials that stand out.
        </p>
      </header>

      <div v-if="socialStore.loading" class="clients__grid">
        <div v-for="n in 8" :key="n" class="clients__skeleton" />
      </div>

      <div v-else class="clients__grid">
        <button
          v-for="client in socialStore.clients"
          :key="client.id"
          type="button"
          class="clients__card"
          :aria-label="`View details for ${client.name}`"
          @click="openModal(client)"
        >
          <div class="clients__card-media">
            <img
              :src="getImageUrl(client.logo)"
              :alt="client.name"
              class="clients__card-logo"
              draggable="false"
            />
          </div>
          <span class="clients__card-name">{{ client.name }}</span>
          <span class="clients__card-hint">View details</span>
        </button>
      </div>
    </div>

    <HomeClientDetailModal
      :open="modalOpen"
      :client="selectedClient"
      :testimonial="relatedTestimonial"
      @update:open="handleModalClose"
    />
  </section>
</template>

<script setup lang="ts">
import { useSocialProofStore } from '~/stores/social-proof'
import { useImageUrl } from '~/composables/useAPI'
import type { Client, Testimonial } from '~/types/api'

const socialStore = useSocialProofStore()
const { getImageUrl } = useImageUrl()

const modalOpen = ref(false)
const selectedClient = ref<Client | null>(null)

function openModal(client: Client) {
  selectedClient.value = client
  modalOpen.value = true
}

function handleModalClose(open: boolean) {
  modalOpen.value = open
  if (!open) selectedClient.value = null
}

const relatedTestimonial = computed((): Testimonial | null => {
  const client = selectedClient.value
  if (!client) return null
  const name = client.name.toLowerCase()
  return (
    socialStore.testimonials.find((t) => {
      const company = (t.company || '').toLowerCase()
      const clientName = (t.client_name || '').toLowerCase()
      return (
        company.includes(name) ||
        name.includes(company) ||
        clientName.includes(name) ||
        name.includes(clientName)
      )
    }) ?? null
  )
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && modalOpen.value) modalOpen.value = false
}

onMounted(() => {
  if (socialStore.clients.length === 0) socialStore.fetchClients()
  if (socialStore.testimonials.length === 0) socialStore.fetchTestimonials()
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.clients {
  padding: 5rem 0;
  background: #f9fafb;
  overflow: hidden;
}
@media (min-width: 768px) {
  .clients {
    padding: 7rem 0;
  }
}

.clients__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}
@media (min-width: 640px) {
  .clients__container {
    padding: 0 1.5rem;
  }
}
@media (min-width: 1024px) {
  .clients__container {
    padding: 0 2rem;
  }
}

.clients__header {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 4rem;
}
@media (min-width: 768px) {
  .clients__header {
    margin-bottom: 5rem;
  }
}

.clients__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  color: #00A69C;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
}

.clients__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.025em;
}
@media (min-width: 768px) {
  .clients__title {
    font-size: 2.25rem;
  }
}
@media (min-width: 1024px) {
  .clients__title {
    font-size: 3rem;
  }
}

.clients__subtitle {
  margin-top: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #7F7F7F;
}

.clients__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .clients__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
@media (min-width: 1024px) {
  .clients__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
  }
}

.clients__skeleton {
  aspect-ratio: 1;
  background: #f3f4f6;
  border-radius: 1rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  50% { opacity: 0.5; }
}

.clients__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.clients__card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 25px 50px -12px rgba(0, 166, 156, 0.15);
  border-color: #99e1db;
}
.clients__card:focus {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #00A69C;
}

.clients__card-media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 6.25rem;
}
@media (min-width: 768px) {
  .clients__card-media {
    min-height: 7.5rem;
  }
}

.clients__card-logo {
  max-height: 5rem;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}
@media (min-width: 640px) {
  .clients__card-logo {
    max-height: 6.25rem;
  }
}
@media (min-width: 768px) {
  .clients__card-logo {
    max-height: 7.5rem;
  }
}
.clients__card:hover .clients__card-logo {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.08);
}

.clients__card-name {
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.clients__card:hover .clients__card-name {
  color: #00A69C;
}

.clients__card-hint {
  margin-top: 0.375rem;
  font-size: 0.75rem;
  color: #9ca3af;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.clients__card:hover .clients__card-hint {
  opacity: 1;
}
</style>
