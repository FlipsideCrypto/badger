import dj_database_url

from .base import *

import django_heroku
django_heroku.settings(locals())

# Handling hosting / intitialization values
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

DEBUG_PROPAGATE_EXCEPTIONS = True
PROPAGATE_EXCEPTIONS = True

X_FRAME_OPTIONS = "DENY"

CORS_ORIGIN_ALLOW_ALL = True
CSRF_TRUSTED_ORIGINS = ["https://badger.utc24.io"]

CSRF_COOKIE_DOMAIN = ".badger.utc24.io"
SESSION_COOKIE_DOMAIN = ".badger.utc24.io"

ALLOWED_HOSTS = ['*']

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
db_from_env = dj_database_url.config(conn_max_age=500, ssl_require=False)
DATABASES["default"].update(db_from_env)