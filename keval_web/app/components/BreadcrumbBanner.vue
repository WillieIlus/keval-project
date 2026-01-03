<template>
  <section class="relative bg-kevalgreen-500 pt-48 pb-12 md:pb-20 overflow-hidden">
    
    <div class="absolute inset-0 z-0">
      <img 
        src="/images/banner-texture.jpg" 
        alt="" 
        class="w-full h-full object-cover opacity-20 mix-blend-overlay"
      />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-kevalgreen-500/50"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center gap-3">
          <li class="flex items-center">
            <NuxtLink
              to="/"
              class="text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
            >
              <UIcon name="i-heroicons-home" class="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-bold uppercase tracking-wider">Home</span>
            </NuxtLink>
          </li>

          <li
            v-for="(crumb, index) in crumbs"
            :key="index"
            class="flex items-center gap-3"
          >
            <UIcon name="i-heroicons-chevron-right" class="text-white/40 w-4 h-4" />
            <NuxtLink
              :to="crumb.path"
              class="text-white font-black text-2xl md:text-4xl hover:text-kevalorange-500 transition-colors focus:outline-none uppercase"
              :aria-current="index === crumbs.length - 1 ? 'page' : undefined"
            >
              {{ crumb.name }}
            </NuxtLink>
          </li>
        </ol>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();

const crumbs = computed(() => {
  const fullPath = route.path.split("/").filter(Boolean);
  return fullPath.map((path, index) => {
    return {
      name: path.replace(/-/g, " "),
      path: "/" + fullPath.slice(0, index + 1).join("/"),
    };
  });
});
</script>