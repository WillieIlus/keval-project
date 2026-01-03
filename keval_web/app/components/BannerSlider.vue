<script setup lang="ts">
import type { Banner } from '~/types/api'

// Define props to accept data from the parent
const props = defineProps<{
  slides: Banner[]
}>()

const currentSlide = ref(0)
const timer = ref<NodeJS.Timeout | null>(null)

// Auto-advance slides every 5 seconds
const startTimer = () => {
  stopTimer()
  timer.value = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopTimer = () => {
  if (timer.value) clearInterval(timer.value)
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? props.slides.length - 1 
    : currentSlide.value - 1
}

// Lifecycle hooks
onMounted(() => {
  if (props.slides.length > 1) startTimer()
})

onUnmounted(() => stopTimer())
</script>

<template>
  <div v-if="slides.length > 0" class="relative w-full h-[600px] overflow-hidden bg-gray-900 group">
    
    <div 
      v-for="(slide, index) in slides" 
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-700 ease-in-out"
      :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <img 
        :src="slide.image" 
        :alt="slide.title" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h2 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
          {{ slide.title }}
        </h2>
        <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in-up delay-100">
          {{ slide.subtitle }}
        </p>
        
        <a 
          v-if="slide.cta_link"
          :href="slide.cta_link"
          class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-colors animate-fade-in-up delay-200"
        >
          {{ slide.cta_text || 'Learn More' }}
        </a>
      </div>
    </div>

    <div v-if="slides.length > 1">
      <button 
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Simple CSS animation for text entrance */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>