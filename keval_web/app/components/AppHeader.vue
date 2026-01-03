<template>
  <nav 
    :class="[
      ' fixed top-0 left-0 right-0 text-white z-50 transition-all duration-300',
      isScrolled ? 'bg-kevalgreen-500' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
      
      <div class="flex items-center flex-1 lg:flex-none">
        <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden p-2" aria-label="Open Menu">
          <UIcon name="i-heroicons-bars-3" class="w-8 h-8" />
        </button>

        <NuxtLink to="/" class="hidden lg:block">
          <img src="/logo-white.png" alt="Keval Logo" class="h-20 w-auto" />
        </NuxtLink>
      </div>

      <div class="flex flex-1 justify-center">
        <NuxtLink to="/" class="lg:hidden">
          <img src="/logo-white.png" alt="Keval Logo" class="h-20 w-auto" />
        </NuxtLink>

        <ul class="hidden lg:flex items-center gap-8 font-medium">
          <li><NuxtLink to="/" class="hover:text-kevalorange-500 transition">Home</NuxtLink></li>
          <li><NuxtLink to="/portfolio" class="hover:text-kevalorange-500 transition">Our Work</NuxtLink></li>
          <li><NuxtLink to="/team" class="hover:text-kevalorange-500 transition">Meet Team</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-kevalorange-500 transition">Contact</NuxtLink></li>
        </ul>
      </div>

      <div class="flex flex-1 lg:flex-none justify-end items-center gap-4">
        <div class="hidden lg:flex items-center gap-4">
          <NuxtLink to="/login" class="px-4 py-2 hover:bg-white/10 rounded-md transition">Login</NuxtLink>
          <NuxtLink to="/register" class="px-4 py-2 bg-kevalorange-500 hover:bg-orange-600 rounded-md font-bold transition">Sign Up</NuxtLink>
        </div>

        <button class="lg:hidden p-2" @click="isAuthOpen = !isAuthOpen">
          <UIcon name="i-heroicons-user-circle" class="w-8 h-8" />
        </button>
      </div>
    </div>

    <Transition name="slide-left">
      <div v-if="isMenuOpen" class="fixed inset-0 z-[60] lg:hidden">
        <div class="absolute inset-0 bg-black/50" @click="isMenuOpen = false"></div>
        <div class="absolute inset-y-0 left-0 w-64 bg-white text-gray-900 p-6 flex flex-col">
          <div class="flex justify-between items-center mb-10">
            <span class="font-black text-kevalgreen-500">MENU</span>
            <button @click="isMenuOpen = false"><UIcon name="i-heroicons-x-mark" class="w-6 h-6"/></button>
          </div>
          <ul class="flex flex-col gap-6 text-lg font-bold">
            <li><NuxtLink to="/" @click="isMenuOpen = false">Home</NuxtLink></li>
            <li><NuxtLink to="/portfolio" @click="isMenuOpen = false">Portfolio</NuxtLink></li>
            <li><NuxtLink to="/team" @click="isMenuOpen = false">Team</NuxtLink></li>
            <li><NuxtLink to="/contact" @click="isMenuOpen = false">Contact Us</NuxtLink></li>
          </ul>
        </div>
      </div>
    </Transition>

    <Transition name="slide-right">
      <div v-if="isAuthOpen" class="fixed inset-0 z-[60] lg:hidden">
        <div class="absolute inset-0 bg-black/20" @click="isAuthOpen = false"></div>
        <div class="absolute inset-y-0 right-0 w-64 bg-white text-gray-900 p-6">
          <div class="flex justify-between items-center mb-10">
            <button @click="isAuthOpen = false"><UIcon name="i-heroicons-x-mark" class="w-6 h-6"/></button>
            <span class="font-black text-kevalorange-500">ACCOUNT</span>
          </div>
          <div class="flex flex-col gap-4">
            <NuxtLink to="/login" @click="isAuthOpen = false" class="w-full py-3 text-center border-2 border-kevalgreen-500 rounded-xl">Login</NuxtLink>
            <NuxtLink to="/register" @click="isAuthOpen = false" class="w-full py-3 text-center bg-kevalgreen-500 text-white rounded-xl">Sign Up</NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)
const isAuthOpen = ref(false)
const isScrolled = ref(false)

// Handle scroll event
const handleScroll = () => {
  // Change background when scrolled more than 50px (halfway through typical hero section)
  isScrolled.value = window.scrollY > 50
}

// Add scroll listener on mount
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// Clean up listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Close menus when changing routes
watch(() => useRoute().fullPath, () => {
  isMenuOpen.value = false
  isAuthOpen.value = false
})
</script>

<style scoped>
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-left-enter-from, .slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from, .slide-right-leave-to {
  transform: translateX(100%);
}
</style>