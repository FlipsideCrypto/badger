from venv import create
from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action

from tempfile import NamedTemporaryFile
from pinatapy import PinataPy

from .models import BadgeSet, Badge
from .serializers import BadgeSetSerializer, BadgeSerializer

pinata = PinataPy(settings.PINATA_API_KEY, settings.PINATA_API_SECRET_KEY)

class BadgeSetViewSet(viewsets.ModelViewSet):
    queryset = BadgeSet.objects.all()
    serializer_class = BadgeSetSerializer
    permission_classes = (AllowAny,)

    @action(methods=["get"], detail=False)
    def get_badges(self, request):
        print(request.query_params)
        contract_address = self.request.query_params.get('contract_address')
        
        badge_set = self.get_queryset().get(contract_address=contract_address)
        for badge in badge_set.badges.all():
            print(badge.image_hash)
        return JsonResponse({'success': True})

    @action(methods=["post"], detail=False)
    def new_set(self, request):

        imgFile = request.FILES.get("file", None)
        imgName = request.POST.get("fileName", None)
        setName = request.POST.get("name", None)
        setDesc = request.POST.get("desc", None)
        creator_address = request.POST.get("creator_address", None)
        chain = request.POST.get("chain", None)

        ## TODO: Clean description and add line break unicode
        
        max_file_size = 20000000 # 20MB
        if imgFile.size > max_file_size:
            return JsonResponse({'success': False, 'error':f'File {imgName} too large. Max {max_file_size / 1000000}MB'})

        ## pin collection image
        img_pin_response = pin_image(imgFile, imgName)

        ipfs_img_hash = img_pin_response['IpfsHash']
        created_at = img_pin_response['Timestamp']

        ## pin contract uri
        contract_uri = {
            "name": setName,
            "description": setDesc,
            "image": f'https://badger.mypinata.cloud/ipfs/{ipfs_img_hash}'
        }

        pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{setName}contracturi'}})
        
        contract_uri_hash = pin_response['IpfsHash']

        response = {
            'contract_uri_hash': contract_uri_hash,
            'image_hash': ipfs_img_hash,
            'description': setDesc,
            'success': True
        }

        badgeSetObj = BadgeSet(
            name=setName,
            description=setDesc,
            creator_address=creator_address,
            image_hash=ipfs_img_hash,
            created_at=created_at,
            contract_uri_hash=contract_uri_hash,
            chain=chain
        )
        badgeSetObj.save()

        return JsonResponse(response)

    @action(methods=["post"], detail=False)
    def finalize_set(self, request):
        contract_uri_hash = request.POST.get('contract_hash')
        contract_address = request.POST.get("contract_address", None)
        chain = request.POST.get("chain", None)

        badge_set = self.get_queryset().filter(contract_uri_hash=contract_uri_hash).first()

        print(badge_set)

        ## TODO: This is fuckin exploitable. What's a good way around this?
        if badge_set.contract_initialized:
            return JsonResponse({'success': False, 'message':'Contract already initialized.'})

        badge_set.contract_address = contract_address
        badge_set.contract_initialized = True
        badge_set.updated_at = timezone.now()
        badge_set.save()

        return JsonResponse({'success': True})

    @action(methods=["post"], detail=False)
    def new_badges(self, request):
        print('new badges', request.data)
        contract_address=request.POST.get("contract_address", None)
        tokenIdArr = request.POST.get("tokenId", None)
        badgeNameArr = request.POST.get("name", None)
        badgeDescArr = request.POST.get("desc", None)

        print('data:', tokenIdArr, badgeNameArr, badgeDescArr, contract_address)
        try:
            badge_set = self.get_queryset().filter(contract_address=contract_address)
            # print(badge_set.badges)
            for badge in badge_set.badges.all:
                print(badge)
        except Exception as error:
            return JsonResponse({'success': False, 'error': error})

        ## // 
        return JsonResponse({'success': True})

    @action(methods=["post"], detail=False)
    def pin_badge_image(self, request):
        imgFile = request.FILES.get("imgFile", None)
        imgName = request.POST.get("imgName", None)
        contract_address = request.POST.get("contract_address", None)

        max_file_size = 20000000 # 20MB
        if imgFile.size > max_file_size:
            return JsonResponse({'success': False, 'error':f'File {imgName} too large. Max {max_file_size / 1000000}MB'})

        try:
            pin_response = pin_image(imgFile, imgName)
            badge_set = self.get_queryset().get(contract_address=contract_address)
            token_id = badge_set.badges.count()

            badge_obj = Badge(
                image_hash=pin_response['IpfsHash'],
                token_id=token_id,
                parent_address=contract_address
            )
            badge_obj.save()
            badge_set.badges.add(badge_obj)
        except Exception as error: 
            return JsonResponse({'success': False, 'error': error})
        ## return success and the current amount of badges in set for usage
        return JsonResponse({'success': True, 'token_id': token_id, 'image_hash': pin_response['IpfsHash']})

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = (AllowAny,)


    
def pin_image(imageFile, imageName):
    suffix = imageName.split('.').pop()

    with NamedTemporaryFile(suffix=f".{suffix}", delete=True) as temp_file:
        # convert uploaded file to temp file in order to upload.
        temp_file.write(imageFile.read())
        pin_response = pinata.pin_file_to_ipfs(temp_file.name, '', save_absolute_paths=False)

    print('Pin Response', pin_response)
    return pin_response
