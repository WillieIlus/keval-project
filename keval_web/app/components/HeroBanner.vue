<template>
  <section 
    class="relative w-full overflow-hidden bg-kevalgreen-500 group" 
    style="height: 56vh; min-height: 420px; max-height: 520px;"
    @mouseenter="pauseTimer" 
    @mouseleave="resumeTimer"
    aria-roledescription="carousel"
  >
    <div v-if="marketing.loading" class="absolute inset-0 z-20 flex items-center justify-center text-white bg-kevalgreen-500">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin" />
    </div>

    <div v-else class="h-full w-full relative">
      <div 
        v-for="(banner, index) in marketing.activeBanners" 
        :key="banner.id"
        class="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
        :class="[
          currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        ]"
        role="group" 
        :aria-hidden="currentIndex !== index"
      >
        <div 
          class="absolute inset-0 transition-transform duration-[8000ms] ease-linear"
          :class="currentIndex === index ? 'scale-110' : 'scale-100'"
          :style="{
            backgroundImage: `linear-gradient(to right, rgba(0, 166, 156, 0.55) 0%, rgba(0, 166, 156, 0.15) 35%, transparent 100%), url(${banner.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
          :aria-label="banner.title || banner.subtitle"
        ></div>

        <div class="container relative h-full mx-auto px-6 z-20 flex items-center">
          <div class="max-w-4xl text-center md:text-left text-white overflow-hidden">
            
            <div 
              class="transition-all duration-1000 delay-300 transform"
              :class="currentIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
            >
              <span class="inline-block py-1 px-2.5 mb-3 text-xs font-medium tracking-widest uppercase bg-white/10 backdrop-blur-sm rounded-sm">
                {{ banner.title }}
              </span>
            </div>
            
            <div 
              class="transition-all duration-1000 delay-500 transform"
              :class="currentIndex === index ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
            >
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 uppercase drop-shadow-lg">
                {{ banner.subtitle }}
              </h1>
            </div>

            <div 
              class="transition-all duration-1000 delay-700 transform"
              :class="currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
            >
              <NuxtLink 
                v-if="banner.cta_link" 
                :to="banner.cta_link" 
                class="inline-flex items-center gap-2 px-5 py-2.5 bg-kevalorange-500 text-white hover:bg-kevalorange-700 transition-all duration-300 rounded font-semibold text-sm shadow group/btn"
              >
                {{ banner.cta_text || 'Learn More' }}
                <UIcon 
                  name="i-heroicons-arrow-right" 
                  class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" 
                />
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
      <button 
        v-for="(_, index) in marketing.activeBanners" 
        :key="index"
        @click="setSlide(index)"
        class="h-1 rounded-sm transition-all duration-300"
        :class="currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMarketingStore } from '~/stores/marketing'

const marketing = useMarketingStore()

// State
const currentIndex = ref(0)
let timer: NodeJS.Timeout | null = null
const LOOP_DURATION = 7000 // 7 seconds

// Logic to advance slide
const nextSlide = () => {
  if (marketing.activeBanners.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % marketing.activeBanners.length
  }
}

// Timer Controls
const startTimer = () => {
  stopTimer() // Prevent duplicates
  timer = setInterval(nextSlide, LOOP_DURATION)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Interaction Handlers
const pauseTimer = () => stopTimer()
const resumeTimer = () => startTimer()
const setSlide = (index: number) => {
  currentIndex.value = index
  startTimer() // Reset timer so it doesn't jump immediately after click
}

onMounted(async () => {
  if (marketing.banners.length === 0) {
    await marketing.fetchBanners()
  }
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>