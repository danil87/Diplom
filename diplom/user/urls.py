from django.urls import path
from .views import *

urlpatterns = [
    path('', UserAPIList.as_view()),
    path('create', UserAPICreate.as_view()),
    path('<int:pk>', UserAPIUpdateDestroy.as_view()),
    path('login', UserAPILogin.as_view()),
    path('logout', UserAPILogout.as_view())
]
