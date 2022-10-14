from .base import *

SECRET_KEY = '70d=!x8dejcz8wep5-ja&&$+_krh=v0s16yqzvi3pw5&a3('

# Rest Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ]
}

# Request settings
CSRF_COOKIE_SECURE = False
ALLOWED_HOSTS = ['*']
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000', 
    'http://127.0.0.1:3000', 
    'http://10.0.0.24:3000'
]