import dj_database_url

from .base import *

import django_heroku
django_heroku.settings(locals())

# Handling hosting / intitialization values
# Request settings
CSRF_COOKIE_SECURE = False
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = [
    'https://*.utc24.io', 
    'https://badger.utc24.io', 
    'https://api.badger.utc24.io'
]

CSRF_COOKIE_DOMAIN = ".badger.utc24.io"
SESSION_COOKIE_DOMAIN = ".badger.utc24.io"
CSRF_TRUSTED_ORIGINS = ".badger.utc24.io"

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