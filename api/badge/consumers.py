from djangochannelsrestframework.observer import model_observer

from api.mixins import ManagedModelMixin

from .models import Badge
from .serializers import BadgeSerializer

class BadgeConsumer(ManagedModelMixin):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    @model_observer(Badge)
    async def model_change(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @model_change.serializer
    def model_serialize(self, instance, action, **kwargs):
        return dict(data=BadgeSerializer(instance=instance).data, action=action.value)