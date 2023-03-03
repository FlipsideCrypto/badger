from rest_framework import permissions
from rest_framework.permissions import (
    IsAuthenticated
)

def generator(existing_permissions=None):
    permission_classes = [IsAuthenticated]

    if existing_permissions:
        permission_classes += existing_permissions

    return [permission() for permission in permission_classes]


class CanManageWallet(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj == request.user
            or request.user.is_staff
        )


class CanManageOrganization(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            obj.owner == request.user
            or request.user in obj.delegates.all()
            or request.user.is_staff
        )


class CanManageBadge(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        print('checking if can manage badge')

        organization = obj.organization
        return (
            organization.owner == request.user
            or request.user in organization.delegates.all()
            or request.user in obj.delegates.all()
            or request.user.is_staff
        )
