import os

from dotenv import load_dotenv
from pathlib import Path

from siwe_auth.custom_groups.erc721 import ERC721OwnerManager

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = os.getenv('API_DEBUG', False)

SECRET_KEY = os.getenv("API_SECRET_KEY", "secret")

# Application definition
INSTALLED_APPS = [
    'siwe_auth.apps.SiweAuthConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',
    'django_filters',
    'django_apscheduler',

    'badge',
    'ipfs',
    'job',
    'organization',
    'wallet',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

AUTH_USER_MODEL = "siwe_auth.Wallet"

LOGIN_URL = "/"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'

# Database
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

# Cache 
SESSION_COOKIE_AGE = 3 * 60 * 60

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Rest framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissions'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100
}

# Cors headers settings
CORS_ALLOW_CREDENTIALS = True

# Web3 settings
ALCHEMY_API_KEY = os.getenv("API_ALCHEMY_API_KEY")
AUTHENTICATION_BACKENDS = ["siwe_auth.backend.SiweBackend"]

CREATE_GROUPS_ON_AUTHN = False
CREATE_ENS_PROFILE_ON_AUTHN = True
CUSTOM_GROUPS = [
    ('ens_owners', ERC721OwnerManager(
        config={'contract': '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'})),
]  
PROVIDER = os.getenv("PROVIDER", f"https://eth-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}")

# IPFS settings
PINATA_API_KEY = os.getenv("API_PINATA_API_KEY")
PINATA_API_SECRET_KEY = os.getenv("API_PINATA_API_SECRET_KEY")