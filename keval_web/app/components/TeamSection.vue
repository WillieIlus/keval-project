<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-black text-gray-900 uppercase">Meet The Team</h2>
        <p class="text-kevalgray-500 mt-4 max-w-2xl mx-auto">
          The creative minds behind Keval's premium printing solutions.
        </p>
      </div>

      <div v-if="teamStore.loading" class="text-center py-10">Loading Team...</div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="person in teamStore.members" 
          :key="person.id" 
          class="group relative overflow-hidden rounded-xl aspect-square bg-gray-100"
        >
          <img 
            :src="person.image" 
            :alt="`${person.name} team member photo`" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-kevalgreen-500/95 via-kevalgreen-500/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-[400ms] ease-out flex flex-col justify-end p-6">
            
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[400ms] delay-75">
              <h3 class="text-white font-bold text-xl mb-1">{{ person.name }}</h3>
              <p class="text-white/90 font-medium text-xs uppercase tracking-wider mb-3">
                {{ person.title }}
              </p>
              
              <!-- Bio text on hover -->
              <p v-if="person.bio" class="text-white/95 text-sm leading-relaxed mb-4 line-clamp-3">
                {{ person.bio }}
              </p>
              
              <div class="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                <a 
                  v-if="person.linkedin" 
                  :href="person.linkedin" 
                  target="_blank" 
                  class="text-white hover:text-kevalorange-500 hover:scale-110 transition-all duration-200"
                  :aria-label="`Follow ${person.name} on LinkedIn`"
                >
                  <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
                </a>
                
                <a 
                  v-if="person.twitter" 
                  :href="person.twitter" 
                  target="_blank" 
                  class="text-white hover:text-kevalorange-500 hover:scale-110 transition-all duration-200"
                  :aria-label="`Follow ${person.name} on Twitter`"
                >
                  <UIcon name="i-simple-icons-x" class="w-5 h-5" />
                </a>

                <a 
                  v-if="person.email" 
                  :href="`mailto:${person.email}`"
                  class="text-white hover:text-kevalorange-500 hover:scale-110 transition-all duration-200"
                  :aria-label="`Email ${person.name}`"
                >
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>thanks</p>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useTeamStore } from '~/stores/team'

const teamStore = useTeamStore()

onMounted(() => {
  teamStore.fetchTeam()
})
</script>