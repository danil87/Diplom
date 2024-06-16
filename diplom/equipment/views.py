from django.shortcuts import render
from rest_framework import generics
from .models import Equipment, EquipmentAssignments
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EquipmentAssignmentFilter, EquipmentFilter

class EquipmentAPIList(generics.ListAPIView):
    serializer_class = EquipmentListSerializer
    queryset = Equipment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = EquipmentFilter

class EquipmentAPICreate(generics.ListCreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentCreateOrUpdateSerializer

class EquipmentAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentCreateOrUpdateSerializer

class EquipmentAssignmentAPIList(generics.ListAPIView):
    queryset = EquipmentAssignments.objects.all()
    serializer_class = EquipmentAssignmentsListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EquipmentAssignmentFilter

class EquipmentAssignmentAPICreate(generics.ListCreateAPIView):
    queryset = EquipmentAssignments.objects.all()
    serializer_class = EquipmentAssignmentsCreateOrUpdateSerializer

class EquipmentAssignmentAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EquipmentAssignments.objects.all()
    serializer_class = EquipmentAssignmentsCreateOrUpdateSerializer