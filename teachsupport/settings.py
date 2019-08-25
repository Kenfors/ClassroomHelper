import os
import json

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEBUG = True

with open(os.path.join(BASE_DIR, 'servermode.json')) as f:
    dev_setting = json.load(f)
    if(dev_setting['Mode'] == 'PUBLISH'):
        DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'k^7g9v3quxdd_e^_12$ktbyln7+*%vuo0*_+pqif!%!5f+iwlo'

# SECURITY WARNING: don't run with debug turned on in production!
ALLOWED_HOSTS = []

if DEBUG:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = ['classroomsupport.net']


# Application definition

INSTALLED_APPS = [
    'home',
    'classAPI',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'teachsupport.urls'

FRONTEND_DIR = os.path.join(BASE_DIR, 'webapp')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
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

WSGI_APPLICATION = 'teachsupport.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_DIRS = [
    os.path.join(BASE_DIR, 'static/dist')
]

WEBPACK_LOADER = {}


if DEBUG:
    WEBPACK_LOADER = {
        'DEFAULT': {
            'CACHE': DEBUG,
            'BUNDLE_DIR_NAME': '/bundles/',  # must end with slash
            'STATS_FILE': os.path.join(FRONTEND_DIR, 'webpack-stats.json'),
        }
    }
else:
    WEBPACK_LOADER = {
        'DEFAULT': {
            'CACHE': DEBUG,
            'BUNDLE_DIR_NAME': 'dist/',  # must end with slash
            'STATS_FILE': os.path.join(FRONTEND_DIR, 'webpack-stats-prod.json'),
        }
    }