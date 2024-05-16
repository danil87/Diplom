from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Report
from .serializers import ReportListSerializer, ReportCreateOrUpdateSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ReportFilter

# Create your views here.
class ReportAPIList(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReportFilter
    

class ReportAPICreate(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportCreateOrUpdateSerializer
    permission_classes = [IsAuthenticated]

class ReportAPIUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Report.objects.all()
    
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ReportListSerializer
        
        return ReportCreateOrUpdateSerializer