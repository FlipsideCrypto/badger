from djangochannelsrestframework.observer import model_observer

from django.db.models import Q

from api.mixins import ManagedModelMixin

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationConsumer(ManagedModelMixin):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    @model_observer(Organization)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=OrganizationSerializer(instance=instance).data, action=action.value)