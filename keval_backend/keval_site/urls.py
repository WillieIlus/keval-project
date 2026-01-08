from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from core.views import (
    BannerListView, CoreValueListView, 
    WhyChooseUsListView, TeamMemberListView,
    ContactSubmissionCreateView
)
from clients.views import ClientListView
from testimonials.views import TestimonialListView
from gallery.views import CategoryListView, ProjectDetailView
from accounts.views import CustomLoginView, RegisterView

# API URL patterns
api_patterns = [
    # Core / Marketing
    path('banners/', BannerListView.as_view(), name='banner-list'),
    path('values/', CoreValueListView.as_view(), name='values-list'),
    path('why-choose-us/', WhyChooseUsListView.as_view(), name='why-choose-us'),
    path('team/', TeamMemberListView.as_view(), name='team-list'),
    path('contact/', ContactSubmissionCreateView.as_view(), name='contact-submit'),
    
    # Social Proof
    path('clients/', ClientListView.as_view(), name='client-list'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),

    # Portfolio / Gallery
    path('portfolio/categories/', CategoryListView.as_view(), name='category-tree'),
    path('portfolio/project/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),

    # Auth
    path('auth/register/', RegisterView.as_view(), name='api-register'), # NEW
    path('auth/login/', CustomLoginView.as_view(), name='api-login'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('_nested_admin/', include('nested_admin.urls')), # Required for your nested admin
    path('api/', include(api_patterns)), # All endpoints prefixed with /api/
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# --- ADMIN PANEL CUSTOMIZATION ---
admin.site.site_header = "Keval Print Admin"     # Top of the login page & dashboard
admin.site.site_title = "Keval Portal"           # Browser tab title
admin.site.index_title = "Welcome to Keval CMS"  # Subtitle on the dashboard