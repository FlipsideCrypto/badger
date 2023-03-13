from rest_framework import viewsets

from .models import Module

from .serializers import ModuleSerializer

class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer