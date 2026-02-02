from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsSuperuserOrReadOnly(BasePermission):
    """
    Only superusers can create/update/delete.
    Anyone can read (GET, HEAD, OPTIONS).
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.is_superuser


class IsSuperuser(BasePermission):
    """
    Only superusers have access.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_superuser


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Authenticated users can do anything.
    Unauthenticated users can only read.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated


class CanManageTestimonials(BasePermission):
    """
    Any authenticated user can manage testimonials.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
