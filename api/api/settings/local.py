from .base import *

SECRET_KEY = '70d=!x8dejcz8wep5-ja&&$+_krh=v0s16yqzvi3pw5&a3('

# Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ]
}

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB", "badger"),
        "USER": os.getenv("POSTGRES_USER", "badger"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD", "badger"),
        "HOST": os.getenv("POSTGRES_HOST", "badger_db"),
        "PORT": os.getenv("POSTGRES_PORT", 5432),
    }
}

# Request settings
CSRF_COOKIE_SECURE = False
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://10.0.0.24:3000'
]