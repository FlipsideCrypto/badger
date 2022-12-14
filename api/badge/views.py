import base64
import random

from django.contrib.auth import get_user_model

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import Response

from api.permissions import generator, CanManageBadge

from organization.models import Organization

from .models import Badge
from .serializers import BadgeSerializer

User = get_user_model()


class ArtViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated] 

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.colors = [
            "#f06",
            "#00FF9D",
            "#00FFEB",
            "#FF00EB",
            "#FFBB00",
            "#C668B9",
            "#B823AF",
            "#551CCD",
            "#1330dd",
            "#0fd3b2",
            "#30E64C",
            "#5540EA",
            "#F19021"
        ]

    def _encode(self, value):
        max_smudge = 8
        smudge = 0

        if value.isdigit():
            smudge = int(value)
        elif value.islower():
            smudge = ord(value) - 87
        elif value.isupper():
            smudge = ord(value) - 29

        return [
            1 + smudge % max_smudge,
            smudge % 2 == 0,
        ]

    def _handle_fingerprint(self, address, badge_id):
        fingerprint = []

        for char in f"{address}{badge_id}":
            fingerprint.append(self._encode(char))

        return fingerprint

    @action(detail=False, methods=['get'], url_path='pfp', url_name='pfp')
    def pfp_art(self, request):
        char = request.query_params.get('char', None)
        address = request.query_params.get('address', None)

        fill = "#fff"

        size = 500

        blob_count = random.randint(2, 4)
        blob, useblob = "", ""

        # set seed of random
        if address:
            random.seed(address)

        # rotate blob position animation
        for i in range(blob_count):
            x_random = random.randint(0, size)
            y_random = random.randint(0, size)

            # create random svg blog
            x_random_rotation = random.randint(0, 360)
            y_random_rotation = random.randint(0, 360)  

            random_color = random.choice(self.colors)

            animation_from = f"0 {x_random} {y_random}"
            animation_to = f"360 {x_random} {y_random}"

            # random direction of rotation
            if random.randint(0, 1) == 0:
                animation_from = f"360 {x_random_rotation} {y_random_rotation}"
                animation_to = f"0 {x_random_rotation} {y_random_rotation}"

            rotate_blob_animation = f"""
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="{animation_from}"
                    to="{animation_to}"
                    dur="{random.randint(20,45)}s"
                    repeatCount="indefinite"
                />
            """

            blob += f"""
                <path 
                    id="{"blob-%s" % i}" 
                    d="M363.37-8.441c51.956,46.825,91.084,111.61,83.386,168.376S384.537,266.093,332.581,290.147C280.945,313.88,231.555,312.6,176.712,318.37s-115.458,18.6-168.7-5.452-98.781-84.669-89.48-135.984S-8.021,83.284,45.218,36.459C98.137-10.365,140.471-62.321,193.71-73.547S311.734-55.586,363.37-8.441Z" 
                    transform="translate({x_random} {y_random})" 
                    fill="{random_color}"
                    style="mix-blend-mode: multiply;"
                >
                    {rotate_blob_animation}
                </path>
            """

            useblob += f"""
                <use href="#{"blob-%s" % i}" filter="url(#blur)" />
            """

        text = ""
        if char:
            text = f"""
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="250" fill="#000" font-family="'Poppins', sans-serif">
                    {char[0]}
                </text>
            """

        svg = f"""
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" >
                <rect width="100%" height="100%" fill="#fff" />

                {blob}
                <rect width="100%" height="100%" fill="{fill}" />
                <filter id="blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
                </filter>
                {useblob}
                <rect width="100%" height="100%" fill="{fill}" opacity="{0.93 if fill == "#fff" else 0.75}" />
 
                {text}
            </svg>
        """

        # return base64 encoded svg
        image = base64.b64encode(svg.encode('utf-8')).decode('utf-8')

        url_ready_base64 = f"data:image/svg+xml;base64,{image}"

        return Response({
            "image": url_ready_base64,
        })


    # create a custom action for badge art
    @action(detail=False, methods=['get'], url_path='badge', url_name='badge')
    def badge_art(self, request, pk=None):
        organization = request.query_params.get('organization', None)
        organization_ethereum_address = request.query_params.get(
            'organization_ethereum_address', None)
        badge_name = request.query_params.get('badge_name', None)
        invert = request.query_params.get('inverse', False)

        fingerprint = self._handle_fingerprint(
            organization_ethereum_address, badge_name)

        fill = "#fff"
        if invert:
            fill = "#000"

        size = 500

        blob_count = random.randint(2, 4)
        blob, useblob = "", ""

        # rotate blob position animation
        for i in range(blob_count):
            x_random = random.randint(0, size)
            y_random = random.randint(0, size)

            # create random svg blog
            x_random_rotation = random.randint(0, 360)
            y_random_rotation = random.randint(0, 360)  

            random_color = random.choice(self.colors)

            animation_from = f"0 {x_random} {y_random}"
            animation_to = f"360 {x_random} {y_random}"

            # random direction of rotation
            if random.randint(0, 1) == 0:
                animation_from = f"360 {x_random_rotation} {y_random_rotation}"
                animation_to = f"0 {x_random_rotation} {y_random_rotation}"

            rotate_blob_animation = f"""
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="{animation_from}"
                    to="{animation_to}"
                    dur="{random.randint(20,45)}s"
                    repeatCount="indefinite"
                />
            """

            blob += f"""
                <path 
                    id="{"blob-%s" % i}" 
                    d="M363.37-8.441c51.956,46.825,91.084,111.61,83.386,168.376S384.537,266.093,332.581,290.147C280.945,313.88,231.555,312.6,176.712,318.37s-115.458,18.6-168.7-5.452-98.781-84.669-89.48-135.984S-8.021,83.284,45.218,36.459C98.137-10.365,140.471-62.321,193.71-73.547S311.734-55.586,363.37-8.441Z" 
                    transform="translate({x_random} {y_random})" 
                    fill="{random_color}"
                    style="mix-blend-mode: multiply;"
                >
                    {rotate_blob_animation}
                </path>
            """

            useblob += f"""
                <use href="#{"blob-%s" % i}" filter="url(#blur)" />
            """

        fingerprint_svg = ""
        r = 2
        spacer = (size - (r * 2 * len(fingerprint))) / (len(fingerprint) - 1)
        width = (r * 2 + spacer) * len(fingerprint)
        buffer = (size - width) / 2

        for xi, item in enumerate(fingerprint):
            x = buffer + (r * 2 + spacer) * xi
            height = item[0]

            for i in range(height):
                y = size - r * (height - i) * 5
                circle_fill = "#fff" if fill == "#000" else "#000"                

                fingerprint_svg += f"""
                    <circle
                        cx="{x}"
                        cy="{y}"
                        r="{r if not item[1] else r * 1.5}"
                        fill="{circle_fill}"
                    ></circle>
                """

        words = badge_name.split(" ")
        lines = []

        for word in words:
            if len(word) > 14:
                for i in range(0, len(word), 14):
                    lines.append(word[i:i + 14])
            else:
                lines.append(word)

        text_color = "#000" if fill == "#fff" else "#fff"

        # create a line for each word
        badge_text = ""
        line_height = 52
        organization_line_height=30
        if len(lines) > 3:
            line_height = 40
            organization_line_height=28

        line_buffer = 10
        line_x = 50
        line_y = (size - (line_height) * len(lines) - line_buffer * (len(lines) - 1)) / 2
        organization_y = 65

        if len(lines) > 3:
            line_y -= 40
            organization_y += 5

        for i, line in enumerate(lines):
            badge_text += f"""
                <text
                    x="{line_x}"
                    y="{line_y + (line_height + line_buffer) * i}"
                    font-size="{line_height}"
                    fill="{text_color}"
                    font-family="'Poppins', sans-serif"
                    font-weight="bold"
                >
                    {line.upper()}
                </text>
            """

        organization_text = f"""
            <text
                x="50px"
                y="{organization_y}%"
                dominant-baseline="middle"
                font-size="{organization_line_height}"
                fill="{text_color}"
                font-family="'Poppins', sans-serif"
                opacity=".45"
            >
                {organization}
            </text>
        """

        svg = f"""
        <svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewbox="0 0 {size} {size}">
            <rect width="100%" height="100%" fill="#fff" />

            {blob}
            <rect width="100%" height="100%" fill="{fill}" />
            <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>
            {useblob}
            <rect width="100%" height="100%" fill="{fill}" opacity="{0.93 if fill == "#fff" else 0.75}" />

            {fingerprint_svg}

            {badge_text}

            {organization_text}
        </svg>
        """

        # return base64 encoded svg
        image = base64.b64encode(svg.encode('utf-8')).decode('utf-8')

        url_ready_base64 = f"data:image/svg+xml;base64,{image}"

        return Response({
            "image": url_ready_base64,
        })


class BadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        permission_classes = []
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes += [CanManageBadge]

        return generator(self.permission_classes + permission_classes)

    def _handle_users(self, users_data):
        users = []
        for user_data in users_data:
            if not User.objects.filter(ethereum_address=user_data['ethereum_address']).exists():
                user = User.objects.create_user(
                    ethereum_address=user_data['ethereum_address'])
            else:
                user = User.objects.get(
                    ethereum_address=user_data['ethereum_address'])
            users.append(user)
        return users

    def _handle_user_creation(self, users, queryset):
        # Clear the active set of users, whatever they may be.
        queryset.clear()

        if users is not None:
            # Build the new data for the users
            users = self._handle_users(users)
            for user in users:
                queryset.add(user)

    # on create handle the badge creation and add it to .badges of the organization it is being added to
    def create(self, request, *args, **kwargs):
        # get the organization
        organization = Organization.objects.get(
            pk=request.data['organization'])

        # confirm the requesting user is the owner or delegate of the organization
        if not (request.user.is_staff or request.user == organization.owner or request.user in organization.delegates.all()):
            return Response(status=status.HTTP_403_FORBIDDEN)

        # remove the users from the request data
        users = request.data.pop('users', None)
        delegates = request.data.pop('delegates', None)

        # create the badge
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        # add the badge to the organization
        organization.badges.add(serializer.instance)

        # save the organization
        organization.save()

        self._handle_user_creation(users, serializer.instance.users)
        self._handle_user_creation(delegates, serializer.instance.delegates)

        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # remove the users from the request data
        users = request.data.pop('users', None)
        delegates = request.data.pop('delegates', None)

        # update the badge
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # do the normal update
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        self._handle_user_creation(users, serializer.instance.users)
        self._handle_user_creation(delegates, serializer.instance.delegates)

        return Response(serializer.data)
