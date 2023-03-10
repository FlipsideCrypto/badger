from djangochannelsrestframework import permissions
from djangochannelsrestframework.observer import model_observer

from django.db.models import Q

from api.mixins import ManagedModelMixin
from api.permissions import CanManageOrganization

from .models import Organization
from .serializers import OrganizationSerializer

class WrappedCanManageOrganization(permissions.WrappedDRFPermission):
    def has_permission(self, request, view):
        print('has_permission')
        return CanManageOrganization().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        print('in here')
        return CanManageOrganization().has_object_permission(request, view, obj)

class OrganizationConsumer(ManagedModelMixin):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    permissions = (permissions.IsAuthenticated)

    # TODO: Make it to where staff users can see all organizations.

    def get_queryset(self, **kwargs):
        query = (
            Q(owner=self.scope['user']) | 
            Q(delegates=self.scope['user'])
        )

        return  self.queryset.filter(query).distinct()

    @model_observer(Organization)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=OrganizationSerializer(instance=instance).data, action=action.value)