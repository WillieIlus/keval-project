<template>
  <section class="gallery">
    <div class="gallery__container">
      <header class="gallery__header">
        <div class="gallery__header-text">
          <h2 class="gallery__title">
            {{ isPortfolioPage ? 'Our Full Portfolio' : 'Our Work' }}
          </h2>
          <p class="gallery__subtitle">Premium solutions, precisely executed.</p>
        </div>
        <UButton
          v-if="limit"
          to="/portfolio"
          size="sm"
          class="gallery__cta"
        >
          Explore All
        </UButton>
      </header>

      <CategoryNav class="gallery__nav" />

      <div v-if="!gallery.loading" class="gallery__grid" :class="{ 'gallery__grid--featured': limit && mainFeatured }">
        <template v-if="limit && mainFeatured">
          <!-- Homepage: one intentional featured + uniform grid -->
          <ProjectCard
            :project="mainFeatured"
            :display-title="getDisplayTitle(mainFeatured)"
            :display-category="getCategoryDisplayName(mainFeatured.category_name || '')"
            :cover-image="getCoverImage(mainFeatured)"
            is-featured
          />
          <ProjectCard
            v-for="project in secondaryProjects"
            :key="project.id"
            :project="project"
            :display-title="getDisplayTitle(project)"
            :display-category="getCategoryDisplayName(project.category_name || '')"
            :cover-image="getCoverImage(project)"
          />
        </template>

        <template v-else>
          <ProjectCard
            v-for="project in displayProjects"
            :key="project.id"
            :project="project"
            :display-title="getDisplayTitle(project)"
            :display-category="getCategoryDisplayName(project.category_name || '')"
            :cover-image="getCoverImage(project)"
          />
        </template>
      </div>

      <div v-else class="gallery__loading">
        Loading Projects...
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'
import { getCategoryDisplayName, getProjectDisplayTitle, getProjectPlaceholderImage } from '~/config/portfolio'
import { useImageUrl } from '~/composables/useAPI'
import type { Project } from '~/types/api'

const props = defineProps<{
  limit?: number
}>()

const gallery = useGalleryStore()
const { getImageUrl } = useImageUrl()
const route = useRoute()

const isPortfolioPage = computed(() => route.path === '/portfolio')

const filteredList = computed(() => {
  let list = [...gallery.allProjects]
  if (gallery.selectedCategoryId) {
    list = list.filter(p => p.category === gallery.selectedCategoryId)
  } else if (gallery.selectedCategoryDisplayName) {
    list = list.filter(p =>
      getCategoryDisplayName(p.category_name || '') === gallery.selectedCategoryDisplayName
    )
  }
  return list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
})

const displayProjects = computed(() =>
  props.limit ? filteredList.value.slice(0, props.limit) : filteredList.value
)

const mainFeatured = computed(() => displayProjects.value[0])
const secondaryProjects = computed(() => displayProjects.value.slice(1, 5))

function getDisplayTitle(project: Project) {
  return getProjectDisplayTitle(project.title, project.category_name)
}

function getCoverImage(project: Project): string {
  const cover = project.images?.find(img => img.is_cover)
  const img = cover ? cover.image : project.images?.[0]?.image
  if (img) return getImageUrl(img)
  return getProjectPlaceholderImage(project.category_name)
}
</script>

<style scoped>
.gallery {
  padding: 3rem 0 4rem;
  background: #f9fafb;
}
@media (min-width: 768px) {
  .gallery {
    padding: 4rem 0 5rem;
  }
}

.gallery__container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
}
@media (min-width: 768px) {
  .gallery__container {
    padding: 0 1.5rem;
  }
}

.gallery__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
@media (min-width: 768px) {
  .gallery__header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
}

.gallery__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: -0.025em;
}
@media (min-width: 768px) {
  .gallery__title {
    font-size: 1.875rem;
  }
}

.gallery__subtitle {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #7F7F7F;
}

.gallery__cta {
  border-radius: 0.25rem;
  padding: 0.5rem 1.25rem;
  background: #00A69C;
  color: white;
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
}
.gallery__cta:hover {
  background: #F6921E;
}

.gallery__nav {
  margin-bottom: 2rem;
}

.gallery__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 640px) {
  .gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .gallery__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}
@media (min-width: 1280px) {
  .gallery__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.gallery__grid--featured {
  grid-template-columns: 1fr;
}
@media (min-width: 640px) {
  .gallery__grid--featured {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .gallery__grid--featured {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  .gallery__grid--featured > :first-child {
    grid-row: span 2;
  }
}

.gallery__loading {
  text-align: center;
  padding: 5rem 0;
  color: #9ca3af;
}
</style>
