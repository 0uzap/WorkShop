"""
Django settings for workshopDjango project.
Généré et adapté pour un environnement Docker avec MySQL.
"""

import os
from pathlib import Path

# --- Chemins de base ---
BASE_DIR = Path(__file__).resolve().parent.parent


# --- Sécurité et debug ---
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
DEBUG = os.getenv("DEBUG", "1") == "1"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")


# --- Applications installées ---
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
<<<<<<< HEAD
    # Ajoute ici tes apps Django personnalisées si tu en crées
=======
    'workshopDjango', 
    # Ajoute ici tes apps Djansgo personnalisées si tu en crées
>>>>>>> 83b42e1f (Initial commit)
]


# --- Middleware ---
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# --- URLs & WSGI ---
ROOT_URLCONF = "workshopDjango.urls"
WSGI_APPLICATION = "workshopDjango.wsgi.application"


# --- Templates ---
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # ajoute un dossier de templates ici si besoin
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


# --- Base de données (MySQL via Docker) ---
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
<<<<<<< HEAD
        "NAME": os.getenv("MYSQL_DATABASE", "django_db"),
        "USER": os.getenv("MYSQL_USER", "django_user"),
        "PASSWORD": os.getenv("MYSQL_PASSWORD", ""),
        "HOST": os.getenv("MYSQL_HOST", "db"),  # nom du service Docker MySQL
        "PORT": os.getenv("MYSQL_PORT", "3306"),
        "OPTIONS": {"init_command": "SET sql_mode='STRICT_TRANS_TABLES'"},
=======
        "NAME": "workshop_db",      # crée cette base dans MySQL
        "USER": "root",             # ton utilisateur MySQL
        "PASSWORD": "",             # ton mot de passe MySQL
        "HOST": "localhost",        # ou "db" si Docker
        "PORT": "3306",
        "OPTIONS": {
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'"
        },
>>>>>>> 83b42e1f (Initial commit)
    }
}


<<<<<<< HEAD
=======

>>>>>>> 83b42e1f (Initial commit)
# --- Validation des mots de passe ---
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# --- Internationalisation ---
LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "Europe/Paris"
USE_I18N = True
USE_TZ = True


# --- Fichiers statiques ---
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"


# --- Type de clé primaire par défaut ---
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
