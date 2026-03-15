<template>
  <NuxtLink
    :to="`/portfolio/${project.slug}`"
    class="project-card"
    :class="{ 'project-card--featured': isFeatured }"
  >
    <div class="project-card__media">
      <img
        :src="coverImage"
        :alt="displayTitle"
        class="project-card__img"
      />
      <div class="project-card__overlay" aria-hidden="true" />
    </div>

    <div class="project-card__content">
      <span class="project-card__category">{{ displayCategory || project.category_name }}</span>
      <h3 class="project-card__title">{{ displayTitle }}</h3>
      <div class="project-card__reveal">
        <p v-if="project.client" class="project-card__client">{{ project.client }}</p>
        <span class="project-card__link">
          View Project
          <UIcon name="i-heroicons-arrow-right" class="project-card__link-icon" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    project: any
    displayTitle: string
    coverImage: string
    displayCategory?: string
    isFeatured?: boolean
  }>(),
  { displayCategory: '' }
)
</script>

<style scoped>
.project-card {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
.project-card:hover {
  border-color: rgba(0, 166, 156, 0.4);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.project-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
.project-card--featured .project-card__media {
  aspect-ratio: 4 / 3;
}
@media (min-width: 1024px) {
  .project-card--featured .project-card__media {
    aspect-ratio: auto;
    min-height: 100%;
  }
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}
.project-card:hover .project-card__img {
  transform: scale(1.05);
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.4) 40%,
    transparent 100%
  );
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__content {
  position: absolute;
  inset: 0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
@media (min-width: 640px) {
  .project-card__content {
    padding: 1.5rem;
  }
}
.project-card--featured .project-card__content {
  padding: 1.5rem;
}
@media (min-width: 1024px) {
  .project-card--featured .project-card__content {
    padding: 2rem;
  }
}

.project-card__category {
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #F6921E;
  margin-bottom: 0.25rem;
}

.project-card__title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.25;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.project-card--featured .project-card__title {
  font-size: 1rem;
}
@media (min-width: 1024px) {
  .project-card--featured .project-card__title {
    font-size: 1.25rem;
  }
}

.project-card__reveal {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.project-card:hover .project-card__reveal {
  max-height: 5rem;
}

.project-card__client {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 0.5rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
}
.project-card__link-icon {
  margin-left: 0.5rem;
  width: 0.875rem;
  height: 0.875rem;
  transition: transform 0.2s ease;
}
.project-card:hover .project-card__link-icon {
  transform: translateX(0.25rem);
}
</style>
