from django.shortcuts import render

from rest_framework import viewsets

from .models import Org
from .serializers import OrgSerializer

class OrgViewSet(viewsets.ModelViewSet):
    queryset = Org.objects.all()
    serializer_class = OrgSerializer