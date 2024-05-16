from django.urls import path

from .views import *

urlpatterns = [
    path('', MaintenanceAPIList.as_view()),
    path('create', MaintenanceAPICreate.as_view()),
    path('<int:pk>', MaintenanceAPIUpdateDestroy.as_view()),

]