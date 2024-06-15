from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Manufacturer
from .serializers import ManufacturerSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ManufacturerFilter

# Create your views here.
class ManufacturerAPIList(generics.ListAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ManufacturerFilter
    

class ManufacturerAPICreate(generics.ListCreateAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
    permission_classes = [IsAuthenticated]

class ManufacturerAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer