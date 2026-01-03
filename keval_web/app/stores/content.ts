// ~/stores/content.ts
import { defineStore } from 'pinia';
import type { Banner, Client, Testimonial, ContactSubmission } from '~/types/api';

export const useContentStore = defineStore('content', () => {
  // --- State ---
  const config = useRuntimeConfig();
  const banners = ref<Banner[]>([]);
  const clients = ref<Client[]>([]);
  const testimonials = ref<Testimonial[]>([]);
  const loading = ref(false);

  // --- Getters ---
  const featuredClients = computed(() => clients.value.filter(c => c.is_featured)); 
  const sortedBanners = computed(() => [...banners.value].sort((a, b) => a.order - b.order)); 

  // --- Actions ---

  // Fetches initial data for the landing page
  async function initLandingPage() {
    loading.value = true;
    try {
      // Use Promise.all for concurrent fetching
      const [bannersData, clientsData, testimonialsData] = await Promise.all([
        $fetch<Banner[]>('/api/core/banners/'),
        $fetch<Client[]>('/api/clients/'),        
        $fetch<Testimonial[]>('/api/testimonials/') 
      ]);

      banners.value = bannersData;
      clients.value = clientsData;
      testimonials.value = testimonialsData;
    } catch (e) {
      console.error('Error loading landing page content', e);
    } finally {
      loading.value = false;
    }
  }

  // Handle Contact Form
  async function submitContact(form: ContactSubmission) {
    try {
      
      await $fetch('/api/core/contact/', {
        method: 'POST',
        body: form
      });
      return true; // Success
    } catch (e) {
      throw e; // Let component handle UI error
    }
  }

  return {
    banners,
    clients,
    testimonials,
    featuredClients,
    sortedBanners,
    loading,
    initLandingPage,
    submitContact
  };
});