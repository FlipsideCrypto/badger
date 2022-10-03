from rest_framework import permissions
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly
)

def generator(existing_permissions=None):
    permission_classes = [IsAuthenticatedOrReadOnly]
    # if self.action != 'create':
    #     permission_classes += [IsAuthenticated, IsLeaderOrAdmin]

    if existing_permissions:
        permission_classes += existing_permissions

    return [permission() for permission in permission_classes]

class CanManageWallet(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff

class IsMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            False

        return request.user in obj.users.all()

class IsLeaderOrAdmin(permissions.BasePermission):
    # request user is owner of the organization object or a delgate or an admin
    def has_object_permission(self, request, view, obj):
        # if the user isn't authenticated
        if not request.user.is_authenticated:
            return False

        # if the user doesnt have permission to manage it
        if request.user.leader_of(obj) or request.user.is_staff:
            return True
        return False

class IsMemberOrLeaderOrAdmin(permissions.BasePermission):
    # request user is owner of the organization object or a delgate or an admin
    def has_object_permission(self, request, view, obj):
        # if the user isn't authenticated
        if not request.user.is_authenticated:
            return False

        # if the user doesnt have permission to manage it
        if request.user.leader_of(obj) or request.user.is_staff or request.user in obj.users.all():
            return True
        return False