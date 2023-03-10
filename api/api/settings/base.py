import os
import json

from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

from abis import (
    FACTORY_ABI,
    FACTORY_ABI_FULL,
    FACTORY_EVENTS,
    FACTORY_TOPIC_SIGNATURES,
    ORGANIZATION_ABI,
    ORGANIZATION_ABI_FULL,
    ORGANIZATION_EVENTS,
    ORGANIZATION_TOPIC_SIGNATURES,
)

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = bool(os.getenv("API_DEBUG", True))

SECRET_KEY = os.getenv("API_SECRET_KEY", "SECRET_KEY")

# Application definition
INSTALLED_APPS = [
    "daphne",
    "siwe_auth.apps.SiweAuthConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_apscheduler",
    "rest_framework",
    "corsheaders",
    "django_filters",
    "channels",
    "badge",
    "balance",
    "ipfs",
    "indexer",
    "organization",
    "wallet",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "api.urls"

AUTH_USER_MODEL = "siwe_auth.Wallet"

LOGIN_URL = "/api/auth/login"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "api.wsgi.application"
ASGI_APPLICATION = "api.asgi.application"

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],
        },
    },
}

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Cache
SESSION_COOKIE_AGE = 3 * 60 * 60

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Rest framework settings
REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.DjangoModelPermissions'
    # ],
    # 'DEFAULT_AUTHENTICATION_CLASSES': (
    #     'rest_framework.authentication.TokenAuthentication',
    #     'rest_framework.authentication.SessionAuthentication',
    # ),
    "DEFAULT_FILTER_BACKENDS": (
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 100,
}

# Cors headers settings
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

# Provider settings 
NODE_IP = os.getenv("NODE_IP", "0.0.0.0")
ALCHEMY_API_KEY = os.getenv("REACT_APP_ALCHEMY_API_KEY")
CHAIN_ID = int(os.getenv("REACT_APP_CHAIN_ID", 1337))
PROVIDERS = {
    1: os.getenv("PROVIDER", f"https://eth-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}"),
    137: os.getenv("POLYGON_PROVIDER", f"https://polygon-mainnet.g.alchemy.com/v2/{ALCHEMY_API_KEY}"),
    1337: os.getenv("LOCAL_PROVIDER", f"http://{NODE_IP}:8545/"),
}
CHAIN_PROVIDER = PROVIDERS[CHAIN_ID]
PROVIDER = PROVIDERS[1]

# Blockchain based authentication
AUTHENTICATION_BACKENDS = ["siwe_auth.backend.SiweBackend"]

# Onchain schema settings
FACTORY_ABI = FACTORY_ABI
FACTORY_ABI_FULL = FACTORY_ABI_FULL
FACTORY_EVENTS = FACTORY_EVENTS
FACTORY_TOPIC_SIGNATURES = FACTORY_TOPIC_SIGNATURES

ORGANIZATION_ABI = ORGANIZATION_ABI
ORGANIZATION_ABI_FULL = ORGANIZATION_ABI_FULL
ORGANIZATION_EVENTS = ORGANIZATION_EVENTS
ORGANIZATION_TOPIC_SIGNATURES = ORGANIZATION_TOPIC_SIGNATURES

# Listener settings
LISTENER_INIT_BLOCK = os.getenv("LISTENER_INIT_BLOCK", 0)
LISTENER_INIT_BLOCK_BUFFER = os.getenv("LISTENER_INIT_BLOCK_BUFFER", 60)
LISTENER_CHAIN_ID = os.getenv("LISTENER_CHAIN_ID", 1337)
LISTENER_POLL_INTERVAL = os.getenv("LISTENER_POLL_INTERVAL", 5)

# Onchain reference data
BADGER_ADDRESSES = os.getenv("REACT_APP_BADGER_ADDRESSES", None)
if BADGER_ADDRESSES is None:
    raise Exception("BADGER_ADDRESSES not set")

BADGER_ADDRESSES = {int(k): v for k, v in json.loads(BADGER_ADDRESSES).items()}

if CHAIN_ID not in BADGER_ADDRESSES:
    raise Exception(f"Chain ID {CHAIN_ID} not found in BADGER_ADDRESSES")

FACTORY_ADDRESS = BADGER_ADDRESSES[CHAIN_ID]

# IPFS settings
PINATA_API_KEY = os.getenv("API_PINATA_API_KEY")
PINATA_API_SECRET_KEY = os.getenv("API_PINATA_API_SECRET_KEY")
PINATA_INDEXER_URL = os.getenv(
    "API_PINATA_INDEXER_URL", "https://badger.mypinata.cloud/ipfs/"
)

