from django_filters import rest_framework as filters
from .models import Report

class ReportFilter(filters.FilterSet):
    equipment = filters.BaseInFilter(field_name='equipment__serial_number')
    user = filters.BaseInFilter(field_name='user__id')

    class Meta:
        model = Report
        fields = '__all__'