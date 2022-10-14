import dj_database_url

from .base import *

import django_heroku
django_heroku.settings(locals())

# Handling hosting / intitialization values
# Request settings
CSRF_COOKIE_SECURE = False
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://10.0.0.24:3000'
]

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