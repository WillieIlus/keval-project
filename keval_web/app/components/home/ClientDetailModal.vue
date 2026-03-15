<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ wrapper: 'sm:max-w-md md:max-w-lg', content: 'overflow-hidden rounded-2xl' }"
    @update:open="(v: boolean) => !v && emit('update:open', false)"
  >
    <template #content>
      <article v-if="client" class="p-6 md:p-8">
        <header class="flex justify-between items-start gap-4 mb-6">
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 pr-8">{{ client.name }}</h2>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            size="sm"
            class="shrink-0 -m-2"
            aria-label="Close"
            @click="isOpen = false"
          />
        </header>

        <div class="flex justify-center py-10 px-8 bg-gray-50 rounded-xl mb-6">
          <img :src="logoUrl" :alt="client.name" class="max-h-36 w-auto object-contain" draggable="false" />
        </div>

        <p v-if="client.description" class="text-kevalgray-600 text-sm leading-relaxed mb-5">
          {{ client.description }}
        </p>

        <div v-if="client.project_type" class="mb-5">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Work delivered</span>
          <p class="text-gray-700 mt-1.5">{{ client.project_type }}</p>
        </div>

        <blockquote v-if="testimonial" class="p-5 bg-kevalgreen-50/80 rounded-xl border border-kevalgreen-100 mb-6">
          <p class="text-sm text-gray-700 italic leading-relaxed">"{{ testimonial.content }}"</p>
          <footer class="mt-3 text-xs text-kevalgray-500">
            — {{ testimonial.client_name }}{{ testimonial.position ? `, ${testimonial.position}` : '' }}{{ testimonial.company ? ` at ${testimonial.company}` : '' }}
          </footer>
        </blockquote>

        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            v-if="client.website"
            :href="client.website"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-kevalgreen-500 text-white rounded-xl font-medium text-sm hover:bg-kevalgreen-600 transition-colors"
          >
            Visit Website
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
          </a>
          <NuxtLink
            to="/portfolio"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            View Our Work
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </article>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useImageUrl } from '~/composables/useAPI'
import type { Client, Testimonial } from '~/types/api'

const props = defineProps<{
  open: boolean
  client: Client | null
  testimonial: Testimonial | null
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { getImageUrl } = useImageUrl()

const isOpen = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v)
})

const logoUrl = computed(() => (props.client ? getImageUrl(props.client.logo) : ''))
</script>
