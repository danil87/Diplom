from django.urls import path

from .views import *

urlpatterns = [
    path('', ManufacturerAPIList.as_view()),
    path('create', ManufacturerAPICreate.as_view()),
    path('<int:pk>', ManufacturerAPIUpdateDestroy.as_view()),

]