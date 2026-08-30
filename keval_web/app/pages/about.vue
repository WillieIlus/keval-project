<!-- ~/pages/about.vue -->
<template>
  <div class="bg-white transition-colors">
    <section class="bg-gradient-to-br from-kevalgreen-600 to-kevalgreen-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl">
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-kevalorange-200 mb-4">
            Company Profile
          </p>
          <h1 class="text-4xl md:text-6xl font-black leading-tight mb-6">
            Design, print and branding services for every brand touchpoint.
          </h1>
          <p class="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
            Keval Investments Limited is a Nairobi-based graphic design, printing and branding company dedicated to transforming ideas into visually stunning and impactful experiences.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-kevalorange-500 px-6 py-3 font-semibold text-white hover:bg-kevalorange-600 transition-colors"
            >
              Request a Quote
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5" />
            </NuxtLink>
            <a
              href="/keval-company-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-kevalgreen-700 hover:bg-gray-100 transition-colors"
            >
              <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
              Download Profile
            </a>
            <a
              href="tel:+254711635104"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <UIcon name="i-heroicons-phone" class="w-5 h-5" />
              0711 635 104
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="item in companyFacts"
            :key="item.label"
            class="rounded-lg bg-white border border-gray-100 p-6"
          >
            <p class="text-sm font-semibold uppercase tracking-wider text-kevalgreen-600">
              {{ item.label }}
            </p>
            <p class="mt-3 text-lg font-bold text-gray-900">
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm mb-3">
              About Us
            </p>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Creative production built around quality and customer satisfaction.
            </h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Keval Investments Limited was established in 2023 and is registered under the Companies Acts and the Laws of Kenya.
              </p>
              <p>
                Our team of designers, branding specialists and printing experts brings together practical experience and modern production tools to deliver tailored solutions for businesses and individuals.
              </p>
              <p>
                We work from Print Hub Building in Nairobi, supporting graphic design, digital and offset printing, large-format production, packaging, labels, promotional items and full brand implementation.
              </p>
              <p>
                We focus on creativity, quality and customer satisfaction so every project helps our clients improve visibility, communicate clearly and leave a lasting impression.
              </p>
            </div>
          </div>

          <div class="grid gap-5">
            <div class="rounded-lg border border-gray-100 bg-gray-50 p-6">
              <div class="flex items-center gap-3 mb-3">
                <UIcon name="i-heroicons-rocket-launch" class="w-7 h-7 text-kevalgreen-600" />
                <h3 class="text-xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p class="text-gray-600 leading-relaxed">
                To provide innovative and high-quality design, printing and branding services that enhance brand visibility, empower businesses and leave a lasting impression.
              </p>
            </div>
            <div class="rounded-lg border border-gray-100 bg-gray-50 p-6">
              <div class="flex items-center gap-3 mb-3">
                <UIcon name="i-heroicons-eye" class="w-7 h-7 text-kevalorange-600" />
                <h3 class="text-xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p class="text-gray-600 leading-relaxed">
                To become a trusted leader in the graphic design and branding industry by consistently delivering outstanding solutions that drive success for our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <p class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm mb-3">
            Core Values
          </p>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">
            The principles behind every project.
          </h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="value in values"
            :key="value.title"
            class="rounded-lg bg-white border border-gray-100 p-5"
          >
            <UIcon :name="value.icon" class="w-8 h-8 text-kevalgreen-600 mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <p class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm mb-3">
            Our Services
          </p>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">
            Design, print and brand implementation under one roof.
          </h2>
        </div>
        <div class="grid gap-6 lg:grid-cols-3">
          <div
            v-for="service in services"
            :key="service.title"
            class="rounded-lg border border-gray-100 bg-gray-50 p-6"
          >
            <div class="w-12 h-12 rounded-lg bg-kevalgreen-100 flex items-center justify-center mb-5">
              <UIcon :name="service.icon" class="w-7 h-7 text-kevalgreen-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ service.title }}</h3>
            <ul class="space-y-3 text-gray-600">
              <li v-for="item in service.items" :key="item" class="flex gap-2">
                <UIcon name="i-heroicons-check" class="w-5 h-5 text-kevalorange-500 shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <p class="text-kevalorange-400 font-semibold uppercase tracking-wider text-sm mb-3">
              Why Choose Us
            </p>
            <h2 class="text-3xl md:text-4xl font-black mb-6">
              Reliable creative support from concept to delivery.
            </h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="reason in reasons" :key="reason.title" class="rounded-lg bg-white/10 p-5 border border-white/10">
                <h3 class="font-bold mb-2">{{ reason.title }}</h3>
                <p class="text-sm text-white/75 leading-relaxed">{{ reason.description }}</p>
              </div>
            </div>
          </div>
          <div>
            <p class="text-kevalorange-400 font-semibold uppercase tracking-wider text-sm mb-3">
              Our Process
            </p>
            <h2 class="text-3xl md:text-4xl font-black mb-6">
              A clear path from brief to finished materials.
            </h2>
            <ol class="space-y-4">
              <li v-for="(step, index) in process" :key="step.title" class="flex gap-4">
                <span class="w-9 h-9 rounded-lg bg-kevalorange-500 text-white font-bold flex items-center justify-center shrink-0">
                  {{ index + 1 }}
                </span>
                <div>
                  <h3 class="font-bold">{{ step.title }}</h3>
                  <p class="text-sm text-white/75 leading-relaxed">{{ step.description }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <p class="text-kevalorange-500 font-semibold uppercase tracking-wider text-sm mb-3">
            Our Clients
          </p>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">
            Trusted for brand and print production.
          </h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="client in clients"
            :key="client"
            class="rounded-lg border border-gray-100 bg-gray-50 p-5 text-center font-semibold text-gray-800"
          >
            {{ client }}
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-kevalgreen-600 text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <p class="text-kevalgreen-100 uppercase tracking-[0.25em] text-sm font-semibold mb-4">
          Get In Touch
        </p>
        <h2 class="text-3xl md:text-4xl font-black mb-4">
          Inspire through brand values.
        </h2>
        <p class="text-kevalgreen-50 mb-8">
          Visit us at Print Hub Building, Ground Floor, Room B06, off Kirinyaga Road, Nairobi, or contact us for your next design, printing or branding project.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+254720335863" class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-kevalgreen-700 hover:bg-gray-100 transition-colors">
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            0720 335 863
          </a>
          <a href="tel:+254711635104" class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-kevalgreen-700 hover:bg-gray-100 transition-colors">
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            0711 635 104
          </a>
          <a href="mailto:kevalinvestmentsltd@gmail.com" class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
            <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
            Email Us
          </a>
          <a href="/keval-company-profile.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
            <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
            Company Profile
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const companyFacts = [
  { label: 'Established', value: '2023' },
  { label: 'Registered', value: 'Under the Companies Acts and Laws of Kenya' },
  { label: 'Location', value: 'Print Hub Building, Ground Floor, Room B06, Nairobi' }
]

const values = [
  { icon: 'i-heroicons-sparkles', title: 'Creativity', description: 'Pushing boundaries to deliver unique and engaging designs.' },
  { icon: 'i-heroicons-check-badge', title: 'Excellence', description: 'Uncompromising quality in every project.' },
  { icon: 'i-heroicons-users', title: 'Collaboration', description: 'Partnering with clients to bring their visions to life.' },
  { icon: 'i-heroicons-light-bulb', title: 'Innovation', description: 'Leveraging the latest tools and trends.' },
  { icon: 'i-heroicons-shield-check', title: 'Integrity', description: 'Upholding trust and transparency in all interactions.' }
]

const services = [
  {
    icon: 'i-heroicons-paint-brush',
    title: 'Graphic Design',
    items: [
      'Logo design and development',
      'Corporate brand identity',
      'Flyers, posters, brochures and business cards',
      'Gift bags and product labels',
      'Digital graphics for social media, websites and ads'
    ]
  },
  {
    icon: 'i-heroicons-printer',
    title: 'Printing Services',
    items: [
      'Offset and digital printing',
      'Large-format banners, posters and signages',
      'Packaging and labels',
      'Letterheads, envelopes and notepads',
      'T-shirts, mugs, promotional products, brochures, catalogues and magazines'
    ]
  },
  {
    icon: 'i-heroicons-megaphone',
    title: 'Branding Services',
    items: [
      'Brand strategy and development',
      'Logo, typography and colour palette systems',
      'Corporate branding and rebranding',
      'Vehicle branding',
      'Retail, office, event, signage and environmental branding'
    ]
  }
]

const reasons = [
  { title: 'Expert Team', description: 'A talented team with extensive industry experience.' },
  { title: 'Modern Technology', description: 'Current tools for design, printing and finishing.' },
  { title: 'Customized Solutions', description: 'Tailored services matched to each business need.' },
  { title: 'On-Time Delivery', description: 'Punctual turnaround without compromising quality.' },
  { title: 'Affordable Pricing', description: 'High-quality services at competitive prices.' },
  { title: 'Commitment to Excellence', description: 'Creative and impactful results on every project.' }
]

const process = [
  { title: 'Consultation', description: 'Understanding client needs, goals and vision.' },
  { title: 'Concept Development', description: 'Brainstorming creative concepts and strategies.' },
  { title: 'Design', description: 'Developing designs aligned with the brand vision.' },
  { title: 'Review and Approval', description: 'Collaborating with clients to refine and finalize designs.' },
  { title: 'Production', description: 'Producing prints and branded materials with quality methods.' },
  { title: 'Delivery', description: 'Ensuring timely delivery of final products.' }
]

const clients = [
  'Afroscope Consulting',
  'Enda Athletics Kenya',
  'Brisk Marketing Limited',
  'Crestwood Marketing & Communications Limited'
]

useSeoMeta({
  title: 'About Us | Keval Investments Limited',
  description: 'Keval Investments Limited provides graphic design, printing and branding services from Print Hub Building, Nairobi.',
  ogTitle: 'About Keval Investments Limited',
  ogDescription: 'Company profile, mission, vision, services, values and contact information for Keval Investments Limited.'
})
</script>
