from django.contrib import admin
from django.utils.html import format_html
from .models import Banner, CoreValue, WhyChooseUs, ContactSubmission, TeamMember

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'banner_preview', 'is_active', 'order', 'created_at']
    list_editable = ['is_active', 'order']
    list_filter = ['is_active']
    ordering = ['order', '-created_at']
    
    def banner_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; border-radius: 4px;" />', obj.image.url)
        return "-"

@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon_preview', 'order']
    list_editable = ['order']
    
    def icon_preview(self, obj):
        if obj.icon:
            return format_html('<img src="{}" style="height: 30px;" />', obj.icon.url)
        return "-"

@admin.register(WhyChooseUs)
class WhyChooseUsAdmin(admin.ModelAdmin):
    list_display = ['title', 'order']
    list_editable = ['order']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'department', 'order', 'is_active', 'image_preview')
    list_editable = ('order', 'is_active', 'department')
    list_filter = ('department', 'is_active')
    search_fields = ('name', 'title', 'bio')

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 45px; height:45px; border-radius: 50%; object-fit: cover;" />', obj.image.url)
        return "No Image"
    
    image_preview.short_description = 'Photo'

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'service_interest', 'email', 'submitted_at', 'is_read']
    list_filter = ['is_read', 'service_interest', 'submitted_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['submitted_at']
    actions = ['mark_as_read']

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as Read"