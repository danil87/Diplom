from django.shortcuts import render
from rest_framework import generics
from .models import Equipment, EquipmentAssignments
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .filters import EquipmentAssignmentFilter, EquipmentFilter

# Create your views here.
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

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EquipmentListSerializer
        
        return EquipmentCreateOrUpdateSerializer

class EquipmentAssignmentAPIList(generics.ListAPIView):
    serializer_class = EquipmentAssignmentsListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = EquipmentAssignmentFilter

    # def get_queryset(self):
    #     queryset = EquipmentAssignments.objects.all()
        
        # if 'equipment' in self.request.query_params:
        #     queryset = queryset.filter(equipment__in=self.request.query_params.get('equipment'))

        # if 'user' in self.request.query_params:
        #     queryset = queryset.filter(equipment__in=self.request.query_params.get('user'))

        # if 'assignment_date' in self.request.query_params:
        #     queryset = queryset.filter(equipment__in=self.request.query_params.get('assignment_date'))

        # if 'return_date' in self.request.query_params:
        #     queryset = queryset.filter(equipment__in=self.request.query_params.get('return_date'))

        # return queryset

class EquipmentAssignmentAPICreate(generics.ListCreateAPIView):
    queryset = EquipmentAssignments.objects.all()
    serializer_class = EquipmentAssignmentsCreateOrUpdateSerializer

class EquipmentAssignmentAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = EquipmentAssignments.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EquipmentAssignmentsListSerializer
        
        return EquipmentAssignmentsCreateOrUpdateSerializer