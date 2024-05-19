"""
URL configuration for diplom project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from user.views import *
from rest_framework_simplejwt.views import TokenObtainPairView
import debug_toolbar
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/login', UserAPILogin.as_view()),
    path('api/v1/auth/create', UserAPICreate.as_view()),
    path('api/v1/auth/logout', UserAPILogout.as_view()),
    path('api/v1/equipments/', include('equipment.urls')),
    path('api/v1/manufacturers/', include('manufacturer.urls')),
    path('api/v1/users/', include('user.urls')),
    path('api/v1/maintenances/', include('maintenance.urls')),
    path('api/v1/reports/', include('report.urls')),
    path('api/v1/token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
    
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
    ]