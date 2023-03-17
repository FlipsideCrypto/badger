import base64
import django
import random

from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Badge
from .serializers import BadgeSerializer

User = get_user_model()

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer

class ArtViewSet(viewsets.ViewSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.colors = [
            "#f06",
            "#00FF9D",
            "#00FFEB",
            "#FFBB00",
            "#C668B9",
            "#B823AF",
            "#551CCD",
            "#1330dd",
            "#0fd3b2",
            "#30E64C",
            "#5540EA",
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

    def _handle_fingerprint(self, address, badge_name):
        fingerprint = []

        for char in f"{address}{badge_name}":
            fingerprint.append(self._encode(char))

        return fingerprint
    
    def _handle_line(self, lines, word):
        if len(word) > 12:
            for i in range(0, len(word), 12):
                connector = "-" if i + 12 < len(word) else ""
                lines.append(word[i:i + 12] + connector)
        else:
            lines.append(word)

        return lines

    @action(
        detail=False, 
        methods=['get'], 
        url_name='pfp',
        url_path='pfp/(?P<char>[a-zA-Z]+)?/(?P<ethereum_address>[a-zA-Z0-9]+)'
    )
    def pfp_art(self, request, **kwargs):
        char = kwargs.get('char', None)
        address = kwargs.get('ethereum_address', None)

        if char == "null": char = None

        fill = "#fff"

        size = 500

        if address:
            random.seed(f"{address}{char}")

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

        text = "" if not char else f"""
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="250" fill="#000" font-family="'Poppins', sans-serif">
                {char[0].upper()}
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
                <rect width="100%" height="100%" fill="{fill}" opacity="{0.55 if fill == "#fff" else 0.75}" />
                {text}
            </svg>
        """

        image = base64.b64encode(svg.encode('utf-8')).decode('utf-8')

        url_ready_base64 = f"data:image/svg+xml;base64,{image}"

        return Response({
            "image": url_ready_base64,
        })

    @action(
        detail=False, 
        methods=['get'], 
        url_name='badge',
        url_path="pfp/(?P<organization_name>[\w\-\.\ ]+)/(?P<ethereum_address>[\w\-\.\ ]+)/(?P<badge_name>[\w\-\.\ ]+)"
    )
    def badge_art(self, request, **kwargs):
        organization = kwargs.get('organization_name', None)
        address = kwargs.get('ethereum_address', None)
        badge_name = kwargs.get('badge_name', None)

        invert = request.query_params.get('inverse', False)

        fingerprint = self._handle_fingerprint(address, badge_name)

        todays_date = django.utils.timezone.now().strftime("%Y-%m-%d")

        if address:
            random.seed(f"{todays_date}{organization}{address}{'1' if invert else '0'}")

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
            # determine if the last line already has 14 characters
            lineLength = (len(lines[-1]) if len(lines) > 0 else 0) + len(word) + (1 if len(lines) > 0 else 0) 
                          
            newLine = len(lines) > 0 and lineLength > 14

            if newLine:
                self._handle_line(lines, word)
            else:
                if len(lines) > 0:
                    lines[-1] += " " + word
                else:
                    self._handle_line(lines, word)

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
            <rect width="100%" height="100%" fill="{fill}" opacity="{0.55 if fill == "#fff" else 0.75}" />

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
