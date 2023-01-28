from djangochannelsrestframework import permissions
from djangochannelsrestframework.observer import model_observer

from api.mixins import ManagedModelMixin
from api.permissions import CanManageBadge

from .models import Badge
from .serializers import BadgeSerializer

class WrappedCanManageBadge(permissions.WrappedDRFPermission):
    def has_object_permission(self, request, view, obj):
        return CanManageBadge().has_object_permission(request, view, obj)

class BadgeConsumer(ManagedModelMixin):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    permissions = (permissions.IsAuthenticated, CanManageBadge)

    @model_observer(Badge)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=BadgeSerializer(instance=instance).data, action=action.value)