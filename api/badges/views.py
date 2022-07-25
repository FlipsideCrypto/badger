import json
from multiprocessing import dummy

from venv import create
from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action

from tempfile import NamedTemporaryFile
from pinatapy import PinataPy

from .models import BadgeSet, Badge, User
from .serializers import BadgeSetSerializer, BadgeSerializer, UserSerializer

# pinata = PinataPy(settings.PINATA_API_KEY, settings.PINATA_API_SECRET_KEY)
pinata = PinataPy('safasfasf', settings.PINATA_API_SECRET_KEY)

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

    ## TODO: Clean description -- add line breaks if necessary
    @action(methods=['post'], detail=False)
    def ipfs_pin(self, request):
        set_name = request.data.get('set_name')
        set_desc = request.data.get('set_desc')
        set_img = request.data.get('set_img')
        badge_imgs = request.data.getlist('badge_imgs')
        
        max_file_size = 20000000 # 20MB
        
        print(set_desc)
        ## TODO: does the \r\n\r\n work in the uri?
        # set_desc = set_desc.replace('\r\n\r\n', '\\n')
        # print('replaced set_desc', set_desc)

        dummy_response = {
            'success':True, 
            'set_hash': 'asfasf', 
            'set_img_hash': 'asfasf', 
            'badge_img_hashes': ['1', '2', '3'],
            'deployment_args': ['233113', set_desc]
        }
        return JsonResponse(dummy_response)
        
        
        try:
            if set_img.size > max_file_size:
                raise Exception('File {imgName} too large. Max {max_file_size / 1000000}MB')

            # pin contract image
            img_pin_response = pin_image(set_img, set_img.name)
            if img_pin_response['status']:
                error_msg = json.loads(img_pin_response['text'])
                error_msg = error_msg['error']['details']
                raise Exception(error_msg)

            set_img_hash = img_pin_response['IpfsHash']

            contract_uri = {
                "name": set_name,
                "description": set_desc,
                "image": f'https://badger.mypinata.cloud/ipfs/{set_img_hash}'
            }

            # pin contract uri
            uri_pin_response = pinata.pin_json_to_ipfs(contract_uri, options={'pinataMetadata': {'name': f'{set_name}-contracturi'}})
            if uri_pin_response['status']:
                error_msg = json.loads(uri_pin_response['text'])
                error_msg = error_msg['error']['details']
                raise Exception(error_msg)
            contract_uri_hash = uri_pin_response['IpfsHash']

            # Pin all badge images
            badge_img_hashes = []
            for image in badge_imgs:
                if image.size > max_file_size:
                    raise Exception('File {imgName} too large. Max {max_file_size / 1000000}MB')
                
                img_pin_response = pin_image(image, image.name)
                if img_pin_response['status']:
                    error_msg = json.loads(img_pin_response['text'])
                    error_msg = error_msg['error']['details']
                    raise Exception(error_msg)
                badge_img_hashes.push(img_pin_response['IpfsHash'])

        except Exception as error:
            return JsonResponse({'success': False, 'error': str(error)})

        response = {
            'success': True, 
            'set_hash': contract_uri_hash, 
            'set_img_hash': set_img_hash, 
            'badge_img_hashes': badge_img_hashes,
            'deployment_args': [contract_uri_hash, set_desc]
        }

        return JsonResponse(response)
    
    @action(methods=["post"], detail=False)
    def new_set(self, request):
        # set_name = request.data.get("set_name", None)
        # set_desc = request.data.get("set_desc", None)
        # set_img_hash = request.data.get("set_img_hash", None)
        # set_contract_address = request.data.get("set_contract_address", None)
        # set_creator = request.data.get("set_creator", None)
        # set_contract_uri_hash = request.data.get("set_contract_uri_hash", None)
        # chain = request.data.get("chain", None)
        badges_data = request.data.get("badges_data", None)

        set_data = {
            'name': request.data.get("set_name", None),
            'description': request.data.get("set_desc", None),
            'image_hash': request.data.get("set_img_hash", None),
            'contract_address': request.data.get("set_contract_address", None),
            'creator_address': request.data.get("set_creator", None),
            'contract_uri_hash': request.data.get("set_contract_uri_hash", None),
            'chain': request.data.get("chain", None),
            'created_at': timezone.now()
        }


        try:
            badges_data = json.loads(badges_data)
            badge_serializer = BadgeSerializer(data=badges_data, many=True)
            badge_serializer.is_valid(raise_exception=True)
            set_data['badges'] = badge_serializer.data

            print(set_data)
            set_serializer = self.get_serializer(data=set_data)
            set_serializer.is_valid(raise_exception=True)

            # for badge in badge_serializer.data:
            #     print(badge)
            #     set_serializer.badges.add(badge)
            badgeSet = set_serializer.save()
            # badge_serializer.save()
            # badgeSetObj = BadgeSet(
            #     name=set_name,
            #     description=set_desc,
            #     creator_address=set_creator,
            #     contract_address=set_contract_address,
            #     image_hash=set_img_hash,
            #     contract_uri_hash=set_contract_uri_hash,
            #     chain=chain,
            #     created_at=timezone.now()
            # )
            # badgeSetObj.save()

            # serializer.is_valid(raise_exception=True)
            # if serializer.is_valid():
            #     serializer.save()
            # for badge in badges_data:
            #     print(badge)
            #     badgeObj = Badge(
            #         name=badge.name,
            #         description=badge.desc,
            #         token_id=badge.token_id,
            #         image_hash=badge.img_hash,
            #         parent_address=set_contract_address,
            #         created_at=timezone.now()
            #     )
            #     badgeObj.save()

        except Exception as error:
            return JsonResponse({'success': False, 'error': str(error)})

        return JsonResponse({'success': True})

    @action(methods=["post"], detail=False)
    def new_badges(self, request):
        badge_data = request.data.getlist('badge_imgs')
        set_address = request.data.get('set_address')

        print(badge_data, set_address)

        try:
            # badge_set = self.get_queryset().filter(contract_address=set_address)
            for badge in badge_data:
                badgeObj = Badge(
                    name=badge.name,
                    description=badge.desc,
                    token_id=badge.token_id,
                    image_hash=badge.img_hash,
                    parent_address=set_address,
                    created_at=timezone.now()
                )
                badgeObj.save()

        except Exception as error:
            return JsonResponse({'success': False, 'error': error})


        return JsonResponse({'success': True})

class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = (AllowAny,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    
def pin_image(imageFile, imageName):
    suffix = imageName.split('.').pop()

    with NamedTemporaryFile(suffix=f".{suffix}", delete=True) as temp_file:
        # convert uploaded file to temp file in order to upload.
        temp_file.write(imageFile.read())
        pin_response = pinata.pin_file_to_ipfs(temp_file.name, '', save_absolute_paths=False)

    print('Pin Response', pin_response)
    return pin_response
