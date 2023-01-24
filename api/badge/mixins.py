import datetime
import uuid

from djangochannelsrestframework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
)
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer

class SerializerRepresentationMixin:
    # convert all datetimes to strings
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        for field in ret:
            if isinstance(ret[field], datetime.datetime):
                ret[field] = ret[field].isoformat()
            if isinstance(ret[field], uuid.UUID):
                ret[field] = str(ret[field])

        return ret

class ConnectedMixin:
    async def connect(self, *args, **kwargs):
        await super().connect(*args, **kwargs)
        await self.send_json({
            'action': 'connected',
        })

class ManagedModelMixin(
    ConnectedMixin,
    ListModelMixin,
    RetrieveModelMixin,
    PatchModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DeleteModelMixin,
    GenericAsyncAPIConsumer
):
    async def connect(self, **kwargs):
        await self.model_change.subscribe()
        await super().connect()