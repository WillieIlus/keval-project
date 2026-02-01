from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from core.views import (
    BannerListView, BannerDetailView,
    CoreValueListView, CoreValueDetailView,
    WhyChooseUsListView, WhyChooseUsDetailView,
    TeamMemberListView, TeamMemberDetailView,
    ContactSubmissionCreateView
)
from clients.views import ClientListView, ClientDetailView
from testimonials.views import TestimonialListView, TestimonialDetailView
from gallery.views import (
    CategoryListView, ProjectDetailView, ProjectListCreateView,
    ProjectAdminListCreateView, ProjectAdminDetailView,
    ProjectImageListCreateView, ProjectImageDetailView, ProjectImageAdminListCreateView,
    ProjectMultipleImageUploadView
)
from accounts.views import CustomLoginView, RegisterView

# API URL patterns
api_patterns = [
    # Core / Marketing
    path('banners/', BannerListView.as_view(), name='banner-list'),
    path('banners/<int:pk>/', BannerDetailView.as_view(), name='banner-detail'),
    path('values/', CoreValueListView.as_view(), name='values-list'),
    path('values/<int:pk>/', CoreValueDetailView.as_view(), name='values-detail'),
    path('why-choose-us/', WhyChooseUsListView.as_view(), name='why-choose-us'),
    path('why-choose-us/<int:pk>/', WhyChooseUsDetailView.as_view(), name='why-choose-us-detail'),
    path('team/', TeamMemberListView.as_view(), name='team-list'),
    path('team/<int:pk>/', TeamMemberDetailView.as_view(), name='team-detail'),
    path('contact/', ContactSubmissionCreateView.as_view(), name='contact-submit'),
    
    # Social Proof
    path('clients/', ClientListView.as_view(), name='client-list'),
    path('clients/<int:pk>/', ClientDetailView.as_view(), name='client-detail'),
    path('testimonials/', TestimonialListView.as_view(), name='testimonial-list'),
    path('testimonials/<int:pk>/', TestimonialDetailView.as_view(), name='testimonial-detail'),

    # Portfolio / Gallery
    path('portfolio/categories/', CategoryListView.as_view(), name='category-list'),
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('portfolio/projects/', ProjectAdminListCreateView.as_view(), name='project-admin-list-create'),
    path('portfolio/projects/<int:pk>/', ProjectAdminDetailView.as_view(), name='project-admin-detail'),
    path('portfolio/project/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
    path('portfolio/project-images/', ProjectImageAdminListCreateView.as_view(), name='project-image-admin-list-create'),
    path('portfolio/project-images/<int:pk>/', ProjectImageDetailView.as_view(), name='project-image-detail'),
    path('portfolio/projects/<int:project_id>/images/', ProjectImageListCreateView.as_view(), name='project-image-list-create'),
    path('portfolio/projects/<int:project_id>/images/bulk/', ProjectMultipleImageUploadView.as_view(), name='project-image-bulk-upload'),

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