from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.id)
        
        return bool(request.user and request.user.is_superuser)
    
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.id)
        
        return obj == request.user or bool(request.user and request.user.is_superuser)
    
class AllAccess(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return bool(request.user and request.user.id)
        
        return True

