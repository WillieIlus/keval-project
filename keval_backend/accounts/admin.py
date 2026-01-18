from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from rest_framework.authtoken.models import Token

User = get_user_model()


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    """
    Custom admin for CustomUser model WITHOUT username field.
    Uses email as the primary identifier.
    """
    
    # List display
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')
    list_editable = ('is_active',)
    list_per_page = 25
    
    # Fields shown when EDITING an existing user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',),
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',),
        }),
    )
    
    # Fields shown when CREATING a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_staff', 'is_active'),
        }),
    )


# --- TOKEN ADMIN ---
try:
    admin.site.unregister(Token)
except admin.sites.NotRegistered:
    pass


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    """
    Enhanced Token admin for API authentication management.
    """
    list_display = ('short_key', 'user', 'user_email', 'created', 'revoke_button')
    list_filter = ('created',)
    search_fields = ('user__email', 'key')
    readonly_fields = ('key', 'created')
    ordering = ('-created',)
    date_hierarchy = 'created'
    
    def short_key(self, obj):
        """Show only first/last few characters of token for security."""
        return f"{obj.key[:8]}...{obj.key[-4:]}"
    short_key.short_description = 'Token Key'
    
    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = 'Email'
    user_email.admin_order_field = 'user__email'
    
    def revoke_button(self, obj):
        return format_html(
            '<a class="button" href="/admin/authtoken/token/{}/delete/" '
            'style="background: #dc3545; color: white; padding: 5px 10px; '
            'border-radius: 4px; text-decoration: none; font-size: 11px;">Revoke</a>',
            obj.pk
        )
    revoke_button.short_description = 'Actions'
    revoke_button.allow_tags = True
    
    def has_add_permission(self, request):
        return False  # Tokens created via API
    
    def has_change_permission(self, request, obj=None):
        return False  # Tokens shouldn't be edited