from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions

from diplom.permissions import IsOwnerOrReadOnly, AllAccess
from .models import User
from .serializers import UserSerializer, UserSerializerRegister
from .filters import UserFilter

from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class UserAPIList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter
    
class UserAPICreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializerRegister
    permission_classes = [AllAccess]

class UserAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrReadOnly]