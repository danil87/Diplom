from django.urls import path

from .views import *

urlpatterns = [
    path('', EquipmentAPIList.as_view()),
    path('create', EquipmentAPICreate.as_view()),
    path('<int:pk>', EquipmentAPIUpdateDestroy.as_view()),
    path('assignment', EquipmentAssignmentAPIList.as_view()),
    path('assignment/create', EquipmentAssignmentAPICreate.as_view()),
    path('assignment/<int:pk>', EquipmentAssignmentAPIUpdateDestroy.as_view())

]