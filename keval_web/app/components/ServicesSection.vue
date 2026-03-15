<template>
  <section class="services" aria-label="Our Services">
    <div class="services__container">
      <header class="services__header">
        <p class="services__eyebrow">What We Do</p>
        <h2 class="services__title">Our Services</h2>
        <p class="services__subtitle">
          Comprehensive branding and printing solutions tailored to your needs.
        </p>
      </header>

      <div v-if="galleryStore.loading" class="services__grid">
        <div v-for="n in 6" :key="n" class="services__skeleton" />
      </div>

      <div v-else class="services__grid">
        <NuxtLink
          v-for="category in displayCategories"
          :key="category.id"
          :to="`/portfolio?category=${category.id}`"
          class="services__card"
          :aria-label="`Explore ${category.name} services`"
        >
          <div class="services__card-media">
            <img
              :src="getCategoryImageUrl(category)"
              :alt="category.name"
              class="services__card-img"
              loading="lazy"
            />
            <div class="services__card-overlay" aria-hidden="true" />
          </div>
          <div class="services__card-body">
            <h3 class="services__card-title">{{ category.name }}</h3>
            <p class="services__card-desc">
              {{ category.description || 'Premium quality printing designed to elevate your brand.' }}
            </p>
            <span class="services__card-link">
              Explore
              <span class="services__card-arrow">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'
import { useImageUrl } from '~/composables/useAPI'
import { CATEGORY_IMAGE_MAP, DEFAULT_CATEGORY_IMAGE } from '~/config/categoryImages'
import type { ServiceCategory } from '~/types/api'

const galleryStore = useGalleryStore()
const { getImageUrl } = useImageUrl()

const displayCategories = computed(() =>
  galleryStore.categories.filter((cat) => !cat.parent)
)

function getCategoryImageUrl(category: ServiceCategory): string {
  if (category.cover_image) return getImageUrl(category.cover_image)
  const name = (category.name || '').toLowerCase().trim()
  return CATEGORY_IMAGE_MAP[name] ?? DEFAULT_CATEGORY_IMAGE
}

onMounted(() => {
  if (galleryStore.categories.length === 0) galleryStore.fetchCategories()
})
</script>

<style scoped>
.services {
  padding: 5rem 0;
  background: #f9fafb;
  overflow: hidden;
}
@media (min-width: 768px) {
  .services {
    padding: 7rem 0;
  }
}

.services__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}
@media (min-width: 640px) {
  .services__container {
    padding: 0 1.5rem;
  }
}
@media (min-width: 1024px) {
  .services__container {
    padding: 0 2rem;
  }
}

.services__header {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 4rem;
}
@media (min-width: 768px) {
  .services__header {
    margin-bottom: 5rem;
  }
}

.services__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  color: #00A69C;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
}

.services__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.025em;
}
@media (min-width: 768px) {
  .services__title {
    font-size: 2.25rem;
  }
}
@media (min-width: 1024px) {
  .services__title {
    font-size: 3rem;
  }
}

.services__subtitle {
  margin-top: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #7F7F7F;
}

.services__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 640px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .services__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}

.services__skeleton {
  aspect-ratio: 4 / 3;
  background: #e5e7eb;
  border-radius: 1rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  50% { opacity: 0.5; }
}

.services__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.services__card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 25px 50px -12px rgba(0, 166, 156, 0.15);
  border-color: #99e1db;
}

.services__card-media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f3f4f6;
}

.services__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.services__card:hover .services__card-img {
  transform: scale(1.08);
}

.services__card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.services__card:hover .services__card-overlay {
  opacity: 1;
}

.services__card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .services__card-body {
    padding: 1.75rem;
  }
}

.services__card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media (min-width: 768px) {
  .services__card-title {
    font-size: 1.25rem;
  }
}

.services__card-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: #7F7F7F;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.services__card-link {
  display: inline-flex;
  align-items: center;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #00A69C;
  transition: color 0.2s ease;
}
.services__card:hover .services__card-link {
  color: #008e86;
}

.services__card-arrow {
  margin-left: 0.25rem;
  transition: transform 0.2s ease;
}
.services__card:hover .services__card-arrow {
  transform: translateX(0.125rem);
}
</style>
