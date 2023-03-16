from django.http import JsonResponse
from siwe_auth.models import Nonce
from siwe_auth.views import _scrub_nonce

from rest_framework.decorators import permission_classes as view_permission_classes
from rest_framework.permissions import AllowAny

from ratelimit.decorators import ratelimit

from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie

from datetime import datetime, timedelta

import secrets
import pytz

# Overriding the django-siwe package's nonce view is necessary because it does not send the CSRF cookie in it's response.
# Without a CSRF cookie then we have no way to ensure authentication in future requests.
@ratelimit(key='ip', rate='5/m')
@require_http_methods(["GET"])
@view_permission_classes([AllowAny])
@ensure_csrf_cookie
def get_nonce(request):
    now = datetime.now(tz=pytz.UTC)

    _scrub_nonce()
    n = Nonce(value=secrets.token_hex(12), expiration=now + timedelta(hours=12))
    n.save()

    return JsonResponse({"nonce": n.value})