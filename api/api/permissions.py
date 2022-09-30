from rest_framework import permissions
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    AllowAny,
)

def generator(existing_permissions=None):
    permission_classes = [AllowAny]
    # permission_classes =  [IsAuthenticatedOrReadOnly]
    # if self.action != 'create':
    #     permission_classes += [IsAuthenticated, IsLeaderOrAdmin]

    if existing_permissions:
        permission_classes += existing_permissions

    return permission_classes

class IsLeaderOrAdmin(permissions.BasePermission):
    # request user is owner of the organization object or a delgate or an admin
    pass
    # def has_object_permission(self, request, view, obj):
        # return True
        # if request.user == obj.leader or request.user in obj.delegates.all() or request.user.is_staff:
        #     return True
        # return False