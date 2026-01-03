from django.contrib import admin
from django.utils.html import format_html
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company', 'rating_stars', 'is_active', 'created_at']
    list_filter = ['rating', 'is_active', 'created_at']
    search_fields = ['client_name', 'company', 'content']
    list_editable = ['is_active']
    readonly_fields = ['created_at']

    def rating_stars(self, obj):
        # [cite_start]Visual representation of the rating (e.g., ★★★★★) [cite: 23]
        return "★" * obj.rating
    rating_stars.short_description = "Rating"

    fieldsets = (
        ("Client Details", {
            'fields': ('client_name', 'company', 'position', 'avatar')
        }),
        ("Review Content", {
            'fields': ('content', 'rating', 'is_active')
        }),
        ("Meta", {
            'fields': ('created_at',)
        }),
    )