from django.urls import path

from .views import *

urlpatterns = [
    path('', ReportAPIList.as_view()),
    path('create', ReportAPICreate.as_view()),
    path('<int:pk>', ReportAPIUpdateDestroy.as_view()),

]