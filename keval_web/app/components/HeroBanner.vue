<template>
  <section
    class="hero"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
    aria-roledescription="carousel"
  >
    <div v-if="marketing.loading" class="hero__loading">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin" />
    </div>

    <div v-else class="hero__slides">
      <div
        v-for="(banner, index) in marketing.activeBanners"
        :key="banner.id"
        class="hero__slide"
        :class="{ 'hero__slide--active': currentIndex === index }"
        role="group"
        :aria-hidden="currentIndex !== index"
      >
        <div class="hero__layout">
          <!-- Left: green content panel -->
          <div class="hero__panel">
            <div class="hero__panel-inner">
              <h1
                class="hero__title"
                :class="{ 'hero__title--visible': currentIndex === index }"
              >
                {{ banner.title }}
              </h1>
              <p
                v-if="banner.subtitle"
                class="hero__subtitle"
                :class="{ 'hero__subtitle--visible': currentIndex === index }"
              >
                {{ banner.subtitle }}
              </p>
              <div
                class="hero__cta"
                :class="{ 'hero__cta--visible': currentIndex === index }"
              >
                <NuxtLink
                  v-if="banner.cta_link"
                  :to="banner.cta_link"
                  class="hero__btn"
                >
                  {{ banner.cta_text || 'Get a Quote' }}
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 hero__btn-icon" />
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Right: full-height hero image -->
          <div class="hero__image-wrap">
            <img
              v-if="banner.image"
              :src="getImageUrl(banner.image)"
              :alt="banner.title || banner.subtitle"
              class="hero__image"
            />
            <div v-else class="hero__image-placeholder" />
            <!-- Slanted edge overlay (angled toward right) -->
            <div class="hero__slant" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>

    <nav class="hero__nav" aria-label="Banner navigation">
      <button
        v-for="(_, index) in marketing.activeBanners"
        :key="index"
        type="button"
        class="hero__dot"
        :class="{ 'hero__dot--active': currentIndex === index }"
        :aria-label="`Go to slide ${index + 1}`"
        @click="setSlide(index)"
      />
    </nav>
  </section>
</template>

<script setup lang="ts">
import { useMarketingStore } from '~/stores/marketing'
import { useImageUrl } from '~/composables/useAPI'

const marketing = useMarketingStore()
const { getImageUrl } = useImageUrl()

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
const LOOP_DURATION = 7000

function nextSlide() {
  if (marketing.activeBanners.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % marketing.activeBanners.length
  }
}

function startTimer() {
  stopTimer()
  timer = setInterval(nextSlide, LOOP_DURATION)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const pauseTimer = () => stopTimer()
const resumeTimer = () => startTimer()
function setSlide(index: number) {
  currentIndex.value = index
  startTimer()
}

onMounted(async () => {
  if (marketing.banners.length === 0) await marketing.fetchBanners()
  startTimer()
})

onUnmounted(stopTimer)
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 85vh;
}
@media (min-width: 1024px) {
  .hero {
    min-height: 90vh;
  }
}
@media (min-width: 1280px) {
  .hero {
    min-height: 600px;
  }
}

.hero__loading {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: #00A69C;
}

.hero__slides {
  position: relative;
  height: 100%;
  width: 100%;
}

.hero__slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
}
.hero__slide--active {
  opacity: 1;
  z-index: 10;
  pointer-events: auto;
}

/* 2-column layout: left panel + right image */
.hero__layout {
  display: flex;
  flex-direction: column;
  min-height: 85vh;
}
@media (min-width: 1024px) {
  .hero__layout {
    flex-direction: row;
    min-height: 90vh;
  }
}
@media (min-width: 1280px) {
  .hero__layout {
    min-height: 600px;
  }
}

/* Left: green content panel (42–48%) */
.hero__panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00A69C;
  padding: 3rem 1.5rem 4rem;
  order: 2;
}
@media (min-width: 640px) {
  .hero__panel {
    padding: 4rem 2rem 5rem;
  }
}
@media (min-width: 1024px) {
  .hero__panel {
    flex: 0 0 45%;
    padding: 3rem 3rem 3rem 4rem;
    order: 1;
  }
}
@media (min-width: 1280px) {
  .hero__panel {
    flex: 0 0 45%;
    padding: 4rem 4rem 4rem 5rem;
  }
}

.hero__panel-inner {
  max-width: 28rem;
  width: 100%;
  text-align: center;
}
@media (min-width: 1024px) {
  .hero__panel-inner {
    text-align: left;
    max-width: 24rem;
  }
}

.hero__title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  transform: translateY(0.5rem);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}
@media (min-width: 640px) {
  .hero__title {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
}
@media (min-width: 1024px) {
  .hero__title {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
  }
}
.hero__title--visible {
  transform: translateY(0);
  opacity: 1;
}

.hero__subtitle {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
  max-width: 22rem;
  margin: 0 auto 1.75rem;
  transform: translateY(0.5rem);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
  transition-delay: 150ms;
}
@media (min-width: 640px) {
  .hero__subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
}
@media (min-width: 1024px) {
  .hero__subtitle {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 2.25rem;
  }
}
.hero__subtitle--visible {
  transform: translateY(0);
  opacity: 1;
}

.hero__cta {
  transform: translateY(0.5rem);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
  transition-delay: 300ms;
}
.hero__cta--visible {
  transform: translateY(0);
  opacity: 1;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: #F6921E;
  color: white;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.hero__btn:hover {
  background: #d97d12;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
.hero__btn-icon {
  transition: transform 0.2s ease;
}
.hero__btn:hover .hero__btn-icon {
  transform: translateX(0.25rem);
}

/* Right: full-height hero image (52–58%) */
.hero__image-wrap {
  position: relative;
  flex: 1;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  order: 1;
}
@media (min-width: 1024px) {
  .hero__image-wrap {
    flex: 1;
    aspect-ratio: auto;
    min-height: 100%;
    order: 2;
  }
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
@media (min-width: 1024px) {
  .hero__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    min-height: 0;
  }
}

.hero__image-placeholder {
  position: absolute;
  inset: 0;
  background: #008e86;
}

/* Slanted edge overlay - subtle diagonal transition toward the right */
.hero__slant {
  display: none;
}
@media (min-width: 1024px) {
  .hero__slant {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 10rem;
    background: linear-gradient(
      105deg,
      #00A69C 0%,
      #00A69C 35%,
      rgba(0, 166, 156, 0.6) 60%,
      transparent 100%
    );
    pointer-events: none;
  }
}

.hero__nav {
  position: absolute;
  bottom: 1.25rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 30;
}
@media (min-width: 640px) {
  .hero__nav {
    bottom: 1.5rem;
  }
}

.hero__dot {
  height: 0.25rem;
  width: 0.5rem;
  border-radius: 0.125rem;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}
.hero__dot:hover {
  background: rgba(255, 255, 255, 0.8);
}
.hero__dot--active {
  width: 2rem;
  background: white;
}
</style>
