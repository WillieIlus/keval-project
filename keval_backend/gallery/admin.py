from django.contrib import admin
from django.utils.html import format_html
import nested_admin  # robust nesting
from .models import ServiceCategory, Project, ProjectImage

class ProjectImageInline(nested_admin.NestedTabularInline):
    model = ProjectImage
    extra = 1
    sortable_field_name = "order"
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.image.url)
        return ""

class ProjectInline(nested_admin.NestedStackedInline):
    model = Project
    extra = 0
    inlines = [ProjectImageInline] # Nesting images inside project

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(nested_admin.NestedModelAdmin):
    list_display = ['name', 'parent'] #, 'slug']
    # prepopulated_fields = {'slug': ('name',)}
    inlines = [ProjectInline] # Nesting projects inside category

@admin.register(Project)
class ProjectAdmin(nested_admin.NestedModelAdmin):
    # This allows you to edit Projects independently if you don't want to go through Category
    list_display = ['title', 'category', 'is_featured', 'created_at']
    list_filter = ['category', 'is_featured']
    search_fields = ['title', 'description']
    inlines = [ProjectImageInline]