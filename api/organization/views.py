from rest_framework import viewsets

from api.permissions import generator

from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    # permission_classes = []
    # def get_permissions(self): 
    #     return generator(self.permission_classes) 

