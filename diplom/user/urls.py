from django.urls import path
from .views import *

urlpatterns = [
    path('', UserAPIList.as_view()),
    path('<int:pk>', UserAPIUpdateDestroy.as_view()),
    path('login', UserAPILogin.as_view()),
    path('logout', UserAPILogout.as_view()),
    path('user', UserAPIUserData.as_view())
]
