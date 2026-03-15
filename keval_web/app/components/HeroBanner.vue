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
        <div class="hero__container">
          <div class="hero__grid">
            <div class="hero__content">
              <div class="hero__content-inner">
                <span
                  class="hero__badge"
                  :class="{ 'hero__badge--visible': currentIndex === index }"
                >
                  {{ banner.title }}
                </span>
                <h1
                  class="hero__title"
                  :class="{ 'hero__title--visible': currentIndex === index }"
                >
                  {{ banner.subtitle }}
                </h1>
                <div
                  class="hero__cta"
                  :class="{ 'hero__cta--visible': currentIndex === index }"
                >
                  <NuxtLink
                    v-if="banner.cta_link"
                    :to="banner.cta_link"
                    class="hero__btn"
                  >
                    {{ banner.cta_text || 'Learn More' }}
                    <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 hero__btn-icon" />
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="hero__media">
              <div
                class="hero__media-frame"
                :class="{ 'hero__media-frame--active': currentIndex === index }"
              >
                <img
                  v-if="banner.image"
                  :src="getImageUrl(banner.image)"
                  :alt="banner.title || banner.subtitle"
                  class="hero__media-img"
                />
                <div v-else class="hero__media-placeholder" />
              </div>
            </div>
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
  background: #00A69C;
  min-height: 92vh;
  padding: 3.5rem 0;
}
@media (min-width: 640px) {
  .hero {
    padding: 5rem 0;
  }
}
@media (min-width: 768px) {
  .hero {
    min-height: 680px;
    padding: 6rem 0;
  }
}
@media (min-width: 1024px) {
  .hero {
    min-height: 720px;
    padding: 7rem 0;
  }
}
@media (min-width: 1280px) {
  .hero {
    min-height: 800px;
    padding: 8rem 0;
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

.hero__container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
}
@media (min-width: 640px) {
  .hero__container {
    padding: 0 1.5rem;
  }
}
@media (min-width: 1024px) {
  .hero__container {
    padding: 0 2rem;
  }
}
@media (min-width: 1280px) {
  .hero__container {
    padding: 0 3rem;
  }
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  min-height: 65vh;
}
@media (min-width: 768px) {
  .hero__grid {
    min-height: 580px;
  }
}
@media (min-width: 1024px) {
  .hero__grid {
    grid-template-columns: 5fr 7fr;
    gap: 3rem;
    min-height: 600px;
  }
}
@media (min-width: 1280px) {
  .hero__grid {
    gap: 4rem;
  }
}

.hero__content {
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (min-width: 1024px) {
  .hero__content {
    grid-row: 1;
  }
}

.hero__content-inner {
  max-width: 36rem;
  margin: 0 auto;
  text-align: center;
}
@media (min-width: 1024px) {
  .hero__content-inner {
    margin: 0;
    text-align: left;
  }
}

.hero__badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  border-radius: 0.125rem;
  color: rgba(255, 255, 255, 0.95);
  transform: translateX(-2.5rem);
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: 300ms;
}
.hero__badge--visible {
  transform: translateX(0);
  opacity: 1;
}

.hero__title {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
  transform: translateX(-2.5rem);
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: 500ms;
}
@media (min-width: 640px) {
  .hero__title {
    font-size: 2.25rem;
  }
}
@media (min-width: 768px) {
  .hero__title {
    font-size: 3rem;
    margin-bottom: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .hero__title {
    font-size: 3rem;
  }
}
@media (min-width: 1280px) {
  .hero__title {
    font-size: 3.75rem;
  }
}
.hero__title--visible {
  transform: translateX(0);
  opacity: 1;
}

.hero__cta {
  transform: translateY(1rem);
  opacity: 0;
  transition: transform 1s ease, opacity 1s ease;
  transition-delay: 700ms;
}
.hero__cta--visible {
  transform: translateY(0);
  opacity: 1;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #F6921E;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
@media (min-width: 640px) {
  .hero__btn {
    padding: 1rem 2rem;
  }
}
.hero__btn:hover {
  background: #d97d12;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.hero__btn-icon {
  transition: transform 0.2s ease;
}
.hero__btn:hover .hero__btn-icon {
  transform: translateX(0.25rem);
}

.hero__media {
  grid-row: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 18rem;
}
@media (min-width: 640px) {
  .hero__media {
    min-height: 22rem;
  }
}
@media (min-width: 768px) {
  .hero__media {
    min-height: 25rem;
  }
}
@media (min-width: 1024px) {
  .hero__media {
    grid-row: 1;
    min-height: 30rem;
  }
}

.hero__media-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  max-width: 42rem;
  margin: 0 auto;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transform: scale(0.95);
  transition: transform 8s ease;
}
@media (min-width: 640px) {
  .hero__media-frame {
    aspect-ratio: 16 / 10;
  }
}
@media (min-width: 1024px) {
  .hero__media-frame {
    aspect-ratio: 16 / 9;
    max-width: none;
  }
}
.hero__media-frame--active {
  transform: scale(1);
}

.hero__media-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.hero__media-placeholder {
  position: absolute;
  inset: 0;
  background: rgba(0, 102, 95, 0.3);
}

.hero__nav {
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 30;
}
@media (min-width: 640px) {
  .hero__nav {
    bottom: 2rem;
  }
}

.hero__dot {
  height: 0.375rem;
  width: 0.75rem;
  border-radius: 0.125rem;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
}
.hero__dot:hover {
  background: rgba(255, 255, 255, 0.8);
}
.hero__dot--active {
  width: 2.5rem;
  background: white;
}
</style>
