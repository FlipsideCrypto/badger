from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets

from .models import Org
from .serializers import OrgSerializer

class OrgViewSet(viewsets.ModelViewSet):
    queryset = Org.objects.all()
    serializer_class = OrgSerializer

    def new_set(request):
        if request.method != 'POST':
            return JsonResponse({'success': False})

        ## upload image to ipfs
        ## build contract uri
        ## upload contract uri to ipfs
        ## build response
            # contract uri hash
            # cleaned and formatted description?