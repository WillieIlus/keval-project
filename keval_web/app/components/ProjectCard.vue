<template>
  <NuxtLink 
    :to="`/portfolio/${project.slug}`" 
    class="group relative block w-full h-full overflow-hidden shadow-sm border border-gray-200/80 hover:border-kevalgreen-500/40"
    :class="isLarge ? 'rounded-lg' : 'rounded-lg aspect-square lg:aspect-auto'"
  >
    <img 
      :src="coverImage" 
      :alt="project.title"
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

    <div class="absolute inset-0 p-6 flex flex-col justify-end">
      <span class="text-kevalorange-500 font-bold text-[10px] uppercase tracking-widest mb-1">
        {{ project.category_name }}
      </span>
      <h3 class="text-white font-semibold uppercase leading-tight" :class="isLarge ? 'text-xl' : 'text-sm'">
        {{ project.title }}
      </h3>
      
      <div class="max-h-0 overflow-hidden group-hover:max-h-16 transition-all duration-500">
         <p class="text-gray-300 text-xs mt-2 line-clamp-2">{{ project.client }}</p>
         <div class="mt-4 flex items-center text-white text-xs font-bold uppercase">
           View Project <UIcon name="i-heroicons-arrow-right" class="ml-2 w-4 h-4" />
         </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: any
  isLarge?: boolean
}>()

const coverImage = computed(() => {
  const cover = props.project.images?.find((img: any) => img.is_cover)
  return cover ? cover.image : props.project.images?.[0]?.image || ''
})
</script>