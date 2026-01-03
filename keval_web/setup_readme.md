# Complete Nuxt 4 + Django Integration Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [File Structure](#file-structure)
3. [Installation](#installation)
4. [Django Backend Setup](#django-backend-setup)
5. [Environment Configuration](#environment-configuration)
6. [Usage Examples](#usage-examples)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Django 4+ backend running
- Python 3.8+

## File Structure

Create this exact folder structure in your Nuxt project:

```
your-nuxt-app/
├── types/
│   └── api.ts                    # TypeScript type definitions
├── stores/
│   ├── auth.ts                   # Authentication store
│   ├── content.ts                # Content management store
│   └── gallery.ts                # Gallery/portfolio store
├── middleware/
│   ├── auth.ts                   # Protected route middleware
│   ├── admin.ts                  # Admin-only middleware
│   └── guest.ts                  # Guest-only middleware (redirects if logged in)
├── plugins/
│   └── api.ts                    # API configuration plugin
├── composables/
│   └── useApi.ts                 # Reusable API utilities
├── pages/
│   ├── index.vue                 # Landing page
│   ├── login.vue                 # Login page
│   ├── register.vue              # Registration page
│   └── dashboard.vue             # Dashboard (protected)
├── .env                          # Environment variables (create this)
└── nuxt.config.ts                # Nuxt configuration
```

## Installation

### Step 1: Install Dependencies

```bash
npm install pinia @pinia/nuxt @pinia-plugin-persistedstate/nuxt
```

### Step 2: Update nuxt.config.ts

Your `nuxt.config.ts` should already have these modules. Verify:

```typescript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    // ... other modules
  ],

  imports: {
    dirs: ['stores']
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
```

### Step 3: Create Environment File

Create `.env` in your project root:

```env
NUXT_PUBLIC_API_BASE=http://localhost:8000/api
```

For production:
```env
NUXT_PUBLIC_API_BASE=https://api.your-domain.com/api
```

## Django Backend Setup

### Step 1: Install Required Packages

```bash
pip install django-cors-headers djangorestframework
```

### Step 2: Update Django settings.py

```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at the top
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# For production:
# CORS_ALLOWED_ORIGINS = ["https://your-domain.com"]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

### Step 3: Run Migrations

```bash
python manage.py migrate
```

### Step 4: Update Django Views

Your `accounts/views.py` should return tokens:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## Usage Examples

### 1. Protected Pages with Authentication

```vue
<script setup>
// This page requires authentication
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
</script>

<template>
  <div>
    <h1>Welcome, {{ authStore.fullName }}!</h1>
    <button @click="authStore.logout">Logout</button>
  </div>
</template>
```

### 2. Loading Landing Page Content

```vue
<script setup>
const contentStore = useContentStore()
const { getImageUrl } = useImageUrl()

onMounted(async () => {
  await contentStore.initLandingPage()
})
</script>

<template>
  <div v-if="!contentStore.loading">
    <!-- Banners -->
    <div v-for="banner in contentStore.sortedBanners" :key="banner.id">
      <h2>{{ banner.title }}</h2>
      <img :src="getImageUrl(banner.image)" :alt="banner.title">
    </div>

    <!-- Featured Clients -->
    <div v-for="client in contentStore.featuredClients" :key="client.id">
      <img :src="getImageUrl(client.logo)" :alt="client.name">
    </div>

    <!-- Testimonials -->
    <div v-for="testimonial in contentStore.sortedTestimonials" :key="testimonial.id">
      <p>{{ testimonial.content }}</p>
      <span>- {{ testimonial.client_name }}</span>
    </div>
  </div>
</template>
```

### 3. Gallery/Portfolio with Categories

```vue
<script setup>
const galleryStore = useGalleryStore()

onMounted(async () => {
  await galleryStore.fetchCategories()
})
</script>

<template>
  <div>
    <!-- All Projects -->
    <h2>Total Projects: {{ galleryStore.totalProjects }}</h2>
    
    <!-- Featured Projects -->
    <div v-for="project in galleryStore.featuredProjects" :key="project.id">
      <NuxtLink :to="`/portfolio/${project.slug}`">
        <h3>{{ project.title }}</h3>
        <p>{{ project.client }}</p>
      </NuxtLink>
    </div>

    <!-- Categories with Projects -->
    <div v-for="category in galleryStore.topLevelCategories" :key="category.id">
      <h3>{{ category.name }}</h3>
      <div v-for="project in category.projects" :key="project.id">
        <h4>{{ project.title }}</h4>
      </div>
    </div>
  </div>
</template>
```

### 4. Project Detail Page

```vue
<script setup>
const route = useRoute()
const galleryStore = useGalleryStore()
const { getImageUrl } = useImageUrl()

const slug = route.params.slug as string

onMounted(async () => {
  await galleryStore.fetchProjectBySlug(slug)
})
</script>

<template>
  <div v-if="galleryStore.currentProject">
    <h1>{{ galleryStore.currentProject.title }}</h1>
    <p>Client: {{ galleryStore.currentProject.client }}</p>
    <p>{{ galleryStore.currentProject.description }}</p>
    
    <!-- Project Images -->
    <div v-for="image in galleryStore.currentProject.images" :key="image.id">
      <img :src="getImageUrl(image.image)" :alt="image.caption">
      <p>{{ image.caption }}</p>
    </div>
  </div>
</template>
```

### 5. Contact Form Submission

```vue
<script setup>
const contentStore = useContentStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service_interest: '',
  message: ''
})

const submitSuccess = ref(false)

const handleSubmit = async () => {
  try {
    await contentStore.submitContact(form)
    submitSuccess.value = true
    // Reset form
    Object.keys(form).forEach(key => form[key] = '')
  } catch (e) {
    alert('Failed to send message')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Name" required>
    <input v-model="form.email" type="email" placeholder="Email" required>
    <input v-model="form.phone" placeholder="Phone">
    <input v-model="form.service_interest" placeholder="Service Interest">
    <textarea v-model="form.message" placeholder="Message" required></textarea>
    <button type="submit">Send</button>
  </form>

  <p v-if="submitSuccess">Message sent successfully!</p>
</template>
```

### 6. Search and Filter Projects

```vue
<script setup>
const galleryStore = useGalleryStore()
const searchQuery = ref('')
const selectedCategory = ref<number>()

const filteredProjects = computed(() => {
  if (searchQuery.value) {
    return galleryStore.searchProjects(searchQuery.value)
  }
  
  if (selectedCategory.value) {
    return galleryStore.filterProjects({ 
      categoryId: selectedCategory.value 
    })
  }
  
  return galleryStore.allProjects
})
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search projects...">
    
    <select v-model="selectedCategory">
      <option :value="undefined">All Categories</option>
      <option 
        v-for="cat in galleryStore.categories" 
        :key="cat.id" 
        :value="cat.id"
      >
        {{ cat.name }}
      </option>
    </select>

    <div v-for="project in filteredProjects" :key="project.id">
      <h3>{{ project.title }}</h3>
    </div>
  </div>
</template>
```

## API Endpoints Reference

Your Nuxt app connects to these Django endpoints:

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user

### Content/Marketing
- `GET /api/banners/` - List banners
- `GET /api/values/` - List core values
- `GET /api/why-choose-us/` - List why choose us items
- `POST /api/contact/` - Submit contact form

### Social Proof
- `GET /api/clients/` - List clients
- `GET /api/testimonials/` - List testimonials

### Portfolio/Gallery
- `GET /api/portfolio/categories/` - List categories (with nested projects & subcategories)
- `GET /api/portfolio/project/<slug>/` - Get project details

## Troubleshooting

### CORS Errors

**Symptom:** Browser console shows CORS errors

**Solution:**
1. Verify `django-cors-headers` is installed
2. Check `CORS_ALLOWED_ORIGINS` includes your Nuxt dev server URL
3. Ensure `corsheaders` middleware is **before** `CommonMiddleware`
4. Restart Django server after changes

```python
# settings.py
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be first
    'django.middleware.common.CommonMiddleware',
    # ...
]
```

### 401 Unauthorized Errors

**Symptom:** All API requests return 401

**Solution:**
1. Check token is being stored in localStorage (inspect browser DevTools)
2. Verify Token authentication is enabled in Django REST Framework
3. Ensure token exists for user: `python manage.py shell` then `from rest_framework.authtoken.models import Token; Token.objects.all()`
4. Check Authorization header format is `Token <token>` not `Bearer <token>`

### Data Not Loading

**Symptom:** Pages show empty or loading forever

**Solution:**
1. Check Django server is running: `python manage.py runserver`
2. Verify API base URL in `.env` is correct
3. Open Network tab in browser DevTools to see API requests
4. Check Django has data: access `/admin` and verify records exist
5. Verify API endpoints return data: visit `http://localhost:8000/api/banners/` directly

### Images Not Showing

**Symptom:** Broken image icons

**Solution:**
1. Use the `useImageUrl()` composable: `const { getImageUrl } = useImageUrl()`
2. Wrap image paths: `<img :src="getImageUrl(banner.image)">`
3. Verify `MEDIA_URL` and `MEDIA_ROOT` are configured in Django settings
4. Check images are served in development:

```python
# urls.py
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Store State Not Persisting

**Symptom:** User logged out after page refresh

**Solution:**
1. Verify `@pinia-plugin-persistedstate/nuxt` is installed
2. Check persist configuration in auth store
3. Inspect browser localStorage in DevTools
4. Clear localStorage and try logging in again

### TypeScript Errors

**Symptom:** TypeScript complains about missing types

**Solution:**
1. Ensure `types/api.ts` is created with all type definitions
2. Run `npm run dev` to regenerate Nuxt types
3. Restart VS Code TypeScript server: `Ctrl+Shift+P` → "Restart TypeScript Server"

### Middleware Not Working

**Symptom:** Can access protected pages without login

**Solution:**
1. Check `definePageMeta` is inside `<script setup>`
2. Verify middleware files are in `middleware/` folder
3. Ensure middleware names match file names
4. Check auth store `isAuthenticated` returns correct value

## Production Deployment

### Environment Variables

Create production `.env`:

```env
NUXT_PUBLIC_API_BASE=https://api.your-domain.com/api
```

### Django Production Settings

```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com', 'api.your-domain.com']

CORS_ALLOWED_ORIGINS = [
    "https://your-domain.com",
]

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

### Build Nuxt App

```bash
npm run build
npm run preview  # Test production build locally
```

## Additional Features

### Store Features

**Auth Store:**
- `isAuthenticated` - Check if user is logged in
- `isAdmin` - Check if user has admin privileges
- `fullName` - Get user's full name
- `clearError()` - Clear error messages
- `updateUser()` - Update user profile

**Content Store:**
- `featuredClients` - Get featured clients only
- `sortedBanners` - Banners sorted by order
- `sortedTestimonials` - Testimonials by date
- `resetAll()` - Clear all data
- `clearError()` - Clear error messages

**Gallery Store:**
- `allProjects` - Flatten all projects from categories
- `featuredProjects` - Featured projects only
- `recentProjects` - Projects sorted by date
- `searchProjects(query)` - Search by title/description
- `filterProjects(filters)` - Filter by multiple criteria
- `getCategoryBySlug` - Find category by slug
- `getProjectBySlug` - Find project by slug

### Composables

**useApi():**
- `apiFetch<T>(url, options)` - Make authenticated requests

**useApiError():**
- `extractErrorMessage(error)` - Parse Django errors

**useLoadingState():**
- `withLoading(fn, options)` - Wrap async calls with loading state

**useImageUrl():**
- `getImageUrl(path)` - Convert Django media paths to full URLs

**useForm(initialValues):**
- Form state management with validation

## Support

If you encounter issues:
1. Check browser console for errors
2. Check Django server logs
3. Verify all environment variables are set
4. Ensure Django and Nuxt are both running
5. Check Network tab in DevTools for failed requests

Common issue: Make sure your Django URLs match exactly:
- `/api/auth/register/` (with trailing slash)
- `/api/portfolio/categories/` (with trailing slash)

Django REST Framework requires trailing slashes by default.
