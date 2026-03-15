from django.contrib import admin
from django.utils.html import format_html
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'logo_preview', 'project_type', 'order']
    list_editable = ['order']
    search_fields = ['name']
    fieldsets = (
        (None, {'fields': ('name', 'logo', 'website')}),
        ('Details', {'fields': ('description', 'project_type'), 'classes': ('collapse',)}),
        ('Display', {'fields': ('is_featured', 'order')}),
    )
    
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 50px;" />', obj.logo.url)
        return "-"