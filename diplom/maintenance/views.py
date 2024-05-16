from django.shortcuts import render
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .filters import MaintenanceFilter

from diplom.permissions import IsOwnerOrReadOnly

from .serializers import MaintenanceListSerializer, MaintenanceCreateOrUpdateSerializer

from .models import Maintenance

# Create your views here.
class MaintenanceAPIList(generics.ListAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MaintenanceFilter

class MaintenanceAPICreate(generics.ListCreateAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceCreateOrUpdateSerializer

class MaintenanceAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Maintenance.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MaintenanceListSerializer
        
        return MaintenanceCreateOrUpdateSerializer