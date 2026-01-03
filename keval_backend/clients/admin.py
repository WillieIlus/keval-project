from django.contrib import admin
from django.utils.html import format_html
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'logo_preview', 'order'] #, 'is_active']
    list_editable = ['order', ]# 'is_active']
    search_fields = ['name']
    
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" style="max-height: 50px;" />', obj.logo.url)
        return "-"