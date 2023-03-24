from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import model_observer

from channels.db import database_sync_to_async

from django.db.models import Q

from api.mixins import ManagedModelMixin

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationConsumer(ManagedModelMixin):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get_queryset(self, **kwargs):
        if kwargs.get('action') == 'retrieve':
            return Organization.objects.all()

        if not 'query_string' in self.scope:
            return Organization.objects.all()

        query_string = self.scope['query_string'].decode('utf-8')

        if not "address=" in query_string:
            return Organization.objects.all()

        address = query_string.split('=')[1]

        return Organization.objects.filter(
            Q(owner__ethereum_address=address) |
            Q(modules__ethereum_address__in=[address]) |
            Q(badges__users__ethereum_address__in=[address])
        ).distinct()

    @model_observer(Organization)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=OrganizationSerializer(instance=instance).data, action=action.value)